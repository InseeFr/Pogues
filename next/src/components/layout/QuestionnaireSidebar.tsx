import { useNavigate, useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import Button, { ButtonSize } from '@/components/ui/Button';
import DashboardIcon from '@/components/ui/icons/DashboardIcon';
import DictionaryIcon from '@/components/ui/icons/DictionaryIcon';
import HistoryIcon from '@/components/ui/icons/HistoryIcon';
import HomeIcon from '@/components/ui/icons/HomeIcon';
import LatestIcon from '@/components/ui/icons/LatestIcon';
import ListIcon from '@/components/ui/icons/ListIcon';
import NomenclatureAltIcon from '@/components/ui/icons/NomenclatureAltIcon';
import PersonalizeIcon from '@/components/ui/icons/PersonalizeIcon';
import VariableIcon from '@/components/ui/icons/VariableIcon';
import { useAltIcon } from '@/hooks/useAltIcon';

import ProtocolesIcon from '../ui/icons/ProtocolesIcon';
import Sidebar from './sidebar/Sidebar';
import SidebarItem from './sidebar/SidebarItem';
import SidebarItemGroup from './sidebar/SidebarItemGroup';
import SidebarSubmenuItem from './sidebar/SidebarSubMenuItem';

const enableArticulationPage = import.meta.env.VITE_ENABLE_ARTICULATION_PAGE;
const enableMultimodePage = import.meta.env.VITE_ENABLE_MULTIMODE_PAGE;

/** Display the available navigation items of the questionnaire in a sidebar. */
export default function QuestionnaireSidebar() {
  const { t } = useTranslation();
  const { questionnaireId, versionId } = useParams({ strict: false });
  const navigate = useNavigate();

  const { showAltIcon, handleClick: handleAltIconClick } = useAltIcon();

  return (
    <Sidebar>
      {/** Navigation item not related to the questionnaire. */}
      <ul>
        <SidebarItem
          label={t('common.home')}
          Icon={HomeIcon}
          path="/questionnaires"
        />
      </ul>
      {/** Navigation items that change with the version. */}
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
        <ul>
          <SidebarItem
            label={t('questionnaire.title')}
            Icon={DashboardIcon}
            path={
              versionId
                ? '/questionnaire/$questionnaireId/version/$versionId'
                : '/questionnaire/$questionnaireId'
            }
            questionnaireId={questionnaireId}
            versionId={versionId}
          />
          <SidebarItem
            label={t('variables.title')}
            Icon={VariableIcon}
            path={
              versionId
                ? '/questionnaire/$questionnaireId/version/$versionId/variables'
                : '/questionnaire/$questionnaireId/variables'
            }
            questionnaireId={questionnaireId}
            versionId={versionId}
          />
          <SidebarItem
            label={t('codesLists.title')}
            Icon={ListIcon}
            path={
              versionId
                ? '/questionnaire/$questionnaireId/version/$versionId/codes-lists'
                : '/questionnaire/$questionnaireId/codes-lists'
            }
            innerPaths={[
              '/questionnaire/$questionnaireId/codes-lists/new',
              '/questionnaire/$questionnaireId/codes-list/$codesListId',
            ]}
            questionnaireId={questionnaireId}
            versionId={versionId}
          />
          <SidebarItem
            label={t('nomenclatures.title')}
            Icon={showAltIcon ? NomenclatureAltIcon : DictionaryIcon}
            iconClassName={showAltIcon ? 'animate-bounce' : ''}
            onIconClick={handleAltIconClick}
            path={
              versionId
                ? '/questionnaire/$questionnaireId/version/$versionId/nomenclatures'
                : '/questionnaire/$questionnaireId/nomenclatures'
            }
            questionnaireId={questionnaireId}
            versionId={versionId}
          />
          <SidebarItemGroup label={t('protocoles.title')} Icon={ProtocolesIcon}>
            <SidebarSubmenuItem
              label={t('articulation.title')}
              path={
                versionId
                  ? '/questionnaire/$questionnaireId/version/$versionId/articulation'
                  : '/questionnaire/$questionnaireId/articulation'
              }
              innerPaths={[
                '/questionnaire/$questionnaireId/articulation/new',
                '/questionnaire/$questionnaireId/articulation/edit',
              ]}
              isHidden={!enableArticulationPage}
              questionnaireId={questionnaireId}
              versionId={versionId}
            />
            <SidebarSubmenuItem
              label={t('multimode.title')}
              path={
                versionId
                  ? '/questionnaire/$questionnaireId/version/$versionId/multimode'
                  : '/questionnaire/$questionnaireId/multimode'
              }
              innerPaths={['/questionnaire/$questionnaireId/multimode/edit']}
              isHidden={!enableMultimodePage}
              questionnaireId={questionnaireId}
              versionId={versionId}
            />
          </SidebarItemGroup>
        </ul>
      </div>
      {/**
       * Navigation items that are related to the questionnaire and do not
       * change over time with version.
       */}
      <ul>
        <SidebarItem
          label={t('history.title')}
          Icon={HistoryIcon}
          path="/questionnaire/$questionnaireId/versions"
          questionnaireId={questionnaireId}
        />
        <SidebarItem
          label={t('personalization.title')}
          Icon={PersonalizeIcon}
          path="/questionnaire/$questionnaireId/personalization"
          innerPaths={['/questionnaire/$questionnaireId/personalization/new']}
          questionnaireId={questionnaireId}
        />
      </ul>
    </Sidebar>
  );
}
