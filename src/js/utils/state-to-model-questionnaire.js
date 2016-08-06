/**
 * Creates a questionnaire model from state
 *
 * In the ui, we're dealing with a flat structure to represent our
 * questionnaires. For the remote calls, we need to deal with a representation
 * of the questionnaire consistent with the model. This function takes the state
 * and returns a function which returns the questionnaire model from the
 * questionnaire id.
 *
 */

import { putLeading_ } from '../utils/data-utils'
import {
  DATATYPE_TYPE_FROM_NAME, RESPONSE_FORMAT, DIMENSION_TYPE
} from '../constants/pogues-constants'
import { emptyTextDatatype, emptyBooleanDatatype } from '../reducers/datatype-utils'
import { nbCodesFromId } from './code-list-utils'
const { SIMPLE, SINGLE, MULTIPLE, TABLE } = RESPONSE_FORMAT
const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE
const QUESTION = 'QUESTION'
const SEQUENCE = 'SEQUENCE'

export default function toModel(state, qrId) {

  /*
  Each function to convert to model needs the state. We made a closure around the
  state for the sake of conciseness (so we do not need to pass state to each
  function)
  */

  const {
    questionnaireById,
    componentById,
    codeListById,
    codeListByQuestionnaire,
    goToById,
    declarationById,
    controlById,
    codeById,
    conditionById,
    responseFormatById,
    pageBreakById
  } = state


  //Code list specification used by within the questionnaire will be detected
  //during response serialization.
  const codeListSpecificationUsed = new Set()
  //utility function to choose if a code list needs to be added to
  //`codeListSpecificationUsed`
  const updateCodeListSpecificationUsed = id =>
    codeListById[id] && codeListById[id].isSpec && codeListSpecificationUsed.add(id)

  const qr = questionnaireById[qrId]
  const { agency, survey } = qr
  let depthOfSequences = calculateDepths(componentById, qrId)
  // component groups will be feed by `fromComponent`: for each component with
  // a page break, a new component group wil be created
  const makePageBreakGroup = index => ({
    name: `PAGE_${index}`,
    label: `Components for page ${index}`,
    Member: []
  })  
  let activePage = 1
  let activeGroup = makePageBreakGroup(activePage) 
  
  
  let componentGroups = [activeGroup]
  
  
  //TODO Does a questionnaire really need to be a sequence ? It needs to hold
  //a sequence (the main sequence of the questionnaire), but do goTos,
  //controls and declarations make sense for a questionnaire ? For now, we
  //stay with composition (but in the model, the questionnaire will look like
  //a sequence).
  const cmpnt = fromComponent(qrId, true)

  // Switch from local id to remoteId if this id is set (set when the
  // questionnaire is creater on the server)
  if (qr.remoteId) cmpnt.id = qr.remoteId
  //Once a code list has been created within a questionnaire, it will be
  //serialized, even if no question uses it anymore (we cannot delete a code
  //list for now).
  //HACK to allow comparision with initial model during tests, we need
  //to sort code lists by `id`
  const codeList = codeListByQuestionnaire[qrId].sort().map(fromCodeList)
  const codeListSpecification =  Array.from(codeListSpecificationUsed).map(
    fromCodeListSpecification
  )

  return putLeading_({
    ...cmpnt,
    agency,
    survey,
    componentGroups,
    codeLists: {
      codeList,
      codeListSpecification
    }
  })

  function fromCodeList(clId) {
    //FIXME We do not handle name in the ui, so we set in the same value as
    //label
    const { id, name, label, codes } = codeListById[clId]
    return {
      id, name, label,
      codes: codes.map(fromCode)
    }
  }

  function fromCode(codeId) {
    const { label, value } = codeById[codeId]
    return {
      label, value
    }
  }

  function fromCodeListSpecification(clSpecId) {
    const { label, name, retrievalQuery } = codeListById[clSpecId]
    return { id: clSpecId, label, name, retrievalQuery }
  }

  function fromComponent(cmpntId, isRoot) {
    // id, name, label, declarations, controls, goTos
    const { id, name, label, declarations, controls, goTos, type } =
      componentById[cmpntId]
    // do not add the questionnaire component to the first page group
    // remark: check against true with no type coercion since `fromComponent`
    // can be called from `map`, so with an integer as second argument
    if (!(isRoot === true)) {
        const pageBreak = pageBreakById.hasOwnProperty(cmpntId)
        activeGroup.Member.push(cmpntId)
        if (pageBreak) {
          activeGroup = makePageBreakGroup(++activePage)
          componentGroups.push(activeGroup)
        }
    }
    const qnOrSeq = type === SEQUENCE ?
      fromSequence(cmpntId) : fromQuestion(cmpntId)
    return {
      id, name,
      label: [label],
      declarations: declarations.map(fromDeclaration),
      goTos: goTos.map(fromGoTo),
      controls: controls.map(fromControl),
      ...qnOrSeq
    }
  }


  function fromSequence(sequenceId) {
    const { genericName, childCmpnts } = componentById[sequenceId]

    return {
      genericName,
      children: childCmpnts.map(fromComponent),
      depth: depthOfSequences[sequenceId],
      type: 'SequenceType'
    }
  }

  function fromQuestion(questionId) {
    return {
      // create `responses` and `responseStructures` entries (these will be
      // transformed into `Response` and `QuestionStructure` elements in the
      // XML representation of Pogues Model)
      ...fromResponseFormat(questionId),
      label: [labelFromConditions(questionId)],
      type: 'QuestionType'
    }
  }
  
  // Conditions has to be serialized as a velocity template string that will
  // be supplied as a label (the backend will take care of parsing this
  // string). For now, since we did not have a VTL parser in javascript, we
  // will serialize the label and the conditons with JSON.stringify, and put
  // this string as a comment line at the beginning of the VTL string.
  // The VTL string has hence the shape
  // ## JSON.stringify({ label: ..., conditions : [...]})
  // #if(condition1)
  // label if condition 1 is true
  // #elseif condition 2
  // label if condition 2 is true
  // #end
  function labelFromConditions(questionId) {
    const { label, conditions: conditionIds } = componentById[questionId]
    const conditions = conditionIds.map(id => conditionById[id])
    return [
      '##' + JSON.stringify({
        label,
        conditions
      })
    ].concat(conditionsToVTLArr(label, conditions)).join('\n')
  }
  // if there is no condition, the VTL representation is only the label.
  function conditionsToVTLArr(label, conditions) {
    if (conditions.length === 0) return [label]
    const vtl = conditions.reduce((vtl, { condition, label }, i) => {
      if (i === 0) vtl.push(`#if(${condition})`)
      else vtl.push(`#elseif(${condition})`)
      vtl.push(label)
      return vtl
    }, [])
    vtl.push('#end')
    return vtl
  }
  
  function fromResponseFormat(responseFormatId) {
    const responseFormat = responseFormatById[responseFormatId]
    const { type, [type]: format, mandatory } = responseFormat
    if (type === SIMPLE) {
      const { typeName, [typeName]: datatype } = format
      return {
        responses: [{
          // `simple` and `mandatory` are not exposed in the ui for now. These
          // attributes are not required, so we do not create them here, but they
          // could be added if the backend needs them.
          mandatory,
          datatype: {
            //TODO the `VisualizationHint` attribute of a datatype will not be
            //set : it's not exposed in the ui, and it is not required by the
            //model, so we do not create these properties. Check if it is ok
            //with the backend.
            ...datatype,
            //TODO document the use of `type` property ; it seems to be a
            //convention used in Pogues to represent in JSON which derived type
            //of an abstract type (in the XML Schema) is used. This property is
            //not represented in the reducer since it can be inferred.
            type: DATATYPE_TYPE_FROM_NAME[format.typeName]
          }
        }]
      }
    }
    if (type === SINGLE) {
      const { codeListReference, visHint,
        hasSpecialCode, specialLabel, specialCode, specialUiBehaviour,
        specialFollowUpMessage
       } = format
       let special 
       if (hasSpecialCode) {
         special = {
           code: specialCode,
           label: specialLabel,
           behaviour: specialUiBehaviour,
           message: specialFollowUpMessage
         }
       }
      const response = {
        // `codeListReference` and `visHint`
        codeListReference: codeListReference || null,
        mandatory,
        datatype: {
          //no information held by the datatype except for the
          //VisualizationHint ; by default we use a `TextDatatypeType` (
          //`DatatypeType` is an abstract type in the model).
          ...emptyTextDatatype,
          type: DATATYPE_TYPE_FROM_NAME[emptyTextDatatype.typeName],
          visHint
        }
      }
      if (hasSpecialCode) response.special = special  
      return {
        responses: [response]
      }
    }
    if (type === MULTIPLE) {
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
        responses: Array(nbRows).fill(response),
        responseStructure: {
          dimensions: [{
            type: PRIMARY,
            dynamic: 0,
            codeListReference: infoCodeList || null
          }, {
            type: MEASURE,
            dynamic: 0
          }]
        }
      }
    }
    if (type === TABLE) {
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
          type: PRIMARY,
          dynamic: `${firstInfoMin}-${firstInfoMax}`
        }
        if (firstInfoTotal) primary.totalLabel = firstInfoTotalLabel
        infoDimensions = [primary]
      }
      else {
        const { firstInfoCodeList: codeListReference } = format
        const primary = {
          type: PRIMARY,
          dynamic: 0,
          codeListReference: codeListReference || null
        }
        if (firstInfoTotal) primary.totalLabel = firstInfoTotalLabel
        infoDimensions = [primary]
        nbRowsPerMeasure = nbCodesFromId(codeListById, codeListReference)
        if (format.hasTwoInfoAxes) {
          const { scndInfoCodeList: codeListReference,
            scndInfoTotal, scndInfoTotalLabel} = format
          const secondary = {
            type: SECONDARY,
            dynamic: 0,
            codeListReference: codeListReference || null
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
          responses: responses.concat(
            Array(nbRowsPerMeasure).fill(oneResponseFromMeasure(measure))),
          dimensions: dimensions.concat({
            type: MEASURE,
            dynamic: 0,
            label: measure.label
          })
        }
      }, { responses: [], dimensions: infoDimensions })

      return {
        responses,
        responseStructure: {
          dimensions
        }
      }
    }

  }

  function oneResponseFromMeasure(measure) {
    const { type, [type]: format } = measure
    if (type === SIMPLE) {
      const { typeName, [typeName]: datatype } = format
      return {
        datatype: {
          ...datatype,
          type: DATATYPE_TYPE_FROM_NAME[typeName]
        }
      }
    }
    // SINGLE
    else {
      const { codeListReference, visHint } = format
      return {
        codeListReference: codeListReference || null,
        datatype: {
          ...emptyTextDatatype,
          type: DATATYPE_TYPE_FROM_NAME[emptyTextDatatype.typeName],
          visHint
        }
      }
    }
  }

  function fromGoTo(goToId) {
    const { id, description, expression, ifTrue } = goToById[goToId]
    return {
      id, description, expression,
      ifTrue: ifTrue || null
    }
  }

  function fromDeclaration(dclId) {
    const { type, disjoignable, text } = declarationById[dclId]
    //TODO sometimes there is no type in the json file -> investigate
    if (type !== undefined) return {
      type, text
     // disjoignable: disjoignable,
    }
    else return {
      text
    }
  }

  function fromControl(ctrlId) {
    const { id, description, expression, failMessage, criticity } =
      controlById[ctrlId]
    return {
      id, description, expression, failMessage, criticity
    }
  }
}



/**
 * Calculates the depth of each sequence descendant of a main sequence
 *
 * We do not keep track of the depth within the reducers (we could, but it
 * seemed difficult to manage it properly and we do not need it for the ui).
 *
 * @param  {[type]} cmpnts [description]
 * @param  {[type]} main   [description]
 * @return {[type]}        [description]
 */
function calculateDepths(cmpnts, mainId, depth=0, cmpntsDepth={}) {
  if (cmpnts[mainId].type !== SEQUENCE)
      throw new Error('Can only calculate the depth from a main sequence')
  cmpntsDepth[mainId] = depth
  cmpnts[mainId].childCmpnts.forEach(childId => {
    const child = cmpnts[childId]
    if (child.type !== SEQUENCE) return;
    calculateDepths(cmpnts, childId, depth + 1, cmpntsDepth)
  })
  return cmpntsDepth
}

