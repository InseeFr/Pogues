
/**
 * Assumption : response structure are sorted. They need to be because the
 * mapping between reponses and measures is implicit. But we rely also on this
 * asumption to retrieve PRIMARY and SECONDARY measures (ie. if there is a
 * SECONDARY information axis, it should be the second dimension in the response
 * structure, and PRIMARY the first).
 */
//TODO see to only import relevant modules from lodash
import _ from 'lodash'
import { emptyFormat } from '../utils/format-utils'

import {
  RESPONSE_FORMAT, DIMENSION_TYPE, DATATYPE_NAME, DATATYPE_VIS_HINT
} from '../constants/pogues-constants'
import { emptyDatatypeFactory } from '../reducers/datatype-utils'

const { SIMPLE, SINGLE, MULTIPLE, TABLE } = RESPONSE_FORMAT
const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE
const { BOOLEAN } = DATATYPE_NAME
const { CHECKBOX } = DATATYPE_VIS_HINT

export function parseResponseFormat(question) {
  // some old questionnaires do not have any response, but it is not possible
  // after we add support for complex response formats.
  if (!question.responses || question.responses.length === 0) {
    return emptyFormat
  }
  // if there is no `ResponseStructure`, it is a SIMPLE or SINGLE response
  // format
  if (!question.hasOwnProperty('responseStructure')) {
    return parseSimpleOrSingle(question.responses)
  }
  // we are dealing with a MULTIPLE or a TABLE response format
  return parseMultipleOrTable(question)
}

function parseSimpleOrSingle(responses) {
  // There should be only one response
  //TODO throw error if more than one response
  const response = responses[0]
  // If `codeListReference` exists (it can be set to an empty string, it does
  // not matter), we are dealing with a SINGLE response format.
  if (response.hasOwnProperty('codeListReference'))
    return parseSingle(response)
  // we are dealing with a SIMPLE reponse format
  return parseSimple(response)
}

function parseSingle(response) {
  const { codeListReference, datatype: { visHint } } = response
  return {
    ...emptyFormat,
    type: SINGLE,
    [SINGLE]: {
      codeListReference,
      visHint
    }
  }
}

function parseSimple(response) {
  const { datatype } = response
  const { typeName } = datatype
  const format = {
    ...emptyFormat,
    type: SIMPLE
  }
  format[SIMPLE].typeName = typeName
  Object.assign(format[SIMPLE][typeName], datatype)
  return format
}

function parseMultipleOrTable({ responses, responseStructure }) {
  const { dimensions } = responseStructure
  // If the information "fits" in a MULTIPLE format, we will consider it to be
  // a MULTIPLE format. To be a MULTIPLE format :
  // - two dimensions ;
  // - first dimension is PRIMARY with a `codeListReference` element (if no
  // `codeListReference`, it is a TABLE with information axis as a list) ;
  // - second dimension is a MEASURE with no `Label` element ;
  // - the response should be SINGLE or SIMPLE of type boolean.
  // In practice, we will rely on the "second dimension is a MEASURE with no
  // `Label` element". It should suffice to distinguish MULTIPLE from TABLE.
  // Other criteria could be valued to check if everything is as expected and
  // throw an error if not.
  if (dimensions.length === 2) {
    const [ primaryDimension, measureDimension ] = dimensions
    if (measureDimension.type === MEASURE &&
        !measureDimension.hasOwnProperty('label')) {
        const response = responses[0]
        // ohter checks could be:
        // primaryDimension.hasOwnProperty('codeListRefernce')
        if (response.hasOwnProperty('codeListReference')) {
          //TODO make utility functions or simple objects to make creation of
          //formats more constistent across the application
          return {
            ...emptyFormat,
            type: MULTIPLE,
            [MULTIPLE]: {
              infoCodeList: primaryDimension.codeListReference,
              measureBoolean: false,
              measureCodeList: response.codeListReference,
              measureVisHint: response.datatype.visHint
            }
          }
        }
        if (response.datatype.typeName === BOOLEAN) {
          return {
            ...emptyFormat,
            type: MULTIPLE,
            [MULTIPLE]: {
              infoCodeList: primaryDimension.codeListReference,
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
  //We are dealing with a table format
  return parseTable({ responses, responseStructure })
}


function parseTable({ responses, responseStructure }) {
  const { dimensions } = responseStructure
  const measureDimensions = dimensions
    // ignore PRIMARY or SECONDARY dimensions
    .filter(({ type }) => type === MEASURE)
    // label is supposed to be set
    .map(({ label, type }) => ({ label, type }))

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
  const [ primary, secondary ] = dimensions.filter(({ type }) =>
    type === PRIMARY || type === SECONDARY )

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
      firstInfoCodeList: primary.codeListReference
    })
    // two information axes
    if (secondary) {
      if (secondary.hasOwnProperty('totalLabel')) {
        formatTable.scndInfoTotal = true
        formatTable.scndInfoTotalLabel = secondary.totalLabel
      }
      _.assign(formatTable, {
        hasTwoInfoAxes: true,
        scndInfoCodeList: secondary.codeListReference
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
    [SINGLE]: {
      codeListReference: '',
      visHint: CHECKBOX
    }
  }
  if (response.hasOwnProperty('codeListReference')) {
    measure.type = SINGLE
    measure[SINGLE] = {
      codeListReference: response.codeListReference,
      visHint: response.datatype.visHint
    }
  }
  else {
    measure.type = SIMPLE
    const { [SIMPLE]: simpleFormat } = measure
    const { datatype } = response
    const { typeName } = datatype
    simpleFormat.typeName = typeName
    simpleFormat[typeName] = datatype
  }
  return measure
}