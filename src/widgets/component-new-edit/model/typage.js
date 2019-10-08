import { DATATYPE_NAME } from 'constants/pogues-constants';

const { BOOLEAN, TEXT, DATE, NUMERIC, DURATION } = DATATYPE_NAME;

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
    miyears: '',
    mimonths: '',
    mahours: '',
    maminutes: '',
    mayears: '',
    mamonths: '',
    format: '',
  },
};
