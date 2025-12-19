import { Select as BaseUISelect } from '@base-ui-components/react/select';

import ArrowDownIcon from '../icons/ArrowDownIcon';

type Props<T> = {
  /** Override the default onChange (if controlled). */
  onChange?: BaseUISelect.Root.Props<T>['onValueChange'];
  /**
   * List of options to select from. If specified, label is displayed instead of
   * value.
   */
  options: { label: React.ReactNode; value: T }[];
  /** Default value. Use `value` if controlled. */
  defaultValue?: BaseUISelect.Root.Props<T>['defaultValue'];
  /** Currently selected value (if controlled). */
  value?: BaseUISelect.Root.Props<T>['value'];
};

/**
 * A common form component for choosing a predefined value in a dropdown menu.
 *
 * To be used for small lists (otherwise we should use a `Combobox`).
 *
 * @example
 * ```
 * <Select
 *   options={[
 *     { label: 'Value 1', value: 'id1' },
 *     { label: 'Value 2', value: 'id2' },
 *   ]}
 * />
 * ```
 */
export default function Select<T>({
  onChange = () => {},
  options = [],
  defaultValue,
  value,
}: Readonly<Props<T>>) {
  return (
    <BaseUISelect.Root
      items={options}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onChange}
    >
      <BaseUISelect.Trigger
        className="
          flex min-w-36 w-full cursor-pointer
          text-sm text-default font-normal
          bg-default hover:bg-main
          items-center justify-between gap-3
          rounded-md border border-default
          pr-3 pl-3.5 py-4
          select-none
          focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-primary
          active:bg-accent data-popup-open:bg-accent
        "
      >
        <BaseUISelect.Value />
        <BaseUISelect.Icon className="flex">
          <ArrowDownIcon height="17.5" width="17.5" />
        </BaseUISelect.Icon>
      </BaseUISelect.Trigger>

      <BaseUISelect.Portal>
        <BaseUISelect.Positioner
          className="outline-none select-none z-10"
          sideOffset={8}
        >
          <BaseUISelect.Popup className="group origin-[var(--transform-origin)] bg-clip-padding rounded-md bg-[canvas] text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[side=none]:data-[ending-style]:transition-none data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none dark:shadow-none dark:outline-gray-300">
            <BaseUISelect.ScrollUpArrow className="top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute data-[side=none]:before:top-[-100%] before:left-0 before:h-full before:w-full before:content-['']" />
            <BaseUISelect.List className="relative py-1 scroll-py-6 overflow-y-auto max-h-[var(--available-height)]">
              {options.map(({ label, value }) => (
                <BaseUISelect.Item
                  key={label as React.Key}
                  value={value}
                  className="grid min-w-[var(--anchor-width)] cursor-pointer grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-main pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]"
                >
                  <BaseUISelect.ItemText className="col-start-2 text-sm">
                    {label}
                  </BaseUISelect.ItemText>
                </BaseUISelect.Item>
              ))}
            </BaseUISelect.List>
            <BaseUISelect.ScrollDownArrow className="bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:bottom-[-100%]" />
          </BaseUISelect.Popup>
        </BaseUISelect.Positioner>
      </BaseUISelect.Portal>
    </BaseUISelect.Root>
  );
}
