import { useTranslation } from 'react-i18next'

import { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import Banner, { BannerStyle } from '@/components/ui/Banner.tsx'
import FormComponent from '@/components/ui/form/FormComponent'
import { TargetModes } from '@/models/questionnaires'

import CreateReleaseForm from './CreateReleaseForm'

type Props = {
  questionnaireId: string
  targetModes: TargetModes[]
  serie?: SerieDetailDTO
  isPublishDisabled: boolean
}

const hasPublishableMode = (modes: TargetModes[]): boolean =>
  modes.some((mode) => mode !== TargetModes.PAPI)

export default function CreateRelease({
  questionnaireId,
  targetModes,
  serie,
  isPublishDisabled,
}: Readonly<Props>) {
  const { t } = useTranslation()
  return (
    <div>
      {isPublishDisabled ? (
        <Banner
          message={t('release.create.alreadyPublished')}
          type={BannerStyle.Error}
        />
      ) : null}
      {hasPublishableMode(targetModes) ? (
        <div className="grid gap-3">
          <Banner
            message={t('release.form.introduction')}
            type={BannerStyle.Info}
          />
          <FormComponent>
            <CreateReleaseForm
              questionnaireId={questionnaireId}
              seriesId={serie ? serie.label : ''}
              seriesLabel={serie ? serie.altLabel : ''}
              targetModes={targetModes}
              isPublishDisabled={isPublishDisabled}
            />
          </FormComponent>
        </div>
      ) : (
        <Banner
          message={t('release.form.collectMode.noMatch')}
          type={BannerStyle.Warning}
        />
      )}
    </div>
  )
}
