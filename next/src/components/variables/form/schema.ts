import z from 'zod';

import i18next from '@/lib/i18n';
import { DatatypeType, DateFormat, DurationFormat } from '@/models/datatype';
import { VariableType } from '@/models/variables';

const datatypeEnum = z.enum(DatatypeType);
const datatypeSchema = z.discriminatedUnion('typeName', [
  z.object({
    typeName: datatypeEnum.extract(['Boolean']),
  }),
  z.object({
    typeName: datatypeEnum.extract(['Date']),
    format: z.enum(DateFormat),
    minimum: z.date().optional(),
    maximum: z.date().optional(),
  }),
  z.object({
    typeName: datatypeEnum.extract(['Duration']),
    format: z.enum(DurationFormat),
    years: z.number().optional(),
    months: z.date().optional(),
    hours: z.number().optional(),
    minutes: z.date().optional(),
  }),
  z.object({
    typeName: datatypeEnum.extract(['Numeric']),
    minimum: z.number().optional(),
    maximum: z.number().optional(),
    decimals: z.number().optional(),
    isDynamicUnit: z.boolean().optional(),
    unit: z.string().optional(),
  }),
  z.object({
    typeName: datatypeEnum.extract(['Text']),
    maxLength: z.number().min(1).default(254).optional(),
  }),
]);

export const schema = z.object({
  name: z
    .string()
    .min(1, { message: i18next.t('variable.form.mustProvideName') })
    .regex(/^[A-Z]+(_[A-Z]+)*$/, {
      message: i18next.t('variable.form.mustProvideScreamingSnakeCaseName'),
    }),
  description: z.string(),
  scope: z.string().optional(),
  datatype: datatypeSchema,
  type: z.enum(VariableType),
});

export type FormValues = z.infer<typeof schema>;
