import { TABS_PATHS } from '@/constants/pogues-constants';
import Dictionary from '@/utils/dictionary/dictionary';

import {
  required,
  validateEarlyTarget,
  validateExistingTarget,
} from '../validate-rules';

const { REDIRECTIONS } = TABS_PATHS;

export const redirectionRules = {
  [`${REDIRECTIONS}.label`]: [
    (value?: string | number) =>
      required(value) && Dictionary.validation_goTo_description,
  ],
  [`${REDIRECTIONS}.condition`]: [
    (value?: string | number) =>
      required(value) && Dictionary.validation_condition,
  ],
  [`${REDIRECTIONS}.cible`]: [
    (value?: string | number) =>
      required(value) && Dictionary.validation_target,
    validateEarlyTarget,
    validateExistingTarget,
  ],
};
