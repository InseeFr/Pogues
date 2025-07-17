import React from 'react';

import { Field } from '@base-ui-components/react/field';
import { Input as UIInput } from '@base-ui-components/react/input';
import { useTranslation } from 'react-i18next';

import ButtonIcon from '@/components/ui/ButtonIcon';
import SearchOffIcon from '@/components/ui/icons/SearchOff';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  description?: string;
  error?: string;
  label?: string;
  required?: boolean;
  onClear?: () => void;
  showClearButton?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      description,
      disabled,
      error,
      label,
      required = false,
      style = {},
      defaultValue,
      onClear,
      showClearButton = false,
      ...props
    }: Readonly<InputProps>,
    ref,
  ) => {
    const { t } = useTranslation();
    return (
      <Field.Root
        invalid={!!error}
        disabled={disabled}
        className={`${className} flex w-full flex-col items-start gap-1`}
        style={style}
        defaultValue={defaultValue}
      >
        {label ? (
          <Field.Label className="text-sm ml-1">
            {label}
            {required ? ' *' : ''}
          </Field.Label>
        ) : null}
        <div className="relative w-full">
          <UIInput
            ref={ref}
            required={required}
            className="w-full text-sm font-sans font-normal p-4 rounded-lg shadow-xs border border-default hover:enabled:border-primary focus:enabled:border-primary bg-default text-default placeholder:text-placeholder disabled:text-disabled disabled:bg-disabled focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary"
            {...props}
          />
          {showClearButton && (
            <ButtonIcon
              className="absolute right-3 top-1/2 transform -translate-y-1/2 has-[data-dirty]:visible"
              Icon={SearchOffIcon}
              title={t('common.clearInput')}
              onClick={onClear}
              disabled={disabled}
            />
          )}
        </div>
        <Field.Error
          className="text-sm text-error ml-1"
          forceShow={!!error}
          role="alert"
        >
          {error}
        </Field.Error>

        {description ? (
          <Field.Description className="text-sm text-default">
            {description}
          </Field.Description>
        ) : null}
      </Field.Root>
    );
  },
);

export default Input;
