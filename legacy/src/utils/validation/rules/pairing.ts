import {
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  QUESTION_TYPE_ENUM,
  TABS_PATHS,
} from '@/constants/pogues-constants';

import { required } from '../validate-rules';

const { PAIRING } = QUESTION_TYPE_ENUM;
const { RESPONSE_FORMAT } = TABS_PATHS;

export const pairingRules = {
  [`${RESPONSE_FORMAT}.${PAIRING}.nameSourceVariable`]: [required],
  [`${RESPONSE_FORMAT}.${PAIRING}.${DEFAULT_CODES_LIST_SELECTOR_PATH}.id`]: [
    required,
  ],
};
