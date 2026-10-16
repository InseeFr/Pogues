import { z } from 'zod'

import i18next from '@/lib/i18n'

/** Properties common to every loops, no matter how its occurrences are defined. */
const baseLoopSchema = z.object({
  name: z.string().min(1, { error: i18next.t('loop.form.mustProvideName') }),
  /** First component repeated by the loop. */
  initialMember: z
    .string()
    .min(1, { error: i18next.t('loop.form.mustProvideInitialMember') }),
  /** Last component repeated by the loop, sibling of the initial member. */
  finalMember: z
    .string()
    .min(1, { error: i18next.t('loop.form.mustProvideFinalMember') }),
})

/** Loop repeated for each occurrence of an existing scope. */
const basedOnLoopSchema = z.object({
  ...baseLoopSchema.shape,
  /**
   * Scope (sequence/loop) the new loop is nested in.
   *
   * Aborting when empty lets the union only report the issues of the other
   * option.
   */
  basedOn: z.string().min(1, { abort: true }),
  filter: z.string().optional(),
})

/** Properties of a loop not based on a scope. */
const notBasedOnLoopSchema = z.object({
  ...baseLoopSchema.shape,
  basedOn: z.literal('').optional(),
})

/**
 * Loop whose number of occurrences is defined by the user.
 *
 * Missing values are prefaulted so that they are reported as too small instead
 * of aborting the parsing, which would make the union report the issues of
 * every option.
 */
const occurrencesLoopSchema = z.discriminatedUnion('isFixedLength', [
  // Fixed number of occurrences.
  z.object({
    ...notBasedOnLoopSchema.shape,
    isFixedLength: z.literal(true),
    size: z
      .string()
      .trim()
      .min(1, { error: i18next.t('loop.form.mustProvideSize') })
      .prefault(''),
    /** Whether each occurrence is displayed on its own page. */
    shouldSplitIterations: z.boolean().prefault(false),
  }),
  // Dynamic number of occurrences.
  z.object({
    ...notBasedOnLoopSchema.shape,
    isFixedLength: z.literal(false),
    minimum: z
      .string()
      .trim()
      .min(1, { error: i18next.t('loop.form.mustProvideMinimum') })
      .prefault(''),
    maximum: z
      .string()
      .trim()
      .min(1, { error: i18next.t('loop.form.mustProvideMaximum') })
      .prefault(''),
    addButtonLabel: z.string().optional(),
  }),
])

/**
 * Loop form values, depending on whether the loop is based on a scope and then
 * on whether it has a fixed number of occurrences.
 *
 * Fields that are not displayed to the user are not part of the matching
 * option, so they are removed from the submitted values.
 */
export const schema = z.union([basedOnLoopSchema, occurrencesLoopSchema])

/** Values of the form, as edited by the user. */
export type FormInputValues = z.input<typeof schema>

/** Values of the form, once validated and submitted. */
export type FormValues = z.infer<typeof schema>
