import { Select } from '@base-ui-components/react/select';

interface OptionProps {
  children: React.ReactNode;
  value: unknown;
}

export default function Option({ children, value }: Readonly<OptionProps>) {
  return (
    <Select.Item
      className="rounded-lg min-w-[var(--anchor-width)] cursor-default items-center mx-1 px-2 py-2.5 text-sm leading-4 outline-hidden select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-highlighted:relative data-highlighted:z-0 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:bg-main"
      value={value}
    >
      <Select.ItemText className="text-sm">{children}</Select.ItemText>
    </Select.Item>
  );
}
