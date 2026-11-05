import FormComponent from '@/components/ui/form/FormComponent'
import type { SerieItem } from '@/models/series'
import type { Stamp } from '@/models/stamps'

import CreateQuestionnaireForm from './CreateQuestionnaireForm'

interface CreateQuestionnaireProps {
  /** Stamp of the user who creates a questionnaire. */
  userStamp: string
  series: SerieItem[]
  stamps: Stamp[]
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
  series,
  stamps,
}: Readonly<CreateQuestionnaireProps>) {
  return (
    <FormComponent>
      <CreateQuestionnaireForm
        defaultStamp={userStamp}
        series={series}
        stamps={stamps}
      />
    </FormComponent>
  )
}
