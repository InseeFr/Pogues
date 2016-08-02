import {
  RESPONSE_FORMAT, DATATYPE_VIS_HINT
} from '../constants/pogues-constants'
import { emptyDatatypeFactory } from '../reducers/datatype-utils'

const { CHECKBOX } = DATATYPE_VIS_HINT
const { SIMPLE, SINGLE, MULTIPLE, TABLE } = RESPONSE_FORMAT
/**
 * Default value for a response format. We create an entry for each type of
 * format. This will allow recovering of previously filled parameters if the
 * user mistakenly switches between format types.
 */
export const emptyFormat = {
  type: SIMPLE,
  [SIMPLE]: emptyDatatypeFactory,
  [SINGLE]: {
    codeListReference: '',
    visHint: CHECKBOX
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
