import { useId } from 'react';
import './Select.css';

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectGroup = {
  group: string;
  options: SelectOption[];
};

type SelectItem = SelectOption | SelectGroup;

const isGroup = (item: SelectItem): item is SelectGroup => {
  return 'group' in item;
};

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string;
  options: SelectItem[];
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Select = ({
  label,
  options,
  placeholder = 'Select an option',
  helperText,
  errorText,
  required = false,
  disabled = false,
  fullWidth = false,
  className,
  ...rest
}: SelectProps) => {
  const id = useId();
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const hasError = Boolean(errorText);

  const wrapperClasses = [
    'form-field',
    fullWidth ? 'form-field--full' : '',
    disabled ? 'is-disabled' : '',
    hasError ? 'select-wrapper--error' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const renderOption = (option: SelectOption) => (
    <option
      key={option.value}
      value={option.value}
      disabled={option.disabled}
    >
      {option.label}
    </option>
  );

  return (
    <div className={wrapperClasses}>
      <label className="form__label" htmlFor={id}>
        {label}
        {required && (
          <span className="form__required" aria-hidden="true"> *</span>
        )}
      </label>

      <div className="select__control">
        <select
          id={id}
          className="select__field"
          disabled={disabled}
          required={required}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={
            hasError ? errorId : helperText ? helperId : undefined
          }
          defaultValue=""
          {...rest}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((item, index) =>
            isGroup(item) ? (
              <optgroup key={index} label={item.group}>
                {item.options.map(renderOption)}
              </optgroup>
            ) : (
              renderOption(item)
            )
          )}
        </select>
        <span className="select__chevron" aria-hidden="true">&#8964;</span>
      </div>

      {hasError && (
        <p className="form__error" id={errorId} role="alert">
          {errorText}
        </p>
      )}

      {!hasError && helperText && (
        <p className="form__helper" id={helperId}>
          {helperText}
        </p>
      )}
    </div>
  );
};