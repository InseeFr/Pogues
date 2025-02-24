import { Link } from '@tanstack/react-router';

import ChevronRightIcon from '@/components/ui/icons/ChevronRightIcon';
import type { Questionnaire } from '@/models/questionnaires';

interface QuestionnaireProps {
  questionnaire: Questionnaire;
}

/**
 * Display informations about a single questionnaire in a line of a table.
 *
 * @see {@link TableQuestionnaires}
 */
export default function QuestionnaireLine({
  questionnaire,
}: Readonly<QuestionnaireProps>) {
  return (
    <Link
      className="table-row bg-default odd:bg-main *:p-4 cursor-pointer hover:bg-accent"
      to={'/questionnaire/$questionnaireId'}
      params={{ questionnaireId: questionnaire.id }}
    >
      <td>
        <div>{questionnaire.title}</div>
      </td>
      <td>
        <div>{questionnaire.lastUpdatedDate?.toLocaleDateString()}</div>
      </td>
      <td>
        <ChevronRightIcon />
      </td>
    </Link>
  );
}
