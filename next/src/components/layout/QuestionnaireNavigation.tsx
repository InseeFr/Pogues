import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import Button, { ButtonSize } from '@/components/ui/Button';
import ArticulationIcon from '@/components/ui/icons/ArticulationIcon';
import DashboardIcon from '@/components/ui/icons/DashboardIcon';
import DictionaryIcon from '@/components/ui/icons/DictionaryIcon';
import HistoryIcon from '@/components/ui/icons/HistoryIcon';
import HomeIcon from '@/components/ui/icons/HomeIcon';
import LatestIcon from '@/components/ui/icons/LatestIcon';
import ListIcon from '@/components/ui/icons/ListIcon';
import MultimodeIcon from '@/components/ui/icons/MultimodeIcon';
import NomenclatureAltIcon from '@/components/ui/icons/NomenclatureAltIcon';
import PersonalizeIcon from '@/components/ui/icons/PersonalizeIcon';
import VariableIcon from '@/components/ui/icons/VariableIcon';
import { useAltIcon } from '@/hooks/useAltIcon';

import NavigationBar, { type NavigationItem } from './NavigationBar';
import NavigationBarItem from './NavigationBarItem';

const enableArticulationPage = import.meta.env.VITE_ENABLE_ARTICULATION_PAGE;
const enableMultimodePage = import.meta.env.VITE_ENABLE_MULTIMODE_PAGE;

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
      label: t('nomenclatures.title'),
      Icon: showAltIcon ? NomenclatureAltIcon : DictionaryIcon,
      iconClassName: showAltIcon ? 'animate-bounce' : '',
      onIconClick: handleAltIconClick,
      path: versionId
        ? `/questionnaire/$questionnaireId/version/$versionId/nomenclatures`
        : '/questionnaire/$questionnaireId/nomenclatures',
    },
    {
      label: 'Articulation',
      Icon: ArticulationIcon,
      path: versionId
        ? `/questionnaire/$questionnaireId/version/$versionId/articulation`
        : '/questionnaire/$questionnaireId/articulation',
      innerPaths: [
        '/questionnaire/$questionnaireId/articulation/new',
        '/questionnaire/$questionnaireId/articulation/edit',
      ],
      isDisabled: !enableArticulationPage,
      isHidden: !enableArticulationPage,
    },
    {
      label: 'Multimode',
      Icon: MultimodeIcon,
      path: versionId
        ? `/questionnaire/$questionnaireId/version/$versionId/multimode`
        : '/questionnaire/$questionnaireId/multimode',
      innerPaths: ['/questionnaire/$questionnaireId/multimode/edit'],
      isDisabled: !enableMultimodePage,
      isHidden: !enableMultimodePage,
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
    <div className="sticky top-0 w-18 2xl:w-52 max-h-[calc(100vh-var(--header-height))] divide-y *:py-3 *:first:pt-0 *:last:pb-0 pt-2">
      <div>
        <Link
          to={'/questionnaires'}
          className={`w-full aria-disabled:opacity-25 aria-disabled:pointer-events-none`}
        >
          <NavigationBarItem Icon={HomeIcon} label={t('common.home')} />
        </Link>
      </div>
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
