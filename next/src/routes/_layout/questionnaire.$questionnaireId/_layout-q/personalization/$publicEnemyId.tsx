import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import {
  personalizationFileQueryOptions,
  personalizationFromPoguesQueryOptions,
} from '@/api/personalization';
import ErrorComponent from '@/components/layout/ErrorComponent';
import EditPersonalization from '@/components/personalization/form/edit/EditPersonalization';
import EditPersonalizationLayout from '@/components/personalization/form/edit/EditPersonalizationLayout';

/**
 * Page that allow to edit survey unit dataset.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/personalization/$publicEnemyId',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <EditPersonalizationLayout>
      <ErrorComponent error={error.message} />
    </EditPersonalizationLayout>
  ),
  loader: async ({
    context: { queryClient },
    params: { questionnaireId, publicEnemyId },
  }) => {
    const personalizationPromise = queryClient.ensureQueryData(
      personalizationFromPoguesQueryOptions(questionnaireId),
    );
    const filePromise = queryClient.ensureQueryData(
      personalizationFileQueryOptions(publicEnemyId),
    );
    await Promise.all([personalizationPromise, filePromise]);
  },
});

function RouteComponent() {
  const { questionnaireId, publicEnemyId } = Route.useParams();
  const { data: questionnaire } = useSuspenseQuery(
    personalizationFromPoguesQueryOptions(questionnaireId),
  );
  const { data: fileData } = useSuspenseQuery(
    personalizationFileQueryOptions(publicEnemyId),
  );

  return (
    <EditPersonalizationLayout>
      <EditPersonalization
        data={questionnaire}
        questionnaireId={questionnaireId}
        fileData={fileData}
      />
    </EditPersonalizationLayout>
  );
}
