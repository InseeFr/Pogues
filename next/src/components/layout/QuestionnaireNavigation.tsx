import { useRef, useState } from 'react';

import { Link, useMatchRoute, useParams } from '@tanstack/react-router';
import i18next from 'i18next';

import DashboardIcon from '../ui/icons/DashboardIcon';
import DescriptionIcon from '../ui/icons/DescriptionIcon';
import DictionaryIcon from '../ui/icons/DictionaryIcon';
import HistoryIcon from '../ui/icons/HistoryIcon';
import ListIcon from '../ui/icons/ListIcon';
import NomenclatureAltIcon from '../ui/icons/NomenclatureAltIcon';
import VariableIcon from '../ui/icons/VariableIcon';

const enableVersionsPage = import.meta.env.VITE_ENABLE_VERSIONS_PAGE;

export default function QuestionnaireNavigation() {
  const matchRoute = useMatchRoute();
  const { questionnaireId, versionId } = useParams({ strict: false });

  const [showSpinner, setShowSpinner] = useState(false);
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const spinnerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 500) {
      clickCountRef.current += 1;
    } else {
      clickCountRef.current = 1;
    }
    lastClickTimeRef.current = now;

    if (clickCountRef.current >= 3) {
      setShowSpinner(true);
      clickCountRef.current = 0;
      if (spinnerTimeoutRef.current) clearTimeout(spinnerTimeoutRef.current);
      spinnerTimeoutRef.current = setTimeout(() => setShowSpinner(false), 5000);
    }
  };

  const navigationItems = [
    {
      label: i18next.t('questionnaires.navigation.overview'),
      icon: <DashboardIcon className="m-auto" />,
      path: versionId
        ? `/questionnaire/$questionnaireId/version/$versionId`
        : '/questionnaire/$questionnaireId',
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
      path: versionId
        ? `/questionnaire/$questionnaireId/version/$versionId/codes-lists`
        : '/questionnaire/$questionnaireId/codes-lists',
      innerPaths: [
        '/questionnaire/$questionnaireId/codes-lists/new',
        '/questionnaire/$questionnaireId/codes-list/$codesListId',
      ],
    },
    {
      label: i18next.t('questionnaires.navigation.metadata'),
      icon: <DescriptionIcon className="m-auto" />,
      path: '/',
      isDisabled: true,
      isHidden: true,
    },
    {
      label: i18next.t('questionnaires.navigation.nomenclatures'),
      icon: showSpinner ? (
        <NomenclatureAltIcon
          height="40px"
          width="40px"
          className="m-auto animate-bounce"
        />
      ) : (
        <DictionaryIcon onClick={handleClick} className="m-auto" />
      ),
      path: versionId
        ? `/questionnaire/$questionnaireId/version/$versionId/nomenclatures`
        : '/questionnaire/$questionnaireId/nomenclatures',
    },
    {
      label: i18next.t('questionnaires.navigation.history'),
      icon: <HistoryIcon className="m-auto" />,
      path: '/questionnaire/$questionnaireId/versions',
      isDisabled: !enableVersionsPage,
      isHidden: !enableVersionsPage,
    },
  ];

  return (
    <div className="bg-default w-24 h-screen flex flex-col items-center py-6 border-r border-default text-center sticky top-0">
      {navigationItems.map(
        ({ label, icon, isDisabled, path, innerPaths = [], isHidden }) =>
          !isHidden ? (
            <Link
              key={label}
              to={path}
              params={{ questionnaireId: questionnaireId ?? '' }}
              disabled={isDisabled}
              className={`w-full
                ${isDisabled ? 'opacity-25 pointer-events-none' : ''}`}
            >
              <NavigationIcon
                icon={icon}
                label={label}
                active={
                  !!matchRoute({ to: path }) ||
                  innerPaths.some((path) => !!matchRoute({ to: path }))
                }
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
      className={`py-3 cursor-pointer hover:text-blue-600 hover:fill-blue-600 hover:bg-blue-50 ${
        active
          ? 'text-blue-600 fill-blue-600 hover:bg-blue-200 bg-blue-200'
          : ''
      } disabled disabled:bg-disabled`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </div>
  );
}
