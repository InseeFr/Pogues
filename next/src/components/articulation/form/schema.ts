import i18next from "i18next";
import { z } from "zod";

import { ArticulationVariablesLabel } from "@/models/articulation";

export const schema = z.object({
  items: z.tuple([
    z.object({
      label: z.literal(ArticulationVariablesLabel.FirstName),
      value: z
        .string()
        .min(1, { error: i18next.t("articulation.form.mustProvideFirstName") }),
    }),
    z.object({
      label: z.literal(ArticulationVariablesLabel.Gender),
      value: z
        .string()
        .min(1, { error: i18next.t("articulation.form.mustProvideGender") }),
    }),
    z.object({
      label: z.literal(ArticulationVariablesLabel.Age),
      value: z
        .string()
        .min(1, { error: i18next.t("articulation.form.mustProvideAge") }),
    }),
  ]),
});

export type FormValues = z.infer<typeof schema>;
