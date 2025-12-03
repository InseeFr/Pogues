import Field, { Props as FieldProps } from './Field';
import Switch, { Props as SwitchProps } from './Switch';

type Props = {
  /* Wrapper props */
  name: FieldProps['name'];
  invalid: FieldProps['invalid'];
  touched: FieldProps['touched'];
  dirty: FieldProps['dirty'];
  required?: FieldProps['required'];
  label: FieldProps['label'];
  /* Switch props */
  value: SwitchProps['checked'];
  ref: SwitchProps['inputRef'];
  onChange: SwitchProps['onCheckedChange'];
  onBlur: SwitchProps['onBlur'];
};

/**
 * A switch wrapper that provides labeling and validation for form controls.
 *
 * A switch is a control that indicates whether a setting is on or off.
 */
export default function FormSwitch({
  name,
  invalid,
  touched,
  dirty,
  required = false,
  label,
  value,
  ref,
  onChange,
  onBlur,
}: Readonly<Props>) {
  return (
    <Field
      name={name}
      invalid={invalid}
      touched={touched}
      dirty={dirty}
      required={required}
      label={label}
    >
      <Switch
        checked={value}
        inputRef={ref}
        onCheckedChange={onChange}
        onBlur={onBlur}
      />
    </Field>
  );
}
