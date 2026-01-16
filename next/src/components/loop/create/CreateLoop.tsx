import { Variable } from '@/models/variables';

import CreateLoopForm from './CreateLoopForm';
import { LoopMemberOption } from '../form/LoopForm';

type Props = {
  /** Questionnaire to add the loop to. */
  questionnaireId: string;
  /** Scopes of the questionnaire with the mapping between id and name. */
  scopes: Map<string, string>;
  /** Members available for initial and final selections. */
  members: LoopMemberOption[];
  /** List of variables used for auto-completion in VTL editor. */
  variables?: Variable[];
};

/**
 * Create a new loop.
 */
export default function CreateLoop({
  questionnaireId,
  scopes,
  members,
  variables,
}: Readonly<Props>) {
  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <CreateLoopForm
        questionnaireId={questionnaireId}
        scopes={scopes}
        members={members}
        variables={variables}
      />
    </div>
  );
}
