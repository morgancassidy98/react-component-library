import React, { useId, useEffect, useRef } from 'react';
import './Checkbox.css';

interface CheckboxProps extends Omit
  <React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'
> {
  label: string;
  helperText?: string;
  errorText?: string;
  indeterminate?: boolean;
}

export const Checkbox = ({
  label,
  helperText,
  errorText,
  indeterminate = false,
  disabled = false,
  className,
  ...rest
}: CheckboxProps) => {
  const id = useId();
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const hasError = Boolean(errorText);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const wrapperClasses = [
    'checkbox-wrapper',
    disabled ? 'is-disabled' : '',
    hasError ? 'checkbox-wrapper--error' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <div className="control-row">
        <input
          ref={inputRef}
          id={id}
          type="checkbox"
          className="checkbox__input"
          disabled={disabled}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={
            hasError ? errorId : helperText ? helperId : undefined
          }
          {...rest}
        />
        <span className="checkbox__box" aria-hidden="true">
          <span className="checkbox__checkmark" />
        </span>
        <label className="checkbox__label" htmlFor={id}>
          {label}
        </label>
      </div>

      {hasError && (
        <p className="form__error checkbox__indented" id={errorId} role="alert">
          {errorText}
        </p>
      )}

      {!hasError && helperText && (
        <p className="form__helper checkbox__indented" id={helperId}>
          {helperText}
        </p>
      )}
    </div>
  );
};