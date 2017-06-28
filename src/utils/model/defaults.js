import { DATATYPE_NAME } from 'constants/pogues-constants';
import { QUESTION_TYPE_ENUM } from 'constants/schema';

const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { TEXT } = DATATYPE_NAME;

export const responseFormatSimpleDefault = {
  [SIMPLE]: {
    mandatory: false,
    type: TEXT,
    [TEXT]: {
      maxLength: 255,
    },
  },
};

export const responseFormatSingleDefault = {
  [SINGLE_CHOICE]: {
    mandatory: false,
    codesList: '',
    codes: [],
  },
};

export function getDefaultByResponseFormatType(type) {
  let defaultValue = {};
  if (type === SIMPLE) {
    defaultValue = responseFormatSimpleDefault;
  } else if (type === SINGLE_CHOICE) {
    defaultValue = responseFormatSingleDefault;
  }
  return defaultValue;
}
