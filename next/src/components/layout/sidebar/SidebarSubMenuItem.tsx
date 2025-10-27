import { Link, useMatchRoute } from '@tanstack/react-router';

type Props = {
  innerPaths?: string[];
  isDisabled?: boolean;
  isHidden?: boolean;
  label: string;
  path: string;
  questionnaireId?: string;
  versionId?: string;
};

/** Display the provided navigation item as a clickable label. */
export default function SidebarSubmenuItem({
  innerPaths = [],
  isDisabled,
  isHidden,
  label,
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
        <div
          aria-current={
            !!matchRoute({ to: path }) ||
            innerPaths.some((path) => !!matchRoute({ to: path }))
          }
          className="2xl:grid 2xl:grid-cols-[auto_1fr] items-center p-2 gap-x-3 cursor-pointer hover:text-blue-600 hover:fill-blue-600 hover:bg-blue-50 aria-current:text-blue-600 aria-current:fill-blue-600 aria-current:bg-blue-200 disabled:bg-disabled"
          title={label}
        >
          <span className="text-left">{label}</span>
        </div>
      </Link>
    </li>
  );
}
