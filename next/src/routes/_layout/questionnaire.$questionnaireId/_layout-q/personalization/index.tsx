import { useEffect } from 'react';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ParseResult } from 'papaparse';

import {
  basePersonalizationQueryOptions,
  personalizationFromPoguesQueryOptions,
  personalizationKeys,
} from '@/api/personalization';
import PersonalizationOverview from '@/components/personalization/overview/PersonalizationOverview';
import PersonalizationOverviewLayout from '@/components/personalization/overview/PersonalizationOverviewLayout';
import { InterrogationModeDataResponse } from '@/models/personalizationQuestionnaire';

/**
 * Previously handled by Public Enemy
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/personalization/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <PersonalizationOverviewLayout>
      <CustomErrorComponent error={error} />
    </PersonalizationOverviewLayout>
  ),
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) => {
    queryClient.invalidateQueries({
      queryKey: personalizationKeys.fromPogues(questionnaireId),
    });
    await queryClient.ensureQueryData({
      ...personalizationFromPoguesQueryOptions(questionnaireId),
    });
  },
  loaderDeps() {
    return { timestamp: Date.now() };
  },
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const navigate = useNavigate();

  const { data: questionnaire } = useSuspenseQuery(
    personalizationFromPoguesQueryOptions(questionnaireId),
  );
  const {
    data = [
      {} as InterrogationModeDataResponse,
      '' as ParseResult<unknown> | string,
    ],
  } = useQuery<[InterrogationModeDataResponse, ParseResult<unknown> | string]>({
    ...basePersonalizationQueryOptions(questionnaire?.poguesId),
    enabled: !!questionnaire?.id,
    retry: false,
    throwOnError: false,
  });

  const [interrogationData, fileData] = data;
  //If questionnaire.id is null or undefined, redirect to personalization creation
  if (!questionnaire?.id) {
    navigate({
      to: '/questionnaire/$questionnaireId/personalization/new',
      params: { questionnaireId },
      replace: true,
    });
    return null;
  }

  return (
    <PersonalizationOverviewLayout>
      <PersonalizationOverview
        questionnaireId={questionnaireId}
        data={questionnaire}
        fileData={fileData}
        interrogationData={interrogationData || null}
      />
    </PersonalizationOverviewLayout>
  );
}

function CustomErrorComponent({ error }: Readonly<{ error: Error }>) {
  const navigate = useNavigate();
  const questionnaireId = Route.useParams().questionnaireId;

  // If no data is found, redirect to the creation page
  useEffect(() => {
    if (error?.message?.includes('404')) {
      navigate({
        to: '/questionnaire/$questionnaireId/personalization/new',
        params: { questionnaireId },
        replace: true,
      });
    }
  }, [error, navigate, questionnaireId]);

  if (error?.message?.includes('404')) {
    return null;
  }

  return <div className="text-error">{error.message}</div>;
}
