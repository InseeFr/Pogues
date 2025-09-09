import z from 'zod';

export const schema = z.object({
  questionnaireFormula: z.string().optional(),
  leafFormula: z.string().optional(),
});

export type FormValues = z.infer<typeof schema>;
