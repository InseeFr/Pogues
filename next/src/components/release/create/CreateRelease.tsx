import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  return (
    <>
      {isPublishDisabled ? <DuplicateReleaseBanner /> : null}
    <div>
      <div className="items-center p-3 border-primary border rounded shadow mb-3 bg-default">
        <div>{t('release.form.introduction')}</div>
      </div>

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
