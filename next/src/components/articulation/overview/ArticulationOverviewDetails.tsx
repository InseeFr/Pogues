import { useTranslation } from 'react-i18next';

import ButtonLink from '@/components/ui/ButtonLink';
import Dialog from '@/components/ui/Dialog';
import { ArticulationItems } from '@/models/articulation';

import { ArticulationTable } from './ArticulationTable';

interface ArticulationOverviewDetailsProps {
  questionnaireId: string;
  articulationItems: ArticulationItems;
}

export function ArticulationOverviewDetails({
  questionnaireId,
  articulationItems,
}: Readonly<ArticulationOverviewDetailsProps>) {
  const { t } = useTranslation();

  // TODO: handle delete with refresh when endpoint will be available
  const onDelete = () => {};

  return (
    <div className="overflow-hidden space-y-3">
      <div className="pt-3">
        <ArticulationTable articulationItems={articulationItems} />
      </div>

      <div className="flex gap-x-2">
        <ButtonLink
          to="/questionnaire/$questionnaireId/articulation/edit"
          params={{ questionnaireId }}
        >
          {t('common.edit')}
        </ButtonLink>
        <Dialog
          label={t('common.delete')}
          title={t('articulation.delete.dialogTitle', {
            label: 'test',
          })}
          body={t('articulation.delete.dialogConfirm')}
          onValidate={onDelete}
        />
      </div>
    </div>
  );
}
