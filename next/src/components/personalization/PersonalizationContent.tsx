import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { getExistingCsvSchema } from '@/api/personalize';
import { openDocument } from '@/api/utils/personalization';
import Button from '@/components/ui/Button';
import { PersonalizationQuestionnaire } from '@/models/personalizationQuestionnaire';

import ButtonLink from '../ui/ButtonLink';
import PersonalisationTile from './PersonalizationTile';

interface PersonalizationContentProps {
  questionnaireId: string;
  data: PersonalizationQuestionnaire;
}

/** Display the personalization windows */
export default function PersonalizationContent({
  questionnaireId,
  data,
}: Readonly<PersonalizationContentProps>) {
  const { t } = useTranslation();
  const { refetch: fetchExistingData } = useQuery({
    queryKey: ['existing-csv-schema', { questionnaireId }],
    queryFn: async () => {
      const result = await getExistingCsvSchema(data.id);
      return result ?? null;
    },
    enabled: false,
  });
  function onDownload() {
    const promise = fetchExistingData().then((result) => {
      if (result?.data instanceof File) {
        const fileName = 'survey-units-' + questionnaireId + '.csv';
        openDocument(new Blob([result.data], { type: 'text/csv' }), fileName);
      }
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('personalization.create.download_success'),
      error: (err: Error) => err.toString(),
    });
  }

  return (
    <PersonalisationTile data={data}>
      <div className="overflow-hidden flex flex-row gap-3 my-1">
        <Button onClick={onDownload}>
          {t('personalization.overview.existing_file_data')}
        </Button>
        <ButtonLink
          to="/questionnaire/$questionnaireId/personalize/$publicEnemyId"
          params={{ questionnaireId, publicEnemyId: data.id.toString() }}
        >
          {t('common.edit')}
        </ButtonLink>
      </div>
    </PersonalisationTile>
  );
}
