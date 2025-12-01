import { Field as BaseUIField } from '@base-ui-components/react/field';

export type Props = {
  children: React.ReactNode;
  name: BaseUIField.Root.Props['name'];
  /** Whether the field is forcefully marked as invalid. */
  invalid?: BaseUIField.Root.Props['invalid'];
  touched?: BaseUIField.Root.Props['touched'];
  dirty?: BaseUIField.Root.Props['dirty'];
  /** Whether the field is mandatory. */
  required?: boolean;
  label: string;
};

/**
 * A component that provides labeling and validation for form controls.
 *
 * @example
 * ```
 * <Field
 *   name={name}
 *   invalid={invalid}
 *   touched={touched}
 *   dirty={dirty}
 *   label={t('common.name')}
 * >
 *   <MyInput />
 * </Field>
 * ```
 */
export default function Field({
  children,
  label,
  name,
  invalid = false,
  required = false,
  touched = false,
  dirty = false,
}: Readonly<Props>) {
  return (
    <BaseUIField.Root
      className="flex w-full max-w-64 flex-col items-start gap-1"
      name={name}
      invalid={invalid}
      touched={touched}
      dirty={dirty}
    >
      <BaseUIField.Label className="text-sm font-medium text-gray-900">
        {label} {required ? ' *' : null}
        {children}
      </BaseUIField.Label>
    </BaseUIField.Root>
  );
}
