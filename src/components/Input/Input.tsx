import React, { useId } from 'react';
import './Input.css';

type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  type?: InputType;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Input = ({
  label,
  type = 'text',
  helperText,
  errorText,
  required = false,
  disabled = false,
  fullWidth = false,
  className,
  ...rest
}: InputProps) => {
  const id = useId();
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const hasError = Boolean(errorText);

  const wrapperClasses = [
    'input-wrapper',
    fullWidth ? 'input-wrapper--full' : '',
    disabled ? 'input-wrapper--disabled' : '',
    hasError ? 'input-wrapper--error' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <label className="input__label" htmlFor={id}>
        {label}
        {required && (
          <span className="input__required" aria-hidden="true"> *</span>
        )}
      </label>

      <input
        id={id}
        type={type}
        className="input__field"
        disabled={disabled}
        required={required}
        aria-invalid={hasError ? 'true' : undefined}
        aria-describedby={
          hasError ? errorId : helperText ? helperId : undefined
        }
        {...rest}
      />

      {hasError && (
        <p className="input__error" id={errorId} role="alert">
          {errorText}
        </p>
      )}

      {!hasError && helperText && (
        <p className="input__helper" id={helperId}>
          {helperText}
        </p>
      )}
    </div>
  );
};