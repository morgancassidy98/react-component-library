import { useId } from 'react';
import './Radio.css';

interface RadioProps extends Omit
  <React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'
> {
  label: string;
  value: string;
  helperText?: string;
}

export const Radio = ({
  label,
  value,
  helperText,
  disabled = false,
  className,
  ...rest
}: RadioProps) => {
  const id = useId();
  const helperId = `${id}-helper`;

  const wrapperClasses = [
    'radio-wrapper',
    disabled ? 'is-disabled' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <div className="control-row">
        <input
          id={id}
          type="radio"
          value={value}
          className="radio__input"
          disabled={disabled}
          aria-describedby={helperText ? helperId : undefined}
          {...rest}
        />
        <span className="radio__circle" aria-hidden="true">
          <span className="radio__dot" />
        </span>
        <label className="radio__label" htmlFor={id}>
          {label}
        </label>
      </div>

      {helperText && (
        <p className="form__helper radio__indented" id={helperId}>
          {helperText}
        </p>
      )}
    </div>
  );
};