import { createFileRoute } from '@tanstack/react-router';

import { LegacyComponent } from '@/components/legacy';

/**
 * Main questionnaire page where we display the various questions and allow to
 * edit them and create new ones.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/',
)({
  loader: async ({ params: { versionId } }) => {
    return { crumb: `Version ${versionId}` };
  },
  component: LegacyComponent,
});
