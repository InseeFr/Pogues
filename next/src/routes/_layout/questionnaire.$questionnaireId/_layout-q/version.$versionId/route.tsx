import { createFileRoute } from '@tanstack/react-router';

// This is used only for the crumb part, ignore it
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId',
)({
  loader: ({ context: { t }, params: { versionId } }) => ({
    crumb: t('version.crumb', { id: versionId }),
  }),
});
