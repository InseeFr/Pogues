
import {
  DIMENSION_TYPE,  DATATYPE_VIS_HINT
} from '../../../constants/pogues-constants'
import { QUESTION_TYPE_ENUM } from '../../../constants/schema'
import _ from 'lodash'
const { SIMPLE, SINGLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM
import { emptyFormat } from '../../format-utils'
import { emptyDatatypeFactory } from '../../../reducers/datatype-utils'

const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE
const { CHECKBOX } = DATATYPE_VIS_HINT

export default function parseTable(responses, responseStructure) {
  const { dimensions } = responseStructure
  const measureDimensions = dimensions
    // ignore PRIMARY or SECONDARY dimensions
    .filter(({ dimensionType }) => dimensionType === MEASURE)
    // label is supposed to be set
    .map(({ label, dimensionType }) => ({ label, dimensionType }))

  //We need one question for each measure to extract information about the
  //response format for this measure. It is a bit tricky to know the position
  //of the first response for each measure. Responses are created in this
  //order : all the responses for the first measure (the number depends on
  //the characteristics of the informations axes), then all the responses for
  //the second measure, and so on.
  const nbMeasures = measureDimensions.length
  // We calculate the number of rows based on the number of responses. It is
  // more convenient than retrieving the number of responses per measure
  // based on the information axes since there are multiple edge cases
  // (examples : if we use a code list spec for an information axis, the number
  // of responses is 1; if we use "axis as a list" with no max for the number of
  // rows, these number will be consider to be 1...)
  const nbResponsesPerMeasure = responses.length / nbMeasures

  const measureFormats = responses
    // extract first question for each measure
    .filter((x, i) => !(i % nbResponsesPerMeasure))
    // extract response format from response
    .map(response => measureFromResponse(response))

  const measures = _.merge(measureDimensions, measureFormats)

  // at most two axes
  const [ primary, secondary ] = dimensions.filter(({ dimensionType }) =>
    dimensionType === PRIMARY || dimensionType === SECONDARY )

  let formatTable = {
    firstInfoCodeList: '',
    firstInfoAsAList: false,
    firstInfoMin: '',
    firstInfoMax: '',
    hasTwoInfoAxes: false,
    scndInfoCodeList: '',
    firstInfoTotal: false,
    firstInfoTotalLabel: '',
    scndInfoTotal: false,
    scndInfoTotalLabel: ''
  }
  
  if (primary.hasOwnProperty('totalLabel')) {
    formatTable.firstInfoTotal = true
    formatTable.firstInfoTotalLabel = primary.totalLabel
  }
  if (primary.hasOwnProperty('codeListReference')) {
    _.assign(formatTable, {
      firstInfoCodeList: primary.codeListReference || ''
    })
    // two information axes
    if (secondary) {
      if (secondary.hasOwnProperty('totalLabel')) {
        formatTable.scndInfoTotal = true
        formatTable.scndInfoTotalLabel = secondary.totalLabel
      }
      _.assign(formatTable, {
        hasTwoInfoAxes: true,
        scndInfoCodeList: secondary.codeListReference || ''
      })
    }
  }
  // first information axis as a list (it implies there is no second axis)
  else {
    const [ firstInfoMin, firstInfoMax ] = primary.dynamic.split('-')
    _.assign(formatTable, {
      firstInfoAsAList: true,
      firstInfoMin,
      firstInfoMax
    })
  }
  return {
    ...emptyFormat,
    type: TABLE,
    [TABLE]: {
      ...formatTable,
      measures
    }
  }
}

function measureFromResponse(response) {
  const measure = {
    [SIMPLE]: emptyDatatypeFactory,
    [SINGLE_CHOICE]: {
      codeListReference: '',
      visHint: CHECKBOX
    }
  }
  if (response.hasOwnProperty('codeListReference')) {
    measure.type = SINGLE_CHOICE
    measure[SINGLE_CHOICE] = {
      codeListReference: response.codeListReference || '',
      visHint: response.datatype.visHint
    }
  }
  else {
    measure.type = SIMPLE
    const { datatype } = response
    const { typeName } = datatype
    const emptySimple = emptyFormat[SIMPLE]
    const emptyDatatype = emptySimple[typeName]
    measure[SIMPLE] = {
      ...emptySimple,
      typeName,
      [typeName]: {
        ...emptyDatatype,
        ...datatype
      }
    }
  }
  return measure
}