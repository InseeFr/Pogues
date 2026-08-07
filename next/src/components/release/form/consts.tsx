import { t } from 'i18next'

export const CONTEXTE_OPTIONS = [
  { label: t('release.form.contexte.menages'), value: 'HOUSEHOLD' as const },
  {
    label: t('release.form.contexte.entreprise'),
    value: 'BUSINESS' as const,
  },
]

export const NUMEROTATION_OPTIONS = [
  {
    label: (
      <div className="text-left">
        <div>{t('release.form.questionNumbering.sequence')}</div>
        <div className="text-xs text-gray-500">
          {t('release.form.questionNumbering.sequenceDescription')}
        </div>
      </div>
    ),
    value: 'SEQUENCE' as const,
  },
  {
    label: (
      <div className="text-left">
        <div>{t('release.form.questionNumbering.questionnaire')}</div>
        <div className="text-xs text-gray-500">
          {t('release.form.questionNumbering.questionnaireDescription')}
        </div>
      </div>
    ),
    value: 'ALL' as const,
  },
  {
    label: (
      <div className="text-left">
        <div>{t('release.form.questionNumbering.none')}</div>
        <div className="text-xs text-gray-500">
          {t('release.form.questionNumbering.noneDescription')}
        </div>
      </div>
    ),
    value: 'NONE' as const,
  },
]
