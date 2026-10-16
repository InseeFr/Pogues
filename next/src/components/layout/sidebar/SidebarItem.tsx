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

  const isActive =
    !!matchRoute({ to: path }) ||
    innerPaths.some((path) => !!matchRoute({ to: path }))

  return (
    <li>
      <Link
        to={path}
        params={{ questionnaireId, versionId }}
        aria-current={isActive ? 'true' : undefined}
        aria-disabled={isDisabled || undefined}
        className="group w-full aria-disabled:opacity-25 aria-disabled:pointer-events-none"
        tabIndex={isDisabled ? -1 : undefined}
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
