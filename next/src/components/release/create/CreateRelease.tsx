import { useTranslation } from 'react-i18next'

import { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import WarningIcon from '@/components/ui/icons/WarningIcon'
import { TargetModes } from '@/models/questionnaires'

import CreateReleaseForm from './CreateReleaseForm'

type Props = {
  questionnaireId: string
  targetModes: TargetModes[]
  serie?: SerieDetailDTO
}

const hasPublishableMode = (modes: TargetModes[]): boolean =>
  modes.some((mode) => mode !== TargetModes.PAPI)

export default function CreateRelease({
  questionnaireId,
  targetModes,
  serie,
}: Readonly<Props>) {
  const { t } = useTranslation()
  return (
    <div>
      {hasPublishableMode(targetModes) ? (
        <>
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
        </>
      ) : (
        <div
          role="alert"
          className="bg-orange-100 border border-orange-300 text-orange-800 text-sm rounded p-3 mb-6 flex items-center gap-1"
        >
          <WarningIcon className="w-6 h-6 text-orange-800 mr-3 flex-shrink-0" />
          <div className="text-orange-800">
            {t('release.form.collectMode.noMatch')}
          </div>
        </div>
      )}
    </div>
  )
}
