import {
  DIMENSION_TYPE, DATATYPE_TYPE_FROM_NAME
} from '../../../constants/pogues-constants'
import { QUESTION_TYPE_ENUM } from '../../../constants/schema'
import { nbCodesFromId } from '../../code-list-utils'
import {  
  emptyTextDatatype, emptyBooleanDatatype, processDatatypeForSerialization 
} from '../../../reducers/datatype-utils' 
const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE
const { SIMPLE, TABLE } = QUESTION_TYPE_ENUM

export default function tableResponseFormat(
    format, mandatory, codeListById, updateSpec) {
  const { firstInfoAsAList, firstInfoTotal, firstInfoTotalLabel,
    measures } = format
  let nbRowsPerMeasure, infoDimensions
  //TODO check this asumption: if `firstInfoAsAList` is set to true, there
  //cannot be any second information axis
  if (firstInfoAsAList) {
    const { firstInfoMin, firstInfoMax } = format
    // The maximum number of lines is used to generate the right number of
    // responses. If this information has not been filled in, or if it is
    // zero, we will still generate one resopnse per measure to be able to
    // recover information about the dataype and the possible code list
    // reference assigned to this measure.
    nbRowsPerMeasure = Number(firstInfoMax) || 1
    const primary = {
      dimensionType: PRIMARY,
      dynamic: `${firstInfoMin}-${firstInfoMax}`
    }
    if (firstInfoTotal) primary.totalLabel = firstInfoTotalLabel
    infoDimensions = [primary]
  }
  else {
    const { firstInfoCodeList: codeListReference } = format
    const primary = {
      dimensionType: PRIMARY,
      dynamic: 0,
      codeListReference: updateSpec(codeListReference)
    }
    if (firstInfoTotal) primary.totalLabel = firstInfoTotalLabel
    infoDimensions = [primary]
    nbRowsPerMeasure = nbCodesFromId(codeListById, codeListReference)
    if (format.hasTwoInfoAxes) {
      const { scndInfoCodeList: codeListReference,
        scndInfoTotal, scndInfoTotalLabel} = format
      const secondary = {
        dimensionType: SECONDARY,
        dynamic: 0,
        codeListReference: updateSpec(codeListReference)
      }
      if (scndInfoTotal) secondary.totalLabel = scndInfoTotalLabel
      infoDimensions.push(secondary)
      nbRowsPerMeasure =
        nbRowsPerMeasure * nbCodesFromId(codeListById, codeListReference)
    }
  }
  // if there is two information axes (and they are operational, so
  // `firstInfoAsAList` is set to `false`)
  const realMeasures = (!format.firstInfoAsAList && format.hasTwoInfoAxes) ?
    [measures[0]] : measures
    
  const { responses, dimensions } = realMeasures.reduce(
    ({ responses, dimensions }, measure) => {
    return {
      questionType: TABLE,
      responses: responses.concat(
        Array(nbRowsPerMeasure).fill(
          oneResponseFromMeasure(measure, updateSpec))),
      dimensions: dimensions.concat({
        dimensionType: MEASURE,
        dynamic: 0,
        label: measure.label
      })
    }
  }, { responses: [], dimensions: infoDimensions })

  return {
    questionType: TABLE,
    responses,
    responseStructure: {
      dimensions
    }
  }
}


function oneResponseFromMeasure(measure, updateSpec) {
  const { type, [type]: format } = measure
  if (type === SIMPLE) {
    const { typeName, [typeName]: datatype } = format
    return {
      datatype: {
        ...processDatatypeForSerialization(datatype),
        type: DATATYPE_TYPE_FROM_NAME[typeName]
      }
    }
  }
  // SINGLE
  else {
    const { codeListReference, visHint } = format
    return {
      codeListReference: updateSpec(codeListReference),
      datatype: {
        ...emptyTextDatatype,
        type: DATATYPE_TYPE_FROM_NAME[emptyTextDatatype.typeName],
        visHint
      }
    }
  }
}