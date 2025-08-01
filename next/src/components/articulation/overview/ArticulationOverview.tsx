import { useTranslation } from 'react-i18next';

import { ButtonStyle } from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';
import OverviewItem from '@/components/ui/OverviewItem';
import {
  ArticulationItems,
  defaultArticulationItems,
} from '@/models/articulation';
import { Variable } from '@/models/variables';

import { ArticulationOverviewDetails } from './ArticulationOverviewDetails';

interface ArticulationOverviewProps {
  questionnaireId: string;
  variables?: Variable[];
  articulationItems?: ArticulationItems;
}

export function ArticulationOverview({
  questionnaireId,
  variables,
  articulationItems,
}: Readonly<ArticulationOverviewProps>) {
  const { t } = useTranslation();

  if (!variables || variables.length === 0) {
    return t('articulation.overview.mustHaveRoundabout');
  }

  if (!articulationItems)
    return (
      <ButtonLink
        to="/questionnaire/$questionnaireId/articulation/new"
        params={{ questionnaireId }}
        buttonStyle={ButtonStyle.Primary}
      >
        {t('articulation.create.create')}
      </ButtonLink>
    );
  return (
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
        />
      }
      defaultExpanded
      disableExpandButton
    />
  );
}
