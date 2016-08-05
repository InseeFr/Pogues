import {
  RESPONSE_FORMAT, DATATYPE_VIS_HINT, UI_BEHAVIOUR
} from '../constants/pogues-constants'
import { emptyDatatypeFactory } from '../reducers/datatype-utils'

const { FIRST_INTENTION } = UI_BEHAVIOUR
const { CHECKBOX } = DATATYPE_VIS_HINT
const { SIMPLE, SINGLE, MULTIPLE, TABLE } = RESPONSE_FORMAT

export const defaultSpecial = {
  hasSpecialCode: false,
  specialLabel: '',
  specialCode: '',
  specialUiBehaviour: FIRST_INTENTION,
  specialFollowUpMessage: ''
}
/**
 * Default value for a response format. We create an entry for each type of
 * format. This will allow recovering of previously filled parameters if the
 * user mistakenly switches between format types.
 */
export const emptyFormat = {
  type: SIMPLE,
  mandatory: false,
  [SIMPLE]: emptyDatatypeFactory,
  [SINGLE]: {
    codeListReference: '',
    visHint: CHECKBOX,
    ...defaultSpecial
  },
  [MULTIPLE]: {
    infoCodeList: '',
    measureBoolean: false,
    measureCodeList: '',
    measureVisHint: CHECKBOX
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
    measures: [{
      type: SIMPLE,
      label: '',
      [SIMPLE]: emptyDatatypeFactory,
      [SINGLE]: {
        codeListReference: '',
        visHint: CHECKBOX
      }
    }]
  }
}
