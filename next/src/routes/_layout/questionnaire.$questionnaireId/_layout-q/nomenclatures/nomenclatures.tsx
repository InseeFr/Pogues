import { createFileRoute } from '@tanstack/react-router';

// This is used only for the crumb part, ignore it
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/nomenclatures/nomenclatures',
)({
  loader: () => ({ crumb: 'Nomenclatures' }),
});
