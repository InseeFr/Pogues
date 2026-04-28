import type { Variable } from '@/models/variables'

import EditVariableForm from './EditVariableForm'

type Props = {
  /** Variable to edit. Will display "not found" if undefined. */
  variable?: Variable
  /** Related questionnaire id. */
  questionnaireId: string
  /** Scopes of the questionnaire with the mapping between id and name. */
  scopes: Map<string, string>
  /** List of variables used for auto-completion in VTL editor. */
  variables?: Variable[]
}

/** Allow to edit an existing code list. */
export default function EditVariable({
  variable,
  questionnaireId,
  scopes,
  variables,
}: Readonly<Props>) {
  if (variable === undefined) {
    return <div>Not found</div>
  }

  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <EditVariableForm
        variable={variable}
        questionnaireId={questionnaireId}
        scopes={scopes}
        variables={variables}
      />
    </div>
  )
}
