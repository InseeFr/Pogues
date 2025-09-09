import { useTranslation } from 'react-i18next';

import { ButtonStyle } from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';
import OverviewItem from '@/components/ui/OverviewItem';
import {
  ArticulationItems,
  defaultArticulationItems,
} from '@/models/articulation';

import { ArticulationOverviewDetails } from './ArticulationOverviewDetails';

interface ArticulationOverviewProps {
  questionnaireId: string;
  articulationItems?: ArticulationItems;
  readonly?: boolean;
}

export function ArticulationOverview({
  questionnaireId,
  articulationItems,
  readonly = false,
}: Readonly<ArticulationOverviewProps>) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="line space-y-2 text-gray-600">
        <p>{t('articulation.overview.description')}</p>
        <p>{t('articulation.overview.howToUse')}</p>
      </div>

      {articulationItems ? (
        <OverviewItem
          content={
            <div className="grid grid-cols-[1fr_auto]">
              <h3>{t('articulation.overview.variableTable')}</h3>
            </div>
          }
          details={
            <ArticulationOverviewDetails
              questionnaireId={questionnaireId}
              articulationItems={articulationItems ?? defaultArticulationItems}
              readonly={readonly}
            />
          }
          defaultExpanded
          disableExpandButton
        />
      ) : readonly ? (
        <div>{t('articulation.overview.versionNoArticulation')}</div>
      ) : (
        <ButtonLink
          to="/questionnaire/$questionnaireId/articulation/new"
          params={{ questionnaireId }}
          buttonStyle={ButtonStyle.Primary}
        >
          {t('articulation.create.label')}
        </ButtonLink>
      )}
    </div>
  );
}
