import { Link, useMatchRoute } from '@tanstack/react-router';

import NavigationBarItem from './NavigationBarItem';

export type NavigationItem = {
  Icon: React.FC<React.ComponentProps<'svg'>>;
  iconClassName?: string;
  innerPaths?: string[];
  isDisabled?: boolean;
  isHidden?: boolean;
  label: string;
  onIconClick?: () => void;
  path: string;
};

interface NavigationBarProps {
  questionnaireId?: string;
  navigationItems: NavigationItem[];
}

/** Display the provided navigation items as links. */
export default function NavigationBar({
  questionnaireId,
  navigationItems,
}: Readonly<NavigationBarProps>) {
  const matchRoute = useMatchRoute();

  return (
    <nav>
      <ul>
        {navigationItems.map(
          ({
            label,
            Icon,
            iconClassName,
            isDisabled,
            onIconClick,
            path,
            innerPaths = [],
            isHidden,
          }) =>
            !isHidden ? (
              <li key={label}>
                <Link
                  to={path}
                  params={{ questionnaireId: questionnaireId ?? '' }}
                  aria-disabled={isDisabled}
                  className={`w-full aria-disabled:opacity-25 aria-disabled:pointer-events-none`}
                >
                  <NavigationBarItem
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
            ) : null,
        )}
      </ul>
    </nav>
  );
}
