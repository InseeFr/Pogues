import type { InitialLoopMember } from '@/models/loops'
import type { Scopes } from '@/models/scopes'
import type { Variable } from '@/models/variables'

import LoopForm from '../form/LoopForm'
import { type FormValues } from '../form/schema'

type Props = {
  questionnaireId: string
  /** Available scopes with the mapping between id and name. */
  scopes: Scopes
  /** Components that can be the boundaries of the loop. */
  loopMembers: InitialLoopMember[]
  /** List of variables used for auto-completion in VTL editors. */
  variables?: Variable[]
}

/**
 * Create a new loop.
 *
 * TODO: wire up the submission once the endpoint to create a loop exists.
 */
export default function CreateLoop({
  questionnaireId,
  scopes,
  loopMembers,
  variables,
}: Readonly<Props>) {
  const submitForm = async (loop: FormValues) => {
    console.log('Create loop', loop)
  }

  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <LoopForm
        questionnaireId={questionnaireId}
        scopes={scopes}
        loopMembers={loopMembers}
        variables={variables}
        onSubmit={submitForm}
      />
    </div>
  )
}
