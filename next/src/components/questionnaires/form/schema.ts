import { z } from 'zod'

import i18next from '@/lib/i18n'
import { TargetModes } from '@/models/questionnaires'

export const schema = z.object({
  title: z
    .string()
    .min(1, { error: i18next.t('questionnaire.form.mustProvideTitle') }),
  name: z
    .string()
    .min(1, { error: i18next.t('questionnaire.form.mustProvideName') })
    .max(10, { error: i18next.t('questionnaire.form.nameMaxLength') })
    .regex(/^\w+$/, {
      error: i18next.t('questionnaire.form.nameInvalidChars'),
    }),
  targetModes: z
    .set(z.enum(TargetModes))
    .min(1, { error: i18next.t('questionnaire.form.mustProvideTarget') }),
  agency: z
    .string()
    .min(1, { error: i18next.t('questionnaire.form.mustProvideAgency') }),
  owner: z
    .string()
    .min(1, { error: i18next.t('details.form.mustProvideStamp') }),
  serie: z.string().optional(),
})

export type FormValues = z.infer<typeof schema>
