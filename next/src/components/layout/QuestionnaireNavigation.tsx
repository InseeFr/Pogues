import { useNavigate, useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import DashboardIcon from '@/components/ui/icons/DashboardIcon';
import DescriptionIcon from '@/components/ui/icons/DescriptionIcon';
import DictionaryIcon from '@/components/ui/icons/DictionaryIcon';
import HistoryIcon from '@/components/ui/icons/HistoryIcon';
import LatestIcon from '@/components/ui/icons/LatestIcon';
import ListIcon from '@/components/ui/icons/ListIcon';
import NomenclatureAltIcon from '@/components/ui/icons/NomenclatureAltIcon';
import PersonalizeIcon from '@/components/ui/icons/PersonalizeIcon';
import VariableIcon from '@/components/ui/icons/VariableIcon';
import { useAltIcon } from '@/hooks/useAltIcon';

import Button, { ButtonSize } from '../ui/Button';
import NavigationBar, { type NavigationItem } from './NavigationBar';

const enableVariablesPage = import.meta.env.VITE_ENABLE_VARIABLES_PAGE;

/** Display the available navigation items in a questionnaire. */
export default function QuestionnaireNavigation() {
  const { t } = useTranslation();
  const { questionnaireId, versionId } = useParams({ strict: false });
  const navigate = useNavigate();

  const { showAltIcon, handleClick: handleAltIconClick } = useAltIcon();

  /** Navigation items that change with the version. */
  const questionnaireVersionItems: NavigationItem[] = [
    {
      label: t('questionnaire.title'),
      Icon: DashboardIcon,
      path: versionId
        ? `/questionnaire/$questionnaireId/version/$versionId`
        : '/questionnaire/$questionnaireId',
    },
    {
      label: t('variables.title'),
      Icon: VariableIcon,
      path: versionId
        ? `/questionnaire/$questionnaireId/version/$versionId/variables`
        : '/questionnaire/$questionnaireId/variables',
      isDisabled: !enableVariablesPage,
      isHidden: !enableVariablesPage,
    },
    {
      label: t('codesLists.title'),
      Icon: ListIcon,
      path: versionId
        ? `/questionnaire/$questionnaireId/version/$versionId/codes-lists`
        : '/questionnaire/$questionnaireId/codes-lists',
      innerPaths: [
        '/questionnaire/$questionnaireId/codes-lists/new',
        '/questionnaire/$questionnaireId/codes-list/$codesListId',
      ],
    },
    {
      label: t('metadata.title'),
      Icon: DescriptionIcon,
      path: '/',
      isDisabled: true,
      isHidden: true,
    },
    {
      label: t('nomenclatures.title'),
      Icon: showAltIcon ? NomenclatureAltIcon : DictionaryIcon,
      iconClassName: showAltIcon ? 'animate-bounce' : '',
      onIconClick: handleAltIconClick,
      path: versionId
        ? `/questionnaire/$questionnaireId/version/$versionId/nomenclatures`
        : '/questionnaire/$questionnaireId/nomenclatures',
    },
  ];

  /**
   * Navigation items that are related to the questionnaire and do not change
   * over time with version.
   */
  const questionnaireItems: NavigationItem[] = [
    {
      label: t('history.title'),
      Icon: HistoryIcon,
      path: '/questionnaire/$questionnaireId/versions',
    },
    {
      label: t('personalization.title'),
      Icon: PersonalizeIcon,
      path: '/questionnaire/$questionnaireId/personalization',
      innerPaths: ['/questionnaire/$questionnaireId/personalization/new'],
    },
  ];

  return (
    <div className="sticky top-0 w-18 2xl:w-52 max-h-[calc(100vh-var(--header-height))] divide-y *:py-3 *:first:pt-0 *:last:pb-0">
      <div>
        <div className="p-1 py-3 2xl:px-3">
          <Button
            buttonSize={ButtonSize.sm}
            className="w-full flex overflow-hidden disabled:bg-main disabled:!text-default disabled:!cursor-auto"
            title={t('history.backToLatest')}
            disabled={!versionId}
            onClick={() => {
              if (versionId) {
                navigate({
                  to: '/questionnaire/$questionnaireId',
                  params: { questionnaireId: questionnaireId! },
                });
              }
            }}
          >
            <span className="text-sm/8 font-bold overflow-hidden text-ellipsis ">
              {versionId ?? 'latest'}
            </span>
            {versionId ? <LatestIcon className="size-8" /> : null}
          </Button>
        </div>
        <NavigationBar
          questionnaireId={questionnaireId}
          navigationItems={questionnaireVersionItems}
        />
      </div>
      {questionnaireItems ? (
        <div>
          <NavigationBar
            questionnaireId={questionnaireId}
            navigationItems={questionnaireItems}
          />
        </div>
      ) : null}
    </div>
  );
}
