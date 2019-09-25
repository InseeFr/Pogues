import { DATATYPE_NAME } from 'constants/pogues-constants';

const { BOOLEAN, TEXT, DATE, NUMERIC } = DATATYPE_NAME;

export const defaultTypageForm = {
  type: TEXT,
  [TEXT]: {
    maxLength: 255,
    pattern: '',
  },
  [NUMERIC]: {
    minimum: '',
    maximum: '',
    decimals: '',
    unit: '',
  },
  [DATE]: {},
  [BOOLEAN]: {},
};
