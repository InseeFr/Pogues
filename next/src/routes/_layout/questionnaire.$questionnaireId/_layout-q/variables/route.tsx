import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/variables',
)({
  loader: ({ context: { t } }) => ({ crumb: t('crumb.variables') }),
});
