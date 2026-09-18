import { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import type { TargetModes } from '@/models/questionnaires'

import CreateReleaseForm from './CreateReleaseForm'
import DuplicateReleaseBanner from './DuplicateReleaseBanner.tsx'

type Props = {
  questionnaireId: string
  targetModes: TargetModes[]
  serie?: SerieDetailDTO
  isPublishDisabled: boolean
}

export default function CreateRelease({
  questionnaireId,
  targetModes,
  serie,
  isPublishDisabled,
}: Readonly<Props>) {
  return (
    <>
      {isPublishDisabled ? <DuplicateReleaseBanner /> : null}
      <div className="bg-default p-4 border border-default shadow-xl">
        <CreateReleaseForm
          questionnaireId={questionnaireId}
          seriesId={serie ? serie.label : ''}
          seriesLabel={serie ? serie.altLabel : ''}
          targetModes={targetModes}
          isPublishDisabled={isPublishDisabled}
        />
      </div>
    </>
  )
}
