import { Input as BaseUIInput } from '@base-ui-components/react/input';

type Props = {
  /** Default value. Use `value` if controlled. */
  defaultValue?: BaseUIInput.Props['defaultValue'];
  /** Suggestion for what kind of input will be valid. */
  placeholder?: string;
  /**
   * The value of the field.
   *
   * To render an uncontrolled switch, use the `defaultValue` prop instead.
   */
  value?: BaseUIInput.Props['value'];
  /** Callback fired when the value changes. Use when controlled. */
  onValueChange?: BaseUIInput.Props['onValueChange'];
};

export default function Input({
  defaultValue,
  placeholder,
  value,
  onValueChange,
}: Readonly<Props>) {
  return (
    <BaseUIInput
      className="w-full text-sm font-sans font-normal p-4 rounded-lg shadow-xs border border-default hover:enabled:border-primary focus:enabled:border-primary bg-default text-default placeholder:text-placeholder disabled:text-disabled disabled:bg-disabled focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary"
      defaultValue={defaultValue}
      placeholder={placeholder}
      value={value}
      onValueChange={onValueChange}
    />
  );
}
