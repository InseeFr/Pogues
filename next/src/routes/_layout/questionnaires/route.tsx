import { createFileRoute } from '@tanstack/react-router';

// This is used only for the crumb part, ignore it
export const Route = createFileRoute('/_layout/questionnaires')({
  loader: ({ context: { t } }) => ({ crumb: t('crumb.questionnaires') }),
});
