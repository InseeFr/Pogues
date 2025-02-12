import { Link, useMatchRoute, useParams } from '@tanstack/react-router';

import DashboardIcon from '../ui/icons/DashboardIcon';
import DescriptionIcon from '../ui/icons/DescriptionIcon';
import HistoryIcon from '../ui/icons/HistoryIcon';
import ListIcon from '../ui/icons/ListIcon';
import VariableIcon from '../ui/icons/VariableIcon';

const navigationItems = [
  {
    label: 'Overview',
    icon: <DashboardIcon className="m-auto" />,
    path: '/questionnaire/$questionnaireId',
  },
  {
    label: 'Variables',
    icon: <VariableIcon className="m-auto" />,
    path: '/',
    isDisabled: true,
  },
  {
    label: 'Liste de codes',
    icon: <ListIcon className="m-auto" />,
    path: '/questionnaire/$questionnaireId/codes-lists',
  },
  {
    label: 'Historique',
    icon: <HistoryIcon className="m-auto" />,
    path: '/',
    isDisabled: true,
  },
  {
    label: 'Metadata',
    icon: <DescriptionIcon className="m-auto" />,
    path: '/',
    isDisabled: true,
  },
];

export default function QuestionnaireNavigation() {
  const matchRoute = useMatchRoute();
  const { questionnaireId } = useParams({ strict: false });

  return (
    <div className="bg-default w-24 items-center h-full space-y-3 py-6 border-r border-default text-center">
      {navigationItems.map(({ label, icon, isDisabled, path }) => (
        <Link
          key={label}
          to={path}
          params={{ questionnaireId: questionnaireId ?? '' }}
          disabled={isDisabled}
          className={isDisabled ? 'opacity-25 pointer-events-none' : ''}
        >
          <NavigationIcon
            icon={icon}
            label={label}
            active={!!matchRoute({ to: path })}
          />
        </Link>
      ))}
    </div>
  );
}

interface NavigationIconProps {
  icon: React.JSX.Element | null;
  label: string;
  active?: boolean;
}

function NavigationIcon({
  icon,
  label,
  active = false,
}: Readonly<NavigationIconProps>) {
  return (
    <div
      className={`py-3 cursor-pointer hover:text-blue-600 hover:fill-blue-600 hover:bg-slate-200 ${
        active ? 'text-blue-400 fill-blue-400' : ''
      } disabled disabled:bg-disabled`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </div>
  );
}
