import i18next from 'i18next'
import { z } from 'zod'

import {
  FlowLogics,
  FormulasLanguages,
  TargetModes,
} from '@/models/questionnaires'

export const schema = z.object({
  title: z
    .string()
    .min(1, { error: i18next.t('questionnaire.form.mustProvideTitle') }),
  targetModes: z
    .set(z.enum(TargetModes))
    .min(1, { error: i18next.t('questionnaire.form.mustProvideTarget') }),
  flowLogic: z.enum(FlowLogics),
  formulasLanguage: z.enum(FormulasLanguages),
})

export type FormValues = z.infer<typeof schema>
