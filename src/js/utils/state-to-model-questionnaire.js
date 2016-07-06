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
import { DATATYPE_TYPE_FROM_NAME } from '../constants/pogues-constants'
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
    responseById
  } = state


  //Code list specification used by within the questionnaire will be detected
  //during response serialization.
  const codeListSpecificationUsed = new Set()
  //utility function to choose if a code list needs to be added to
  //`codeListSpecificationUsed`
  const updateCodeListSpecificationUsed = id =>
    codeListById[id] && codeListById[id].isSpec && codeListSpecificationUsed.add(id)

  const qr = questionnaireById[qrId]
  const { agency, survey, componentGroups } = qr
  let depthOfSequences = calculateDepths(componentById, qrId)

  //TODO Does a questionnaire really need to be a sequence ? It needs to hold
  //a sequence (the main sequence of the questionnaire), but do goTos,
  //controls and declarations make sense for a questionnaire ? For now, we
  //stay with composition (but in the model, the questionnaire will look like
  //a sequence).
  const cmpnt = fromComponent(qrId)

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
    componentGroups: componentGroups.map(fromComponentGroup),
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

  function fromComponentGroup(cpntGroupId) {
    return {
      dscr: 'not implemented yet'
    }
  }

  function fromComponent(cmpntId) {
    // id, name, label, declarations, controls, goTos
    const { id, name, label, declarations, controls, goTos, type } =
      componentById[cmpntId]
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
    const { simple, responses } = componentById[questionId]
    return {
      simple,
      //TODO implement responses to model (need a response reducer first)
      responses: responses.map(fromResponse),
      type: 'QuestionType'
    }
  }

  function fromResponse(responseId) {
    const { simple, mandatory, codeListReference, datatype } =
              responseById[responseId]

    updateCodeListSpecificationUsed(codeListReference)
    return {
      simple, mandatory, codeListReference,
      datatype: {
        ...datatype,
        type: DATATYPE_TYPE_FROM_NAME[datatype.typeName],
      },
      values: []
    }

  }

  function fromGoTo(goToId) {
    const { id, description, expression, ifTrue } = goToById[goToId]
    return {
      id, description, expression, ifTrue
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

