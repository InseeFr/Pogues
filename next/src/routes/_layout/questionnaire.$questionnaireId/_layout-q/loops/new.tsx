import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { questionnaireQueryOptions } from '@/api/questionnaires';
import { variablesQueryOptions } from '@/api/variables';
import ErrorComponent from '@/components/layout/ErrorComponent';
import { Variable } from '@/models/variables';
import CreateLoopLayout from '@/components/loop/create/CreateLoopLayout';
import CreateLoop from '@/components/loop/create/CreateLoop';
import { LoopMemberOption } from '@/components/loop/form/LoopForm';

/**
 * Page that allow to create a new code list.
 */
export const Route = createFileRoute(
    '/_layout/questionnaire/$questionnaireId/_layout-q/loops/new',
)({
    component: RouteComponent,
    errorComponent: ({ error }) => (
        <CreateLoopLayout>
            <ErrorComponent error={error.message} />
        </CreateLoopLayout>
    ),
    loader: async ({
        context: { queryClient, t },
        params: { questionnaireId },
    }) => {
        queryClient.ensureQueryData(questionnaireQueryOptions(questionnaireId));
        return { crumb: t('crumb.new') };
    },
});

function RouteComponent() {
    const questionnaireId = Route.useParams().questionnaireId;
    const { data: questionnaire } = useSuspenseQuery(
        questionnaireQueryOptions(questionnaireId),
    );
    const { data: variables }: { data: Variable[] } = useSuspenseQuery(
        variablesQueryOptions(questionnaireId),
    );

    // should be given by back-end
    const members: LoopMemberOption[] = [
        { id: 'fqzojfpoqz', name: 'S1' },
        { id: 'dqfzqgges', name: 'S2' },
        { id: 'hreherhrehr', name: 'S3' },
        { id: 'jpoopjpjo', name: 'S4' }
    ];

    return (
        <CreateLoopLayout>
            <CreateLoop
                questionnaireId={questionnaireId}
                scopes={questionnaire.scopes}
                members={members}
                variables={variables}
            />
        </CreateLoopLayout>
    );
}
