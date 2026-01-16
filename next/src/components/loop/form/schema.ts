import z from 'zod';

import i18next from '@/lib/i18n';
import type { VTLExpression } from '@/models/expression';
import { LoopType } from '@/models/loop';

const vtlExpressionSchema: z.ZodType<VTLExpression> = z.string();

/** common properties for any loop. */
const baseLoopSchema = z.object({
  name: z.string().min(1, { message: i18next.t('loop.form.mustProvideName') }),
  initialMemberReference: z.string().min(1, {
    message: i18next.t('loop.form.mustProvideInitialMemberReference'),
  }),
  finalMemberReference: z.string().min(1, {
    message: i18next.t('loop.form.mustProvideFinalMemberReference'),
  }),
  isBasedOn: z.boolean(),
});

const loopTypeEnum = z.enum(LoopType);

/** properties for a loop based on another one. */
const basedOnLoopSchema = z.object({
  ...baseLoopSchema.shape,
  type: loopTypeEnum.extract(['BasedOn']),
  isBasedOn: z.literal(true),
  iterableReference: z.string(),
  filter: vtlExpressionSchema.optional(),
});

/** properties for an independant loop with fixed length (min=max). */
const fixedLengthLoopSchema = z.object({
  ...baseLoopSchema.shape,
  type: loopTypeEnum.extract(['FixedLength']),
  isBasedOn: z.literal(false),
  isFixedLength: z.literal(true),
  size: vtlExpressionSchema,
  loopSinglePage: z.boolean(),
});

/** properties for an independant loop with dynamic length (min!=max). */
const dynamicLengthLoopSchema = z.object({
  ...baseLoopSchema.shape,
  type: loopTypeEnum.extract(['DynamicLength']),
  isBasedOn: z.literal(false),
  isFixedLength: z.literal(false),
  minimum: vtlExpressionSchema,
  maximum: vtlExpressionSchema,
  addButtonLabel: z.string().min(1).optional(),
});

/** properties for creating a loop. */
export const schema = z.discriminatedUnion('isBasedOn', [
  basedOnLoopSchema,
  z.discriminatedUnion('isFixedLength', [
    fixedLengthLoopSchema,
    dynamicLengthLoopSchema,
  ]),
]);

export type FormValues = z.infer<typeof schema>;
