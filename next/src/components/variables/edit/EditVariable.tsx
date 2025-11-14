import type { Variable } from '@/models/variables';

import EditVariableForm from './EditVariableForm';

type Props = {
  /** Variable to edit. Will display "not found" if undefined. */
  variable?: Variable;
  /** Related questionnaire id. */
  questionnaireId: string;
  /** Available scopes in the questionnaire. */
  scopes: Set<string>;
};

/** Allow to edit an existing code list. */
export default function EditVariable({
  variable,
  questionnaireId,
  scopes,
}: Readonly<Props>) {
  return variable === undefined ? (
    <div>Not found</div>
  ) : (
    <div className="bg-default p-4 border border-default shadow-xl">
      <EditVariableForm
        variable={variable}
        questionnaireId={questionnaireId}
        scopes={scopes}
      />
    </div>
  );
}
