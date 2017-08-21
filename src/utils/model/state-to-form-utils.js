import { QUESTION_TYPE_ENUM, DIMENSION_TYPE, DIMENSION_FORMATS } from 'constants/pogues-constants';
import { defaultResponseFormatState } from 'utils/transformation-entities/response-format';

const { SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { CODES_LIST } = DIMENSION_FORMATS;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;

export function getCurrentCodesListsIdsStore(responseFormat) {
  const store = {
    [SINGLE_CHOICE]: '',
    [`${MULTIPLE_CHOICE}.${PRIMARY}`]: '',
    [`${MULTIPLE_CHOICE}.${MEASURE}.${CODES_LIST}`]: '',
    [`${TABLE}.${PRIMARY}.${CODES_LIST}`]: '',
    [`${TABLE}.${SECONDARY}`]: '',
    [`${TABLE}.${MEASURE}.${SINGLE_CHOICE}`]: '',
  };

  if (responseFormat.type === SINGLE_CHOICE) {
    store[SINGLE_CHOICE] = responseFormat[SINGLE_CHOICE].codesListId;
  } else if (responseFormat.type === MULTIPLE_CHOICE) {
    store[`${MULTIPLE_CHOICE}.${PRIMARY}`] = responseFormat[MULTIPLE_CHOICE][PRIMARY].codesListId;
    if (responseFormat[MULTIPLE_CHOICE][MEASURE].type === CODES_LIST) {
      store[`${MULTIPLE_CHOICE}.${MEASURE}.${CODES_LIST}`] =
        responseFormat[MULTIPLE_CHOICE][MEASURE][CODES_LIST].codesListId;
    }
  } else if (responseFormat.type === TABLE) {
    if (responseFormat[TABLE][PRIMARY].type === CODES_LIST) {
      store[`${TABLE}.${PRIMARY}.${CODES_LIST}`] = responseFormat[TABLE][PRIMARY][CODES_LIST].codesListId;
    }
    if (responseFormat[TABLE][SECONDARY] && responseFormat[TABLE][SECONDARY].showSecondaryAxis) {
      store[`${TABLE}.${SECONDARY}`] = responseFormat[TABLE][SECONDARY].codesListId;
    }
    if (responseFormat[TABLE][MEASURE] && responseFormat[TABLE][MEASURE].type === SINGLE_CHOICE) {
      store[`${TABLE}.${MEASURE}.${SINGLE_CHOICE}`] = responseFormat[TABLE][MEASURE][SINGLE_CHOICE].codesListId;
    }

    if (responseFormat[TABLE][LIST_MEASURE] && responseFormat[TABLE][LIST_MEASURE].length > 0) {
      const listMeasures = responseFormat[TABLE][LIST_MEASURE];

      for (let i = 0; i < listMeasures.length; i += 1) {
        store[`${TABLE}.${PRIMARY}.${CODES_LIST}.${i}`] = '';
        if (listMeasures[i].type === CODES_LIST) {
          store[`${TABLE}.${PRIMARY}.${CODES_LIST}.${i}`] = listMeasures[i][CODES_LIST].codesListId;
        }
      }
    }
  }

  return store;
}
