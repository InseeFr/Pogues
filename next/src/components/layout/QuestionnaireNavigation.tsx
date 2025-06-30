import { useNavigate, useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import Option from '@/components/ui/form/Option';
import Select from '@/components/ui/form/Select';
import DashboardIcon from '@/components/ui/icons/DashboardIcon';
import DescriptionIcon from '@/components/ui/icons/DescriptionIcon';
import DictionaryIcon from '@/components/ui/icons/DictionaryIcon';
import HistoryIcon from '@/components/ui/icons/HistoryIcon';
import ListIcon from '@/components/ui/icons/ListIcon';
import NomenclatureAltIcon from '@/components/ui/icons/NomenclatureAltIcon';
import VariableIcon from '@/components/ui/icons/VariableIcon';
import { useAltIcon } from '@/hooks/useAltIcon';

import NavigationBar, { type NavigationItem } from './NavigationBar';

/** Display the available navigation items in a questionnaire. */
export default function QuestionnaireNavigation() {
  const { t } = useTranslation();
  const { questionnaireId, versionId } = useParams({ strict: false });
  const navigate = useNavigate();

  const { showAltIcon, handleClick: handleAltIconClick } = useAltIcon();

  /** Navigation items that change with the version. */
  const questionnaireVersionItems: NavigationItem[] = [
    {
      label: t('questionnaires.navigation.overview'),
      icon: <DashboardIcon className="m-auto" />,
      path: versionId
        ? `/questionnaire/$questionnaireId/version/$versionId`
        : '/questionnaire/$questionnaireId',
    },
    {
      label: t('questionnaires.navigation.variables'),
      icon: <VariableIcon className="m-auto" />,
      path: '/',
      isDisabled: true,
      isHidden: true,
    },
    {
      label: t('questionnaires.navigation.codeLists'),
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
      label: t('questionnaires.navigation.metadata'),
      icon: <DescriptionIcon className="m-auto" />,
      path: '/',
      isDisabled: true,
      isHidden: true,
    },
    {
      label: t('questionnaires.navigation.nomenclatures'),
      icon: showAltIcon ? (
        <NomenclatureAltIcon className="m-auto animate-bounce" />
      ) : (
        <DictionaryIcon onClick={handleAltIconClick} className="m-auto" />
      ),
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
      label: t('questionnaires.navigation.history'),
      icon: <HistoryIcon className="m-auto" />,
      path: '/questionnaire/$questionnaireId/versions',
    },
  ];

  return (
    <div className="sticky top-0 w-52 max-h-[calc(100vh-var(--header-height))] divide-y *:py-3 *:first:pt-0 *:last:pb-0">
      <div>
        <div className="p-3 overflow-hidden">
          <Select
            onChange={(v) => {
              if (v === 'latest') {
                navigate({
                  to: '/questionnaire/$questionnaireId',
                  params: { questionnaireId: questionnaireId! },
                });
              }
            }}
            value={versionId ?? 'latest'}
          >
            <Option value={'latest'}>latest</Option>
            {versionId ? <Option value={versionId}>{versionId}</Option> : null}
          </Select>
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
