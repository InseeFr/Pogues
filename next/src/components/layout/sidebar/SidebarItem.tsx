import { Link, useMatchRoute } from '@tanstack/react-router';

import SidebarIcon from './SidebarIcon';

type Props = {
  Icon?: React.FC<React.ComponentProps<'svg'>>;
  iconClassName?: string;
  innerPaths?: string[];
  isDisabled?: boolean;
  isHidden?: boolean;
  label: string;
  onIconClick?: () => void;
  path: string;
  questionnaireId?: string;
  versionId?: string;
};

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
  const matchRoute = useMatchRoute();

  if (isHidden) return null;

  return (
    <li>
      <Link
        to={path}
        params={{ questionnaireId, versionId }}
        aria-disabled={isDisabled}
        className={`w-full aria-disabled:opacity-25 aria-disabled:pointer-events-none`}
      >
        <SidebarIcon
          Icon={Icon}
          iconClassName={iconClassName}
          label={label}
          onIconClick={onIconClick}
          active={
            !!matchRoute({ to: path }) ||
            innerPaths.some((path) => !!matchRoute({ to: path }))
          }
        />
      </Link>
    </li>
  );
}
