import { nbCodesFromId } from '../../code-list-utils'
import {
  DIMENSION_TYPE, DATATYPE_TYPE_FROM_NAME
} from '../../../constants/pogues-constants'
import { QUESTION_TYPE_ENUM } from '../../../constants/schema'
import {  
  emptyTextDatatype, emptyBooleanDatatype 
} from '../../../reducers/datatype-utils' 
const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE
const { MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM

export default function multipleResponseFormat(format, mandatory, codeListById) {
  const { infoCodeList } = format
  const nbRows = nbCodesFromId(codeListById, infoCodeList)
  const { measureVisHint: visHint, measureBoolean } = format
  let response
  // the measure is a boolean
  if (measureBoolean) response = {
    datatype: {
      ...emptyBooleanDatatype,
      type: DATATYPE_TYPE_FROM_NAME[emptyBooleanDatatype.typeName]
    }
  }
  // the measure is a code list
  else {
    response = {
      // by default use a text datatype, but it holds no information
      datatype: {
        ...emptyTextDatatype,
        type: DATATYPE_TYPE_FROM_NAME[emptyTextDatatype.typeName],
        visHint
      },
      codeListReference: format.measureCodeList || null,
    }
  }
  return {
    questionType: MULTIPLE_CHOICE,
    responses: Array(nbRows).fill(response),
    responseStructure: {
      dimensions: [{
        dimensionType: PRIMARY,
        dynamic: 0,
        codeListReference: infoCodeList || null
      }, {
        dimensionType: MEASURE,
        dynamic: 0
      }]
    }
  }
}