import { DATATYPE_NAME, TABS_PATHS } from '@/constants/pogues-constants';
import Dictionary from '@/utils/dictionary/dictionary';

import {
  letterStart,
  name,
  nameSize,
  required,
  typeCalculated,
  validateDuplicatesCalculated,
} from '../validate-rules';

const { NUMERIC } = DATATYPE_NAME;
const { CALCULATED_VARIABLES } = TABS_PATHS;

export const calculatedVariableRules = {
  [`${CALCULATED_VARIABLES}.label`]: [
    (value?: string) =>
      required(value) && Dictionary.validation_calculatedvariable_label,
  ],
  [`${CALCULATED_VARIABLES}.name`]: [
    (value?: string) =>
      required(value) && Dictionary.validation_calculatedvariable_name,
    name,
    nameSize,
    letterStart,
    (
      value: string,
      conf: {
        form: {
          calculatedVariables: { calculatedVariables: { name: string }[] };
        };
        state: { selectedItemIndex: number };
      },
    ) =>
      validateDuplicatesCalculated(value, conf) &&
      Dictionary.validation_calculatedvariable_existing,
  ],
  [`${CALCULATED_VARIABLES}.formula`]: [
    (value?: string) =>
      required(value) && Dictionary.validation_calculatedvariable_formula,
  ],

  [`${CALCULATED_VARIABLES}.${NUMERIC}.minimum`]: [
    (
      value: string | number | null | undefined,
      conf: { form: { calculatedVariables: { type: string } } },
    ) =>
      required(value) && typeCalculated(conf) && Dictionary.validation_minimum,
  ],
  [`${CALCULATED_VARIABLES}.${NUMERIC}.maximum`]: [
    (
      value: string | number | null | undefined,
      conf: { form: { calculatedVariables: { type: string } } },
    ) =>
      required(value) && typeCalculated(conf) && Dictionary.validation_maximum,
  ],
};
