import { TABS_PATHS } from '@/constants/pogues-constants';
import Dictionary from '@/utils/dictionary/dictionary';

import {
  letterStart,
  name,
  nameSize,
  required,
  validateDuplicatesCollected,
} from '../validate-rules';

const { COLLECTED_VARIABLES } = TABS_PATHS;

export const collectedVariableRules = {
  [`${COLLECTED_VARIABLES}.label`]: [
    (value?: string | number) =>
      required(value) && Dictionary.validation_collectedvariable_label,
  ],
  [`${COLLECTED_VARIABLES}.name`]: [
    (value?: string | number) =>
      required(value) && Dictionary.validation_collectedvariable_name,
    name,
    nameSize,
    letterStart,
    (
      value: string,
      conf: {
        form: {
          collectedVariables: { collectedVariables: { name: string }[] };
        };
        state: { selectedItemIndex: number };
      },
    ) =>
      validateDuplicatesCollected(value, conf) &&
      Dictionary.validation_collectedvariable_existing,
  ],
};
