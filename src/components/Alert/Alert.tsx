import React, { useState } from 'react';
import './Alert.css';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
type AlertLive = 'polite' | 'assertive' | 'off';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  live?: AlertLive;
  icon?: React.ReactNode;
  className?: string;
  onDismiss?: () => void;
}

const defaultIcons: Record<AlertVariant, string> = {
  info:    'ℹ',
  success: '✓',
  warning: '⚠',
  danger:  '✕',
};

export const Alert = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  live = 'polite',
  icon,
  className,
  onDismiss,
}: AlertProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  const classes = [
    'alert',
    `alert--${variant}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const resolvedIcon = icon ?? defaultIcons[variant];

  return (
    <div
      className={classes}
      role={live === 'assertive' ? 'alert' : 'status'}
      aria-live={live}
      aria-atomic="true"
    >
      <span className="alert__icon" aria-hidden="true">
        {resolvedIcon}
      </span>

      <div className="alert__body">
        {title && (
          <p className="alert__title">{title}</p>
        )}
        <div className="alert__message">{children}</div>
      </div>

      {dismissible && (
        <button
          className="alert__dismiss"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <span aria-hidden="true">✕</span>
        </button>
      )}
    </div>
  );
};