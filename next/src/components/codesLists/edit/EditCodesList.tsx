import FormComponent from '@/components/ui/form/FormComponent'
import { CodesList } from '@/models/codesLists'
import { FormulasLanguages } from '@/models/questionnaires'
import { Variable } from '@/models/variables'

import EditCodesListForm from './EditCodesListForm'

interface EditCodesListProps {
  codesList?: CodesList
  questionnaireId: string
  formulasLanguage?: FormulasLanguages
  variables: Variable[]
}

/** Allow to edit an existing code list. */
export default function EditCodesList({
  codesList,
  questionnaireId,
  formulasLanguage,
  variables,
}: Readonly<EditCodesListProps>) {
  return !codesList ? (
    <div>Not found</div>
  ) : (
    <FormComponent>
      <EditCodesListForm
        codesList={codesList}
        questionnaireId={questionnaireId}
        formulasLanguage={formulasLanguage}
        variables={variables}
      />
    </FormComponent>
  )
}
