import { createFileRoute } from '@tanstack/react-router';

import { LegacyComponent } from '@/components/legacy';

export const Route = createFileRoute(
  '/questionnaire/$questionnaireId/tcm-composition',
)({
  component: LegacyComponent,
});
