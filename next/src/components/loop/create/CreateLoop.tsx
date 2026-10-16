import { useTranslation } from 'react-i18next'

import { loopsKeys, postLoop } from '@/api/loops'
import { questionnairesKeys } from '@/api/questionnaires'
import { scopesKeys } from '@/api/scopes'
import { variablesKeys } from '@/api/variables'
import FormComponent from '@/components/ui/form/FormComponent'
import { useFormSubmit } from '@/hooks/form/useFormSubmit'
import type { InitialLoopMember } from '@/models/loops'
import type { Scopes } from '@/models/scopes'
import type { Variable } from '@/models/variables'
import { uid } from '@/utils/utils'

import LoopForm from '../form/LoopForm'
import { type FormValues, schema } from '../form/schema'

type Props = {
  questionnaireId: string
  /** Available scopes with the mapping between id and name. */
  scopes: Scopes
  /** Components that can be the boundaries of the loop. */
  loopMembers: InitialLoopMember[]
  /** List of variables used for auto-completion in VTL editors. */
  variables?: Variable[]
}

/** Create a new loop. */
export default function CreateLoop({
  questionnaireId,
  scopes,
  loopMembers,
  variables,
}: Readonly<Props>) {
  const { t } = useTranslation()

  const { submit } = useFormSubmit({
    mutationFn: (formValues: FormValues) =>
      postLoop(questionnaireId, { id: uid(), ...formValues }),
    schema,
    invalidateKeys: [
      loopsKeys.all(questionnaireId),
      // The loop can become a scope and changes the scope of affected variables
      scopesKeys.detail(questionnaireId),
      variablesKeys.all(questionnaireId),
      questionnairesKeys.detail(questionnaireId),
    ],
    successMessage: (formValues) =>
      t('loop.create.success', { name: formValues.name }),
    navigateFunction: {
      to: '/questionnaire/$questionnaireId',
      params: { questionnaireId },
    },
  })

  const onSubmit = (formValues: FormValues) => {
    return submit(formValues)
  }

  return (
    <FormComponent>
      <LoopForm
        questionnaireId={questionnaireId}
        scopes={scopes}
        loopMembers={loopMembers}
        variables={variables}
        onSubmit={onSubmit}
        submitLabel={t('common.create')}
      />
    </FormComponent>
  )
}
