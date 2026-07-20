import i18next from 'i18next'
import { z } from 'zod'

import {
  FlowLogics,
  FormulasLanguages,
  TargetModes,
} from '@/models/questionnaires'

export const schema = z.object({
  name: z.string().min(1, { error: i18next.t('details.form.mustProvideName') }),
  title: z
    .string()
    .min(1, { error: i18next.t('questionnaire.form.mustProvideTitle') }),
  targetModes: z
    .array(z.enum(TargetModes))
    .min(1, { error: i18next.t('questionnaire.form.mustProvideTarget') }),
  agency: z
    .string()
    .min(1, { error: i18next.t('details.form.mustProvideSerie') }),
  flowLogic: z.enum(FlowLogics),
  formulasLanguage: z.enum(FormulasLanguages),
  serie: z
    .string()
    .min(1, { error: i18next.t('details.form.mustProvideSerie') }),
  operation: z.string().optional(),
})

export type FormValues = z.infer<typeof schema>
