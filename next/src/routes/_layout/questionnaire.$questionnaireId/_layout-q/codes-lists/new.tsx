import { createFileRoute } from '@tanstack/react-router';

import CreateCodesList from '@/components/createCodesList/CreateCodesList';

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new',
)({
  component: CreateCodesList,
  loader: () => ({ crumb: 'Nouveau' }),
});
