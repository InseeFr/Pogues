import { useTranslation } from 'react-i18next'

import { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import type { TargetModes } from '@/models/questionnaires'

import CreateReleaseForm from './CreateReleaseForm'

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
  const { t } = useTranslation()

  return (
    <>
      {isPublishDisabled ? (
        <div
          role="alert"
          className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-3 mb-6"
        >
          {t('release.create.alreadyPublished')}
        </div>
      ) : null}
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
