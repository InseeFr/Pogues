import FormComponent from '@/components/ui/form/FormComponent'
import { FormulasLanguages } from '@/models/questionnaires'
import { Variable } from '@/models/variables'

import CreateCodesListForm from './CreateCodesListForm'

interface CreateCodesListProps {
  questionnaireId: string
  formulasLanguage?: FormulasLanguages
  variables: Variable[]
}

/** Allow to create a new codes list through a form with manual and CSV import options. */
export default function CreateCodesList({
  questionnaireId,
  formulasLanguage,
  variables,
}: Readonly<CreateCodesListProps>) {
  return (
    <FormComponent>
      <CreateCodesListForm
        questionnaireId={questionnaireId}
        formulasLanguage={formulasLanguage}
        variables={variables}
      />
    </FormComponent>
  )
}
