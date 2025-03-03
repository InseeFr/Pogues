import { createFileRoute } from '@tanstack/react-router';

import { LegacyComponent } from '@/components/legacy';

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/duplicate-variables',
)({
  component: LegacyComponent,
});
