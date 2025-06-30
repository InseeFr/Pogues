import { Select as UISelect } from '@base-ui-components/react/select';

import ArrowDownIcon from '../icons/ArrowDownIcon';

interface SelectProps {
  onChange?: (v: unknown) => void;
  children: React.ReactNode;
  value: unknown;
}

export default function Select({
  onChange = () => {},
  children,
  value,
}: Readonly<SelectProps>) {
  return (
    <UISelect.Root value={value} onValueChange={onChange}>
      <UISelect.Trigger className="flex p-4 cursor-pointer text-sm text-default bg-default items-center justify-between gap-3 rounded-lg border border-default select-none hover:bg-main focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-primary active:bg-accent data-popup-open:bg-accent">
        <UISelect.Value className="overflow-hidden text-ellipsis text-nowrap" />
        <UISelect.Icon className="flex">
          <ArrowDownIcon height="17.5" width="17.5" />
        </UISelect.Icon>
      </UISelect.Trigger>
      <UISelect.Portal>
        <UISelect.Positioner className="outline-hidden" sideOffset={8}>
          <UISelect.Popup className="outline-hidden group origin-[var(--transform-origin)] rounded-lg bg-[canvas] py-1 text-default shadow-lg transition-[transform,scale,opacity] data-ending-style:scale-100 data-ending-style:opacity-100 data-ending-style:transition-none data-starting-style:scale-90 data-starting-style:opacity-0 data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none">
            <UISelect.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
              <ArrowSvg />
            </UISelect.Arrow>
            {children}
          </UISelect.Popup>
        </UISelect.Positioner>
      </UISelect.Portal>
    </UISelect.Root>
  );
}

function ArrowSvg(props: Readonly<React.ComponentProps<'svg'>>) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-[canvas]"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-gray-200 dark:fill-none"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="dark:fill-gray-300"
      />
    </svg>
  );
}
