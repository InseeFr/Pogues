import { createFileRoute } from '@tanstack/react-router';

import CreateQuestionnaire from '@/components/createQuestionnaire/CreateQuestionnaire';

export const Route = createFileRoute('/_auth/questionnaires/new')({
  component: CreateQuestionnaire,
  loader: () => ({
    crumb: 'Nouveau',
  }),
});
