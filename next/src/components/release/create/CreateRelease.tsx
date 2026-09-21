import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  return (
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
        />
      </div>
    </div>
  )
}
