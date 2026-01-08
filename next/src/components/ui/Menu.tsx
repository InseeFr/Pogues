import { Menu as UIMenu } from '@base-ui-components/react/menu';

import { MenuItemType } from './consts/menuItemVariants';
import MenuIcon from './icons/MenuIcon';
import ArrowSvg from './icons/PopupArrow';

type MenuItem = {
  /** Whether this action is disabled. */
  disabled?: boolean;
  /** Optional icon to display next to the action label. */
  Icon?: React.ReactNode;
  /** Readable text about the action the user can click on. */
  label: string;
  type?: MenuItemType;
  /** Function that will happen on action click. */
  onClick: () => void;
};

type Props = {
  /** If provided, will override the menu default appearance. */
  children?: React.ReactNode;
  /** Actions that are available. */
  items: MenuItem[];
  /** Readable text about the menu trigger. */
  label: string;
};

/** A list of actions in a dropdown, enhanced with keyboard navigation. */
export default function Menu({ children, items, label }: Readonly<Props>) {
  return (
    <UIMenu.Root>
      {children ? (
        <UIMenu.Trigger className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
          {children}
        </UIMenu.Trigger>
      ) : (
        <UIMenu.Trigger
          className="fill-gray-600 cursor-pointer hover:bg-slate-200 w-fit p-0.5 rounded"
          aria-label={label}
        >
          <MenuIcon width="12.5px" height="12.5px" />
        </UIMenu.Trigger>
      )}

      <UIMenu.Portal>
        <UIMenu.Positioner className="outline-hidden" sideOffset={8}>
          <UIMenu.Popup className="origin-[var(--transform-origin)] rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
            <UIMenu.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
              <ArrowSvg />
            </UIMenu.Arrow>
            {items.map((item) => (
              <UIMenu.Item
                key={item.label}
                className={`
                  flex items-center py-2 pr-8 pl-4
                  text-sm leading-4
                  outline-hidden
                  cursor-pointer select-none
                  ${item.type === MenuItemType.Delete ? 'text-delete' : ''}
                  data-disabled:cursor-not-allowed data-disabled:text-gray-500 data-disabled:bg-transparent data-disabled:opacity-50
                  data-highlighted:relative data-highlighted:z-0 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-xs data-highlighted:before:bg-slate-200
                `}
                onClick={item.onClick}
                disabled={item.disabled}
              >
                {item.Icon && (
                  <span className="mr-1 data-disabled:bg-transparent data-disabled:opacity-50">
                    {item.Icon}
                  </span>
                )}
                {item.label}
                {item.type === MenuItemType.Form ? '...' : ''}
              </UIMenu.Item>
            ))}
          </UIMenu.Popup>
        </UIMenu.Positioner>
      </UIMenu.Portal>
    </UIMenu.Root>
  );
}
