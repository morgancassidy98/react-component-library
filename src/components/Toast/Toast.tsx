import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useToastContext } from './ToastContext';
import type { Toast as ToastType } from './ToastContext';
import './Toast.css';

const defaultIcons: Record<ToastType['variant'], string> = {
  success: '✓',
  info:    'ℹ',
  warning: '⚠',
  danger:  '✕',
};

const ToastItem = ({
  toast,
  onRemove,
}: {
  toast: ToastType;
  onRemove: (id: string) => void;
}) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTimer = () => {
    if (!toast.duration) return;
    timerRef.current = setTimeout(() => handleDismiss(), toast.duration);
  };

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  // Trigger enter animation
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Start auto-dismiss timer
  useEffect(() => {
    startTimer();
    return clearTimer;
  }, []);

  const classes = [
    'toast',
    `toast--${toast.variant}`,
    visible ? 'toast--visible' : '',
    exiting ? 'toast--exiting' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      role={toast.variant === 'danger' ? 'alert' : 'status'}
      aria-live={toast.variant === 'danger' ? 'assertive' : 'polite'}
      aria-atomic="true"
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
    >
      <span className="toast__icon" aria-hidden="true">
        {defaultIcons[toast.variant]}
      </span>

      <div className="toast__body">
        {toast.title && (
          <p className="toast__title">{toast.title}</p>
        )}
        <p className="toast__message">{toast.message}</p>
      </div>

      {toast.dismissible && (
        <button
          className="toast__dismiss"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
        >
          <span aria-hidden="true">✕</span>
        </button>
      )}

      {toast.duration && (
        <div
          className="toast__progress"
          style={{ animationDuration: `${toast.duration}ms` }}
        />
      )}
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastContext();

  return createPortal(
    <div
      className="toast-container"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
        />
      ))}
    </div>,
    document.body
  );
};