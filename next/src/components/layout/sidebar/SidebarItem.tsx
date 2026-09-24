import { Link, useMatchRoute } from '@tanstack/react-router'

import SidebarIcon from './SidebarIcon'

type Props = {
  Icon?: React.FC<React.ComponentProps<'svg'>>
  iconClassName?: string
  innerPaths?: string[]
  isDisabled?: boolean
  isHidden?: boolean
  label: string
  onIconClick?: () => void
  path: string
  questionnaireId?: string
  versionId?: string
}

/** Display the provided navigation item as a clickable icon. */
export default function SidebarItem({
  Icon,
  iconClassName,
  innerPaths = [],
  isDisabled,
  isHidden,
  label,
  onIconClick,
  path,
  questionnaireId,
  versionId,
}: Readonly<Props>) {
  const matchRoute = useMatchRoute()

  if (isHidden) return null

  return (
    <li>
      <Link
        to={path}
        params={{ questionnaireId, versionId }}
        aria-label={label}
        aria-disabled={isDisabled || undefined}
        className={`w-full aria-disabled:opacity-25 aria-disabled:pointer-events-none`}
        tabIndex={isDisabled ? -1 : undefined}
        aria-current={
          !!matchRoute({ to: path }) ||
          innerPaths.some((path) => !!matchRoute({ to: path }))
        }
      >
        <SidebarIcon
          Icon={Icon}
          iconClassName={iconClassName}
          label={label}
          onIconClick={onIconClick}
        />
      </Link>
    </li>
  )
}
