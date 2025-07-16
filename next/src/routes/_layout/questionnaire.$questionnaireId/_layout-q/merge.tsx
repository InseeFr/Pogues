import { createFileRoute } from '@tanstack/react-router';

import { LegacyComponent } from '@/components/legacy';

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/merge',
)({
  component: LegacyComponent,
});
