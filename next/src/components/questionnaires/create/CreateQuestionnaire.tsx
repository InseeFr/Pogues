import FormComponent from '@/components/ui/form/FormComponent'

import CreateQuestionnaireForm from './CreateQuestionnaireForm'

interface CreateQuestionnaireProps {
  /** Stamp of the user who creates a questionnaire. */
  userStamp: string
}

/**
 * Create a new questionnaire.
 *
 * A questionnaire must have a title, target modes, a flow logic and a language
 * formula.
 *
 * {@link Questionnaire}
 */
export default function CreateQuestionnaire({
  userStamp,
}: Readonly<CreateQuestionnaireProps>) {
  return (
    <FormComponent>
      <CreateQuestionnaireForm stamp={userStamp} />
    </FormComponent>
  )
}
