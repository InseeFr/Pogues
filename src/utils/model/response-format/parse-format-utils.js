import { DATATYPE_VIS_HINT, UI_BEHAVIOUR } from 'constants/pogues-constants';
import { QUESTION_TYPE_ENUM } from 'constants/schema';
import { emptyDatatypeFactory } from 'utils/model/data-types/data-types-utils';

const { FIRST_INTENTION } = UI_BEHAVIOUR;
const { CHECKBOX } = DATATYPE_VIS_HINT;
const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;

export const defaultSpecial = {
  hasSpecialCode: false,
  specialLabel: '',
  specialCode: '',
  specialUiBehaviour: FIRST_INTENTION,
  specialFollowUpMessage: '',
};
/**
 * Default value for a response format. We create an entry for each type of
 * format. This will allow recovering of previously filled parameters if the
 * user mistakenly switches between format types.
 */
export const emptyFormat = {
  type: SIMPLE,
  mandatory: false,
  [SIMPLE]: emptyDatatypeFactory,
  [SINGLE_CHOICE]: {
    codeListReference: '',
    visHint: CHECKBOX,
    ...defaultSpecial,
  },
  [MULTIPLE_CHOICE]: {
    infoCodeList: '',
    measureBoolean: false,
    measureCodeList: '',
    measureVisHint: CHECKBOX,
  },
  [TABLE]: {
    firstInfoCodeList: '',
    firstInfoAsAList: false,
    firstInfoMin: '',
    firstInfoMax: '',
    hasTwoInfoAxes: false,
    scndInfoCodeList: '',
    firstInfoTotal: false,
    firstInfoTotalLabel: '',
    scndInfoTotal: false,
    scndInfoTotalLabel: '',
    measures: [
      {
        type: SIMPLE,
        label: '',
        [SIMPLE]: emptyDatatypeFactory,
        [SINGLE_CHOICE]: {
          codeListReference: '',
          visHint: CHECKBOX,
        },
      },
    ],
  },
};
