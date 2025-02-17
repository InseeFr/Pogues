import { createFileRoute } from '@tanstack/react-router';

// This is used only for the crumb part, ignore it
export const Route = createFileRoute('/_layout/questionnaire/$questionnaireId')(
  {
    loader: ({ params: { questionnaireId } }) => ({
      crumb: `Questionnaire ${questionnaireId}`,
    }),
  },
);
