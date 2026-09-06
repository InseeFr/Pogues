import { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import type { TargetModes } from '@/models/questionnaires'

import CreateReleaseForm from './CreateReleaseForm'

type Props = {
  questionnaireId: string
  targetModes: TargetModes[]
  serie?: SerieDetailDTO
}

export default function CreateRelease({
  questionnaireId,
  targetModes,
  serie,
}: Readonly<Props>) {
  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <CreateReleaseForm
        questionnaireId={questionnaireId}
        seriesId={serie ? serie.label : ''}
        seriesLabel={serie ? serie.altLabel : ''}
        targetModes={targetModes}
      />
    </div>
  )
}
