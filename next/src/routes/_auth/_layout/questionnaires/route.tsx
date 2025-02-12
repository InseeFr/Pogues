import { createFileRoute } from '@tanstack/react-router';

// This is used only for the crumb part, ignore it
export const Route = createFileRoute('/_auth/_layout/questionnaires')({
  loader: () => ({
    crumb: 'Questionnaires',
  }),
});
