import i18next from 'i18next';
import { z } from 'zod';

export const schema = z.object({
  items: z.tuple([
    z.object({
      label: z.literal('Prénom'),
      value: z
        .string()
        .min(1, { error: i18next.t('articulation.form.mustProvideFirstName') }),
    }),
    z.object({
      label: z.literal('Sexe'),
      value: z
        .string()
        .min(1, { error: i18next.t('articulation.form.mustProvideGender') }),
    }),
    z.object({
      label: z.literal('Age'),
      value: z
        .string()
        .min(1, { error: i18next.t('articulation.form.mustProvideAge') }),
    }),
  ]),
});

export type FormValues = z.infer<typeof schema>;
