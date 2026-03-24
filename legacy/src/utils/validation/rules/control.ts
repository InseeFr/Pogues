import { TABS_PATHS } from '@/constants/pogues-constants';
import Dictionary from '@/utils/dictionary/dictionary';

import { required } from '../validate-rules';

const { CONTROLS } = TABS_PATHS;

export const controlRules = {
  [`${CONTROLS}.label`]: [
    (value?: string | number) =>
      required(value) && Dictionary.validation_control_description,
  ],
  [`${CONTROLS}.condition`]: [
    (value?: string | number) =>
      required(value) && Dictionary.validation_expression,
  ],
  [`${CONTROLS}.message`]: [
    (value?: string | number) =>
      required(value) && Dictionary.validation_control_message,
  ],
};
