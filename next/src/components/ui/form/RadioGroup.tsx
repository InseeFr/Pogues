import { useId } from 'react';

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
  label?: string;
  onChange: (v: unknown) => void;
  options: { label: string; value: unknown }[];
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
  label,
  disabled = false,
  onChange,
  options,
  defaultValue,
}: Readonly<Props>) {
  const id = useId();

  return (
    <BaseUIRadioGroup
      aria-labelledby={id}
      defaultValue={defaultValue}
      className="flex flex-col items-start gap-1 text-gray-900"
      disabled={disabled}
      onValueChange={onChange}
    >
      <p className="mb-1 font-semibold">{label}</p>
      <div className="flex gap-x-4">
        {options.map(({ label, value }) => (
          <label className="flex items-center gap-2 text-md" key={label}>
            <BaseUIRadio.Root
              value={value}
              className="size-[1.125rem] p-2 flex items-center justify-center hover:shadow-sm rounded-full outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-checked:bg-primary border-2 border-default hover:border-primary data-checked:border-primary"
            >
              <BaseUIRadio.Indicator className="flex text-gray-50 data-[unchecked]:hidden">
                <RadioIcon className="size-3" />
              </BaseUIRadio.Indicator>
            </BaseUIRadio.Root>
            {label}
          </label>
        ))}
      </div>
    </BaseUIRadioGroup>
  );
}

function RadioIcon(props: Readonly<React.ComponentProps<'svg'>>) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <circle cx="5" cy="5" r="3" />
    </svg>
  );
}
