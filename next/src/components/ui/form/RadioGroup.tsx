import { Radio as BaseUIRadio } from '@base-ui-components/react/radio';
import { RadioGroup as BaseUIRadioGroup } from '@base-ui-components/react/radio-group';

type Props = {
  /**
   * The uncontrolled value of the radio button that should be initially selected.
   *
   * To render a controlled radio group, use the `value` prop instead.
   */
  defaultValue?: BaseUIRadioGroup.Props['defaultValue'];
  /** Whether the component should ignore user interaction. */
  disabled?: BaseUIRadioGroup.Props['disabled'];
  /**
   * List of options to select from. If specified, label is displayed instead of
   * value.
   */
  options: { label?: string; value: unknown }[];
  /**
   * The controlled value of the radio item that should be currently selected.
   *
   * To render an uncontrolled radio group, use the `defaultValue` prop instead.
   */
  value?: BaseUIRadioGroup.Props['value'];
  /** Callback fired when the value changes. */
  onBlur?: BaseUIRadioGroup.Props['onBlur'];
  /** Callback fired when the value changes. */
  onValueChange?: BaseUIRadioGroup.Props['onValueChange'];
};

/**
 * Provides shared state to a series of radio buttons.
 *
 * @example
 * ```
 * <RadioGroup
 *   options={[
 *     { label: 'Value 1', value: 'id1' },
 *     { label: 'Value 2', value: 'id2' },
 *   ]}
 * />
 * ```
 */
export default function RadioGroup({
  defaultValue,
  disabled = false,
  options,
  value,
  onBlur,
  onValueChange,
}: Readonly<Props>) {
  return (
    <BaseUIRadioGroup
      className="flex gap-x-4 items-start gap-1 text-gray-900"
      defaultValue={defaultValue}
      disabled={disabled}
      value={value}
      onBlur={onBlur}
      onValueChange={onValueChange}
    >
      {options.map(({ label, value }) => (
        <label
          className="flex items-center gap-2 text-md font-normal"
          key={label ?? (value as React.Key)}
        >
          <BaseUIRadio.Root
            value={value}
            className="
              flex size-5
              items-center justify-center
              rounded-full
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
              data-[checked]:bg-primary
              data-[unchecked]:border data-[unchecked]:border-primary
            "
          >
            <BaseUIRadio.Indicator
              className="
                flex
                before:size-2 before:rounded-full before:bg-gray-50
                data-[unchecked]:hidden
              "
            />
          </BaseUIRadio.Root>
          {label}
        </label>
      ))}
    </BaseUIRadioGroup>
  );
}
