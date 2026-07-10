import { t } from 'i18next'

export const CONTEXTE_OPTIONS = [
  { label: t('release.form.contexte.menages'), value: 'menages' as const },
  {
    label: t('release.form.contexte.entreprise'),
    value: 'entreprise' as const,
  },
]

export const NUMEROTATION_OPTIONS = [
  {
    label: t('release.form.numerotationQuestions.none'),
    value: 'none' as const,
  },
  {
    label: t('release.form.numerotationQuestions.sequence'),
    value: 'sequence' as const,
  },
  {
    label: t('release.form.numerotationQuestions.questionnaire'),
    value: 'questionnaire' as const,
  },
]
