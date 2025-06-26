import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { getInitialCsvSchema } from '@/api/personalize';
import ContentMain from '@/components/layout/ContentMain';
import Button from '@/components/ui/Button';
import { PersonalizationQuestionnaire } from '@/models/personalizationQuestionnaire';

import ContentHeader from '../layout/ContentHeader';
import PersonalizationContent from './PersonalizationContent';

interface PersonalizationsProps {
  questionnaireId: string;
  data: PersonalizationQuestionnaire;
}

export default function PersonalizationsOverview({
  questionnaireId,
  data,
}: Readonly<PersonalizationsProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const downloadMutation = useMutation({
    mutationFn: ({ questionnaireId }: { questionnaireId: string }) => {
      return getInitialCsvSchema(questionnaireId);
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: ['personalization', { questionnaireId }],
      }),
  });

  function onDownload() {
    const promise = downloadMutation.mutateAsync({
      questionnaireId,
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('personalization.download_success'),
      error: (err: Error) => err.toString(),
    });
  }

  return (
    <div>
      <ContentHeader
        title={`${t('personalization.title')}`}
        action={
          <Button onClick={onDownload}>{t('personalization.schema')}</Button>
        }
      />
      <ContentMain>
        <PersonalizationContent data={data} />
      </ContentMain>
    </div>
  );
}
