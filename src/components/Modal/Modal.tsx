import React, { useEffect, useRef, useId } from 'react';
import './Modal.css';

type ModalSize = 'sm' | 'md' | 'lg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export const Modal = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnBackdrop = true,
  children,
  footer,
  className,
}: ModalProps) => {
  const titleId = useId();
  const bodyId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store trigger element
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Focus first focusable element
  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => {
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTORS
      );
      focusable?.[0]?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  // Restore focus on close
  useEffect(() => {
    if (!isOpen && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Inert app root when modal is open
  useEffect(() => {
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;
    if (isOpen) {
      appRoot.setAttribute('inert', '');
    } else {
      appRoot.removeAttribute('inert');
    }
    return () => appRoot.removeAttribute('inert');
  }, [isOpen]);

  // Focus trap
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTORS
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const modalClasses = [
    'modal',
    `modal--${size}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      aria-hidden="false"
    >
      <div
        ref={modalRef}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={bodyId}
        onKeyDown={handleKeyDown}
      >
        <div className="modal__header">
          <h2 className="modal__title" id={titleId}>
            {title}
          </h2>
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="modal__body" id={bodyId}>
          {children}
        </div>

        {footer && (
          <div className="modal__footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};