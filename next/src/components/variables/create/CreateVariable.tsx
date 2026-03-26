import { Variable } from '@/models/variables';

import CreateVariableForm from './CreateVariableForm';
import { Scopes } from '@/models/scopes';

type Props = {
  /** Questionnaire to add the variable to. */
  questionnaireId: string;
  /** Scopes of the questionnaire with the mapping between id and name. */
  scopes?: Scopes;
  /** List of variables used for auto-completion in VTL editor. */
  variables?: Variable[];
};

/**
 * Create a new variable.
 *
 * A questionnaire must have a name, type, datatype. It may have a description
 * and a scope (defaults to whole questionnaire).
 */
export default function CreateVariable({
  questionnaireId,
  scopes,
  variables,
}: Readonly<Props>) {
  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <CreateVariableForm
        questionnaireId={questionnaireId}
        scopes={scopes}
        variables={variables}
      />
    </div>
  );
}
