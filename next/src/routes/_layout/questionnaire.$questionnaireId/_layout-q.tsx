import { Outlet, createFileRoute } from '@tanstack/react-router';

import QuestionnaireLayout from '@/components/layout/QuestionnaireLayout';

/** Display a layout for questionnaire page with additional options. */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q',
)({
  component: () => (
    <QuestionnaireLayout>
      <Outlet />
    </QuestionnaireLayout>
  ),
});
