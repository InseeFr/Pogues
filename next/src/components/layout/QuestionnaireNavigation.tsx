import { Link, useMatchRoute, useParams } from '@tanstack/react-router';
import i18next from 'i18next';

import DashboardIcon from '../ui/icons/DashboardIcon';
import DescriptionIcon from '../ui/icons/DescriptionIcon';
import HistoryIcon from '../ui/icons/HistoryIcon';
import ListIcon from '../ui/icons/ListIcon';
import VariableIcon from '../ui/icons/VariableIcon';

const navigationItems = [
  {
    label: i18next.t('questionnaires.navigation.overview'),
    icon: <DashboardIcon className="m-auto" />,
    path: '/questionnaire/$questionnaireId',
  },
  {
    label: i18next.t('questionnaires.navigation.variables'),
    icon: <VariableIcon className="m-auto" />,
    path: '/',
    isDisabled: true,
    isHidden: true,
  },
  {
    label: i18next.t('questionnaires.navigation.codeLists'),
    icon: <ListIcon className="m-auto" />,
    path: '/questionnaire/$questionnaireId/codes-lists',
  },
  {
    label: i18next.t('questionnaires.navigation.history'),
    icon: <HistoryIcon className="m-auto" />,
    path: '/',
    isDisabled: true,
    isHidden: true,
  },
  {
    label: i18next.t('questionnaires.navigation.metadata'),
    icon: <DescriptionIcon className="m-auto" />,
    path: '/',
    isDisabled: true,
    isHidden: true,
  },
];

export default function QuestionnaireNavigation() {
  const matchRoute = useMatchRoute();
  const { questionnaireId } = useParams({ strict: false });

  return (
    <div className="bg-default w-24 h-screen flex flex-col items-center space-y-3 py-6 border-r border-default text-center sticky top-0">
      {navigationItems.map(({ label, icon, isDisabled, path, isHidden }) =>
        !isHidden ? (
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
        ) : null,
      )}
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
