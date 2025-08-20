import { DATATYPE_NAME, TABS_PATHS } from '@/constants/pogues-constants';
import Dictionary from '@/utils/dictionary/dictionary';

import {
  letterStart,
  name,
  nameSize,
  required,
  typeExternal,
  validateDuplicatesExternal,
} from '../validate-rules';

const { NUMERIC } = DATATYPE_NAME;
const { EXTERNAL_VARIABLES } = TABS_PATHS;

export const externalVariableRules = {
  [`${EXTERNAL_VARIABLES}.label`]: [
    (value?: string | number) =>
      required(value) && Dictionary.validation_externalvariable_label,
  ],
  [`${EXTERNAL_VARIABLES}.name`]: [
    (value?: string | number) =>
      required(value) && Dictionary.validation_externalvariable_name,
    name,
    nameSize,
    letterStart,
    (
      value: string,
      conf: {
        form: { externalVariables: { externalVariables: { name: string }[] } };
        state: { selectedItemIndex: number };
      },
    ) =>
      validateDuplicatesExternal(value, conf) &&
      Dictionary.validation_externalvariable_existing,
  ],
  [`${EXTERNAL_VARIABLES}.${NUMERIC}.minimum`]: [
    (
      value: string | number | null | undefined,
      conf: { form: { externalVariables: { type: string } } },
    ) => required(value) && typeExternal(conf) && Dictionary.validation_minimum,
  ],
  [`${EXTERNAL_VARIABLES}.${NUMERIC}.maximum`]: [
    (
      value: string | number | null | undefined,
      conf: { form: { externalVariables: { type: string } } },
    ) => required(value) && typeExternal(conf) && Dictionary.validation_maximum,
  ],
};
