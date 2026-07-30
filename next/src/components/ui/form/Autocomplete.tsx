import { Combobox } from '@base-ui-components/react/combobox'

import { useState } from 'react'

import ArrowDownIcon from '../icons/ArrowDownIcon'

type Props<T> = {
  onChange?: (value: T) => void
  options: { label: string; value: T }[]
  value?: T
  disabled?: boolean
}

export default function Autocomplete<T extends string>({
  onChange,
  options = [],
  value,
}: Readonly<Props<T>>) {
  const [inputValue, setInputValue] = useState('')

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()),
  )

  return (
    <Combobox.Root
      value={value ?? null}
      onValueChange={(v) => onChange?.(v as T)}
      onInputValueChange={setInputValue}
      itemToStringLabel={(v) => {
        const option = options.find((o) => o.value === v)
        return option?.label ?? ''
      }}
    >
      <div className="relative">
        <Combobox.Input
          className={`
            flex min-w-36 w-full
            text-sm text-default font-normal
            bg-default
            items-center justify-between gap-3
            rounded-md border border-default
            pr-3 pl-3.5 py-4
            select-none
            focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-primary
            data-disabled:cursor-not-allowed data-disabled:opacity-50
          `}
          placeholder="Search..."
        />
        <Combobox.Trigger className="absolute right-3 top-1/2 -translate-y-1/2 flex data-disabled:hidden">
          <Combobox.Icon className="flex">
            <ArrowDownIcon height="17.5" width="17.5" />
          </Combobox.Icon>
        </Combobox.Trigger>
      </div>

      <Combobox.Portal>
        <Combobox.Positioner
          className="outline-none select-none z-10"
          sideOffset={8}
        >
          <Combobox.Popup className="group origin-[var(--transform-origin)] bg-clip-padding rounded-md bg-[canvas] text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[side=none]:data-[ending-style]:transition-none data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none dark:shadow-none dark:outline-gray-300">
            <Combobox.List className="relative py-1 scroll-py-6 overflow-y-auto max-h-[var(--available-height)]">
              {filteredOptions.length === 0 ? (
                <div className="py-2 px-3 text-sm text-gray-500">
                  No results
                </div>
              ) : (
                filteredOptions.map(({ label, value: itemValue }) => (
                  <Combobox.Item
                    key={label}
                    value={itemValue}
                    className="grid min-w-[var(--anchor-width)] cursor-pointer grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-main pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]"
                  >
                    <span className="col-start-2 text-sm">{label}</span>
                  </Combobox.Item>
                ))
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  )
}
