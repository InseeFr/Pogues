import { createFileRoute } from '@tanstack/react-router';

// This is used only for the crumb part, ignore it
export const Route = createFileRoute(
  '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists',
)({
  loader: () => ({ crumb: 'Listes de codes' }),
});
