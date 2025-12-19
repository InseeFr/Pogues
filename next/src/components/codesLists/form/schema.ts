import i18next from 'i18next';
import { z } from 'zod';

const codesSchema = z.object({
  value: z
    .string()
    .min(1, { error: i18next.t('codesList.form.mustProvideCodeValue') }),
  label: z
    .string()
    .min(1, { error: i18next.t('codesList.form.mustProvideCodeLabel') }),
  get codes() {
    return z.array(codesSchema).optional();
  },
});

export const schema = z
  .object({
    label: z
      .string()
      .min(1, { error: i18next.t('codesList.form.mustProvideLabel') }),
    codes: codesSchema
      .array()
      .min(1, { error: i18next.t('codesList.form.mustProvideCodes') }),
  })
  .check((ctx) => {
    // Handle duplicate on code values
    validateDuplicateValues(ctx.value.codes, 'codes', ctx);
  });

export type FormValues = z.infer<typeof schema>;

/** Helper function to check for duplicate values and add errors. */
function validateDuplicateValues(
  codes: z.infer<typeof codesSchema>[],
  pathPrefix: string,
  ctx: z.core.ParsePayload<FormValues>,
) {
  const valuePaths: { value: string; paths: string[] }[] = [];

  /** Collect values and their paths recursively. */
  const collectValues = (
    codes: z.infer<typeof codesSchema>[],
    pathPrefix: string,
  ) => {
    codes.forEach((code, index) => {
      const currentPath = `${pathPrefix}.${index}.value`; // Path to the value field

      // Add the value and path to the valuePaths array
      const existingValue = valuePaths.find(
        (item) => item.value === code.value,
      );
      if (existingValue) {
        // If value exists, push the path
        existingValue.paths.push(currentPath);
      } else {
        // If value does not exist, create a new entry
        valuePaths.push({ value: code.value, paths: [currentPath] });
      }

      // If the code has subcodes, we add them recursively
      if (code.codes?.length) {
        collectValues(code.codes, `${pathPrefix}.${index}.codes`);
      }
    });
  };

  // Collect all values and their paths
  collectValues(codes, pathPrefix);

  // Check for duplicates and add validation issues for duplicate values
  valuePaths.forEach(({ value, paths }) => {
    if (paths.length > 1) {
      // If the value appears more than once, it's a duplicate
      paths.forEach((path) => {
        ctx.issues.push({
          code: 'custom',
          message: i18next.t('codesList.form.mustProvideUniqueValue', {
            value,
          }),
          input: ctx.value,
          path: path.split('.'), // Add issue to all paths where the value appears
        });
      });
    }
  });
}
