import { Outlet, createFileRoute } from '@tanstack/react-router';

import QuestionnaireLayout from '@/components/layout/QuestionnaireLayout';
import { loginLoader } from '@/utils/loginLoader';

/** Display a layout for questionnaire page with additional options. */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q',
)({
  beforeLoad: async () => loginLoader(),
  component: () => (
    <QuestionnaireLayout>
      <Outlet />
    </QuestionnaireLayout>
  ),
});
