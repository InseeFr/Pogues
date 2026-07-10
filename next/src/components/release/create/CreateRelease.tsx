import type { TargetModes } from '@/models/questionnaires'

import CreateReleaseForm from './CreateReleaseForm'

type Props = {
  questionnaireId: string
  targetModes: Set<TargetModes>
}

export default function CreateRelease({
  questionnaireId,
  targetModes,
}: Readonly<Props>) {
  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <CreateReleaseForm
        questionnaireId={questionnaireId}
        seriesId={''}
        seriesLabel={''}
        targetModes={targetModes}
      />
    </div>
  )
}
