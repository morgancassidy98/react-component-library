import React from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  children,
  disabled,
  className,
  ...rest
}: ButtonProps) => {
const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full-width' : '',
    isLoading ? 'btn--loading' : '',
    className ?? '',
 ]
 .filter(Boolean)
 .join(' ');

  return (
    <button className={classes}
    disabled={disabled || isLoading}
    aria-busy={isLoading || undefined}
    aria-disabled={disabled || isLoading ||undefined}
     {...rest}>
        {isLoading && (<span className="btn__spinner" aria-hidden="true"/>
            )}
        {!isLoading && iconLeft && (
            <span className="btn__icon btn__icon--left" aria-hidden="true">
                {iconLeft}
            </span>
        )}
        <span className="btn__label">{children}</span>
        {!isLoading && iconRight && (
            <span className="btn__icon btn__icon--right" aria-hidden="true">
                {iconRight}
            </span>
        )}
    
    </button>
  );
};
