import { Toggle } from '@base-ui-components/react/toggle';
import { ToggleGroup as UIToggleGroup } from '@base-ui-components/react/toggle-group';

interface Props {
  onChange: (v: string[]) => void;
  options: { label: string; value: string }[];
}

export default function ToggleGroup({ onChange, options }: Readonly<Props>) {
  return (
    <UIToggleGroup
      defaultValue={[options[0].value]}
      onValueChange={onChange}
      className="flex gap-px rounded-md border border-default bg-default divide-x p-0.5"
    >
      {options.map(({ label, value }) => (
        <Toggle
          aria-label={label}
          key={value}
          value={value}
          className="flex px-2 items-center justify-center rounded-sm text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-action-primary active:text-white data-[pressed]:bg-primary data-[pressed]:text-white"
        >
          {label}
        </Toggle>
      ))}
    </UIToggleGroup>
  );
}
