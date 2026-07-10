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
    label: t('release.form.numerotationQuestions.none'),
    value: 'NONE' as const,
  },
  {
    label: t('release.form.numerotationQuestions.sequence'),
    value: 'SEQUENCE' as const,
  },
  {
    label: t('release.form.numerotationQuestions.questionnaire'),
    value: 'ALL' as const,
  },
]
