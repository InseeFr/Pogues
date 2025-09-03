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

  if (!articulationItems && readonly) {
    return <div>{t('articulation.overview.noArticulation')}</div>;
  }

  if (!articulationItems && !readonly)
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
          readonly={readonly}
        />
      }
      defaultExpanded
      disableExpandButton
    />
  );
}
