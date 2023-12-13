import { DATATYPE_NAME } from '../../../constants/pogues-constants';

const { BOOLEAN, TEXT, DATE, NUMERIC, DURATION } = DATATYPE_NAME;

export const defaultTypageForm = {
  type: TEXT,
  [TEXT]: {
    maxLength: 249,
    pattern: '',
  },
  [NUMERIC]: {
    minimum: '',
    maximum: '',
    decimals: '',
    unit: '',
  },
  [DATE]: {
    maximum: '',
    minimum: '',
    format: '',
  },
  [BOOLEAN]: {},
  [DURATION]: {
    maximum: '',
    minimum: '',
    mihours: '',
    miminutes: '',
    mihundhours: '',
    mihundredths: '',
    miyears: '',
    mimonths: '',
    mahours: '',
    maminutes: '',
    mahundhours: '',
    mahundredths: '',
    mayears: '',
    mamonths: '',
    format: '',
  },
};
