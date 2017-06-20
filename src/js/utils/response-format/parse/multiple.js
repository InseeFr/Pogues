import { 
  DIMENSION_TYPE, DATATYPE_NAME, DATATYPE_VIS_HINT
} from '../../../constants/pogues-constants'

import { QUESTION_TYPE_ENUM } from '../../../constants/schema'
const { MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM
import { emptyFormat } from '../../format-utils'
const { MEASURE } = DIMENSION_TYPE
const { BOOLEAN } = DATATYPE_NAME
const { CHECKBOX } = DATATYPE_VIS_HINT

export default function parseMultiple(responses, responseStructure) {
  const { dimensions } = responseStructure
  const [ primaryDimension, measureDimension ] = dimensions
  if (measureDimension.dimensionType === MEASURE &&
      !measureDimension.hasOwnProperty('label')) {
    const response = responses[0]
      // ohter checks could be:
      // primaryDimension.hasOwnProperty('codeListRefernce')
    if (response.hasOwnProperty('codeListReference')) {
        //TODO make utility functions or simple objects to make creation of
        //formats more constistent across the application
      return {
        ...emptyFormat,
        type: MULTIPLE_CHOICE,
        [MULTIPLE_CHOICE]: {
          infoCodeList: primaryDimension.codeListReference || '',
          measureBoolean: false,
          measureCodeList: response.codeListReference || '',
          measureVisHint: response.datatype.visHint
        }
      }
    }
    if (response.datatype.typeName === BOOLEAN) {
      return {
        ...emptyFormat,
        type: MULTIPLE_CHOICE,
        [MULTIPLE_CHOICE]: {
          infoCodeList: primaryDimension.codeListReference || '',
          measureBoolean: true,
          measureCodeList: '',
          measureVisHint: CHECKBOX
        }
      }
      //TODO throw an error ? The second dimension is a measure with no label,
      //it cannot be a TABLE format
    }
  }  
}