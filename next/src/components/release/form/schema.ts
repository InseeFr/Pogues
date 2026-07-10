import z from 'zod'

import i18next from '@/lib/i18n'
import { TargetModes } from '@/models/questionnaires'

export const schema = z.object({
  description: z
    .string()
    .min(1, { message: i18next.t('release.form.description.required') })
    .max(249, { message: i18next.t('release.form.description.maxLength') }),
  collectMode: z.enum(TargetModes, {
    error: i18next.t('release.form.collectMode.required'),
  }),
  contexte: z.enum(['menages', 'entreprise'], {
    error: i18next.t('release.form.contexte.required'),
  }),
  pageTempsReponse: z.boolean().default(true),
  numerotationQuestions: z
    .enum(['none', 'sequence', 'questionnaire'])
    .default('sequence'),
})

export type FormValues = z.input<typeof schema>
