import { NavigationMenu } from '@base-ui-components/react/navigation-menu'

import { useState } from 'react'

import ArrowDownIcon from '@/components/ui/icons/ArrowDownIcon'

import SidebarIcon from './SidebarIcon'

type Props = {
  children: React.ReactNode
  Icon: React.FC<React.ComponentProps<'svg'>>
  iconClassName?: string
  isHidden?: boolean
  label: string
  onIconClick?: () => void
}

/**
 * Display a navigation icon that can open / close a submenu on hover with
 * navigation items on small screen.
 */
export default function SidebarItemGroup({
  children,
  Icon,
  iconClassName,
  isHidden,
  label,
}: Readonly<Props>) {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpanded = () => setIsExpanded(!isExpanded)

  if (isHidden) return null

  return (
    <>
      {/** Submenu for small screen. */}
      <NavigationMenu.Root className="2xl:hidden">
        <NavigationMenu.List className="relative flex">
          <NavigationMenu.Item className="w-full">
            <NavigationMenu.Trigger className="w-full">
              <SidebarIcon
                Icon={Icon}
                iconClassName={iconClassName}
                label={label}
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <ul className="grid list-none grid-cols-1 gap-0 xs:grid-cols-[12rem_12rem]">
                {children}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
        <NavigationMenu.Portal>
          <NavigationMenu.Positioner
            sideOffset={0}
            alignOffset={0}
            align="start"
            side="right"
            className="box-border h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-[var(--duration)] ease-[var(--easing)] before:absolute before:content-[''] data-[instant]:transition-none data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-2.5 data-[side=left]:before:top-0 data-[side=left]:before:right-[-10px] data-[side=left]:before:bottom-0 data-[side=left]:before:w-2.5 data-[side=right]:before:top-0 data-[side=right]:before:bottom-0 data-[side=right]:before:left-[-10px] data-[side=right]:before:w-2.5 data-[side=top]:before:right-0 data-[side=top]:before:bottom-[-10px] data-[side=top]:before:left-0 data-[side=top]:before:h-2.5"
            style={{
              ['--duration' as string]: '0.35s',
              ['--easing' as string]: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <NavigationMenu.Popup className="data-[ending-style]:easing-[ease] relative h-[var(--popup-height)] origin-[var(--transform-origin)] bg-[canvas] shadow-md outline outline-gray-200 transition-[opacity,transform,width,height,scale,translate] duration-[var(--duration)] ease-[var(--easing)] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[ending-style]:duration-150 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 min-[500px]:w-[var(--popup-width)]">
              <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
            </NavigationMenu.Popup>
          </NavigationMenu.Positioner>
        </NavigationMenu.Portal>
      </NavigationMenu.Root>

      {/** Toggle button and list for large screen */}
      <div className="hidden 2xl:flex items-center gap-2">
        <button
          onClick={toggleExpanded}
          className="flex-1 text-left hover:text-blue-600 hover:bg-blue-50 group"
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${label} menu`}
          aria-expanded={isExpanded}
        >
          <div className="flex items-center flex-start gap-2">
            <SidebarIcon
              Icon={Icon}
              iconClassName={iconClassName}
              label={label}
            />
            <ArrowDownIcon
              className={`transition-transform duration-200 group-hover:text-blue-600 group-hover:fill-blue-600 ${isExpanded ? '' : '-rotate-90'}`}
            />
          </div>
        </button>
      </div>

      {isExpanded && (
        <ul className="hidden 2xl:block relative ml-5 pl-4 before:absolute before:left-0 before:top-0 before:w-0.5 before:h-full before:bg-gray-200 before:rounded">
          {children}
        </ul>
      )}
    </>
  )
}
