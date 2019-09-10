import {
  COMPONENT_TYPE,
  QUESTION_TYPE_ENUM,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  DEFAULT_CODES_LIST_SELECTOR_PATH
} from 'constants/pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;
const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;

function getCodesListsStore(num) {
  const codesListsStore = {};

  for (let i = 1; i <= num; i += 1) {
    const key = `CODES_LIST_ID_${i}`;
    codesListsStore[key] = { id: key };
  }

  return codesListsStore;
}

export const codesListsStore = getCodesListsStore(12);

export const expectedCodesListsStore = getCodesListsStore(8);

export const singleFormatCodesListsIds = ['CODES_LIST_ID_1'];

export const multipleFormatCodesListsIds = [
  'CODES_LIST_ID_2',
  'CODES_LIST_ID_3'
];

export const tableFormatCodesListsIds = [
  'CODES_LIST_ID_4',
  'CODES_LIST_ID_5',
  'CODES_LIST_ID_6',
  'CODES_LIST_ID_7',
  'CODES_LIST_ID_8'
];

export const componentsStore = {
  COMPONENT_ID_1: {
    id: 'COMPONENT_ID_1',
    type: QUESTION,
    responseFormat: {
      type: SINGLE_CHOICE,
      [SINGLE_CHOICE]: {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: 'CODES_LIST_ID_1' }
      }
    }
  },
  COMPONENT_ID_2: {
    id: 'COMPONENT_ID_2',
    type: QUESTION,
    responseFormat: {
      type: MULTIPLE_CHOICE,
      [MULTIPLE_CHOICE]: {
        [PRIMARY]: {
          [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: 'CODES_LIST_ID_2' }
        },
        [MEASURE]: {
          type: CODES_LIST,
          [CODES_LIST]: {
            [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: 'CODES_LIST_ID_3' }
          }
        }
      }
    }
  },
  COMPONENT_ID_3: {
    id: 'COMPONENT_ID_3',
    type: QUESTION,
    responseFormat: {
      type: TABLE,
      [TABLE]: {
        [PRIMARY]: {
          type: CODES_LIST,
          [CODES_LIST]: {
            [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: 'CODES_LIST_ID_4' }
          }
        },
        [SECONDARY]: {
          [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: 'CODES_LIST_ID_5' }
        },
        [MEASURE]: {
          type: SINGLE_CHOICE,
          [SINGLE_CHOICE]: {
            [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: 'CODES_LIST_ID_6' }
          }
        },
        [LIST_MEASURE]: [
          {
            type: SIMPLE
          },
          {
            type: SINGLE_CHOICE,
            [SINGLE_CHOICE]: {
              [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: 'CODES_LIST_ID_7' }
            }
          },
          {
            type: SINGLE_CHOICE,
            [SINGLE_CHOICE]: {
              [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: 'CODES_LIST_ID_8' }
            }
          }
        ]
      }
    }
  },
  COMPONENT_ID_4: {
    id: 'COMPONENT_ID_4',
    type: SUBSEQUENCE
  },
  COMPONENT_ID_5: {
    id: 'COMPONENT_ID_5',
    type: SEQUENCE
  }
};

export const listCodes = [{ id: '10', parent: '1' }, { id: '11', parent: '1' }];
