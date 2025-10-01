import { useTranslation } from 'react-i18next';

import { ButtonStyle } from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';
import Card from '@/components/ui/Card';
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

/**
 * Display the articulation of the selected questionnaire.
 *
 * If it does not exist, allow to create it through a form.
 *
 * It can be displayed in read only, in which case it does not allow to create,
 * update or delete articulation.
 */
export function ArticulationOverviewContent({
  questionnaireId,
  articulationItems,
  readonly = false,
}: Readonly<ArticulationOverviewProps>) {
  const { t } = useTranslation();

  const hasArticulationItems = articulationItems !== undefined;

  if (!hasArticulationItems) {
    if (readonly) {
      // We are in readonly and there is no articulation specified.
      return <div>{t('articulation.overview.versionNoArticulation')}</div>;
    }

    // There is no articulation specified: allow to setup articulation.
    return (
      <ButtonLink
        to="/questionnaire/$questionnaireId/articulation/new"
        params={{ questionnaireId }}
        buttonStyle={ButtonStyle.Primary}
      >
        {t('articulation.create.label')}
      </ButtonLink>
    );
  }

  return (
    <Card className="space-y-3">
      <h3>{t('articulation.overview.variableTable')}</h3>
      <ArticulationOverviewDetails
        questionnaireId={questionnaireId}
        articulationItems={articulationItems ?? defaultArticulationItems}
        readonly={readonly}
      />
    </Card>
  );
}
