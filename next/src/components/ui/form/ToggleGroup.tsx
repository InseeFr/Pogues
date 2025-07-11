import { Toggle } from '@base-ui-components/react/toggle';
import { ToggleGroup as UIToggleGroup } from '@base-ui-components/react/toggle-group';

interface Props {
  onChange: (v: string[]) => void;
  options: { label: string; value: string }[];
}

export default function ToggleGroup({ onChange, options }: Readonly<Props>) {
  return (
    <UIToggleGroup
      onValueChange={onChange}
      className="flex gap-px min-w-fit rounded-md border border-primary bg-default divide-x shadow-xs"
      toggleMultiple
    >
      {options.map(({ label, value }) => (
        <Toggle
          aria-label={label}
          key={value}
          value={value}
          className="flex p-4 text-sm items-center cursor-pointer whitespace-nowrap justify-center rounded-md text-primary font-medium select-none hover:bg-accent focus-visible:bg-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-blue-800 active:bg-action-primary active:text-white data-[pressed]:bg-primary data-[pressed]:text-white"
        >
          {label}
        </Toggle>
      ))}
    </UIToggleGroup>
  );
}
