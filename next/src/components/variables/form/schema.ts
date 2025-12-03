import z from 'zod';

import i18next from '@/lib/i18n';
import { DatatypeType, DateFormat, DurationFormat } from '@/models/datatype';
import { VariableType } from '@/models/variables';

import { screamingCamelCaseRegex } from './utils/name';

const datatypeEnum = z.enum(DatatypeType);
/** Properties specific to selected datatype. */
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
    minimum: z.number(),
    maximum: z.number(),
    decimals: z.number().min(0).optional(),
    isDynamicUnit: z.boolean().optional(),
    unit: z.string().optional(),
  }),
  z.object({
    typeName: datatypeEnum.extract(['Text']),
    maxLength: z.number().min(1).default(249).optional(),
  }),
]);

/** Properties common to every variables, no matter the type. */
const baseVariableSchema = z.object({
  name: z
    .string()
    .min(1, { message: i18next.t('variable.form.mustProvideName') })
    .regex(screamingCamelCaseRegex, {
      message: i18next.t('variable.form.mustProvideScreamingSnakeCaseName'),
    }),
  description: z
    .string()
    .min(1, { message: i18next.t('variable.form.mustProvideDescription') }),
  scope: z.string().optional(),
  datatype: datatypeSchema,
});

const variableTypeEnum = z.enum(VariableType);
/** Properties specific to selected variable type. */
export const schema = z.discriminatedUnion('type', [
  z.object({
    ...baseVariableSchema.shape,
    type: variableTypeEnum.extract(['Calculated']),
  }),
  z.object({
    ...baseVariableSchema.shape,
    type: variableTypeEnum.extract(['Collected']),
  }),
  z.object({
    ...baseVariableSchema.shape,
    type: variableTypeEnum.extract(['External']),
    isDeletedOnReset: z.boolean().optional(),
  }),
]);

export type FormValues = z.infer<typeof schema>;
