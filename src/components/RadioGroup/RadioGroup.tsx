import { useId } from 'react';
import { Radio } from '../Radio/Radio';
import './RadioGroup.css';

type RadioOption = {
  value: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
};

interface RadioGroupProps {
  legend: string;
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const RadioGroup = ({
  legend,
  name,
  options,
  value,
  onChange,
  errorText,
  required = false,
  disabled = false,
  className,
}: RadioGroupProps) => {
  const errorId = useId();
  const hasError = Boolean(errorText);

  const groupClasses = [
    'radio-group',
    disabled ? 'radio-group--disabled' : '',
    hasError ? 'radio-group--error' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <fieldset
      className={groupClasses}
      aria-describedby={hasError ? errorId : undefined}
      aria-required={required}
      disabled={disabled}
    >
      <legend className="radio-group__legend">
        {legend}
        {required && (
          <span className="radio-group__required" aria-hidden="true"> *</span>
        )}
      </legend>

      <div className="radio-group__options">
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            helperText={option.helperText}
            disabled={disabled || option.disabled}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
          />
        ))}
      </div>

      {hasError && (
        <p className="radio-group__error" id={errorId} role="alert">
          {errorText}
        </p>
      )}
    </fieldset>
  );
};