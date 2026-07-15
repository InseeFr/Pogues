import { useTranslation } from 'react-i18next'

import type {
  QuestionNumberingMode,
  ReleaseRequest,
} from '../../../models/releases'

type OverrideGenerationParameters =
  ReleaseRequest['overrideGenerationParameters']

const QUESTION_NUMBERING_LABEL_KEY: Record<
  QuestionNumberingMode,
  'none' | 'sequence' | 'questionnaire'
> = {
  NONE: 'none',
  SEQUENCE: 'sequence',
  ALL: 'questionnaire',
}

export function ReleaseOptionalParametersDisplay({
  overrideGenerationParameters,
  innerClassName = 'space-y-1',
}: Readonly<{
  overrideGenerationParameters: OverrideGenerationParameters
  innerClassName?: string
}>) {
  const { t } = useTranslation()

  return (
    <>
      <div className="text-gray-500">{t('release.optionalParameters')} :</div>
      <div className={innerClassName}>
        <div className="flex flex-row gap-x-1">
          <b className="text-gray-500 font-normal">
            {t('release.form.pageTempsReponse.label')}
            {': '}
          </b>
          <input
            type="checkbox"
            disabled
            checked={overrideGenerationParameters.responseTimeQuestion}
            className="size-4 accent-gray-400 ml-1"
          />
        </div>
        <div>
          <b className="text-gray-500 font-normal">
            {t('release.form.questionNumbering.label')} :{' '}
          </b>
          <i className="font-mono">
            {t(
              `release.form.questionNumbering.${QUESTION_NUMBERING_LABEL_KEY[overrideGenerationParameters.questionNumberingMode]}`,
            )}
          </i>
        </div>
      </div>
    </>
  )
}
