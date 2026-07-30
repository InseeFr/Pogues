import z from 'zod'

import i18next from '@/lib/i18n'

export const schema = z.object({
  releaseDescription: z
    .string()
    .min(1, { message: i18next.t('release.form.description.required') })
    .max(249, { message: i18next.t('release.form.description.maxLength') }),
  mode: z.array(z.enum(['CAWI', 'CAPI', 'CATI'])).min(1, {
    message: i18next.t('release.form.collectMode.required'),
  }),
  context: z.enum(['HOUSEHOLD', 'BUSINESS'], {
    error: i18next.t('release.form.contexte.required'),
  }),
  overrideGenerationParameters: z.object({
    responseTimeQuestion: z.boolean().default(true),
    questionNumberingMode: z
      .enum(['NONE', 'SEQUENCE', 'ALL'])
      .default('SEQUENCE'),
  }),
})

export type FormValues = z.input<typeof schema>
