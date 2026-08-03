import { useId } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import './CheckboxGroup.css';

type CheckboxOption = {
  value: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
};

interface CheckboxGroupProps {
  legend: string;
  options: CheckboxOption[];
  values?: string[];
  onChange?: (values: string[]) => void;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  selectAll?: boolean;
  className?: string;
}

export const CheckboxGroup = ({
  legend,
  options,
  values = [],
  onChange,
  errorText,
  required = false,
  disabled = false,
  selectAll = false,
  className,
}: CheckboxGroupProps) => {
  const errorId = useId();
  const hasError = Boolean(errorText);

  const enabledOptions = options.filter((o) => !o.disabled);
  const allChecked = enabledOptions.every((o) => values.includes(o.value));
  const someChecked = enabledOptions.some((o) => values.includes(o.value));
  const isIndeterminate = someChecked && !allChecked;

  const handleSelectAll = () => {
    if (!onChange) return;
    if (allChecked) {
      // Uncheck all enabled options
      onChange(values.filter((v) =>
        options.find((o) => o.value === v && o.disabled)
      ));
    } else {
      // Check all enabled options
      const enabledValues = enabledOptions.map((o) => o.value);
      const disabledChecked = values.filter((v) =>
        options.find((o) => o.value === v && o.disabled)
      );
      onChange([...new Set([...disabledChecked, ...enabledValues])]);
    }
  };

  const handleChange = (value: string, checked: boolean) => {
    if (!onChange) return;
    if (checked) {
      onChange([...values, value]);
    } else {
      onChange(values.filter((v) => v !== value));
    }
  };

  const groupClasses = [
    'checkbox-group',
    disabled ? 'checkbox-group--disabled' : '',
    hasError ? 'checkbox-group--error' : '',
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
      <legend className="checkbox-group__legend">
        {legend}
        {required && (
          <span className="checkbox-group__required" aria-hidden="true"> *</span>
        )}
      </legend>

      <div className="checkbox-group__options">
        {selectAll && (
          <div className="checkbox-group__select-all">
            <Checkbox
              label="Select all"
              checked={allChecked}
              indeterminate={isIndeterminate}
              onChange={handleSelectAll}
              disabled={disabled}
            />
          </div>
        )}

        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            helperText={option.helperText}
            disabled={disabled || option.disabled}
            checked={values.includes(option.value)}
            onChange={(e) =>
              handleChange(option.value, e.target.checked)
            }
          />
        ))}
      </div>

      {hasError && (
        <p className="checkbox-group__error" id={errorId} role="alert">
          {errorText}
        </p>
      )}
    </fieldset>
  );
};