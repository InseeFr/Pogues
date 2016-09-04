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

const QUESTION = 'QUESTION'
const SEQUENCE = 'SEQUENCE'
import { uuid } from '../utils/data-utils'
import { serializeResponseFormat } from './response-format/serialize'

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
    Member: [],
    id: uuid()
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
    const { childCmpnts } = componentById[sequenceId]
    const depth = depthOfSequences[sequenceId]
    const genericName = 
      depth === 0 ? 'QUESTIONNAIRE' :
      depth === 1 ? 'MODULE' :
      'SUBMODULE'
      
    return {
      genericName,
      children: childCmpnts.map(fromComponent),
      depth,
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
    return serializeResponseFormat(responseFormat, codeListById)
  }

  function fromGoTo(goToId) {
    const { id, description, expression, ifTrue } = goToById[goToId]
    return {
      id, description, expression,
      ifTrue: ifTrue || null
    }
  }

  function fromDeclaration(dclId) {
    const declaration = declarationById[dclId]
    const {
      type, isQuestion, text
    } = declaration
    const _declaration = { 
      declarationType: type,
      text
    }
    if (isQuestion) {
      _declaration.position = declaration.position
    }
    return _declaration
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

