import { uuid } from '../utils/data-utils'
import { removeLeading_ } from '../utils/data-utils'
import { parseResponseFormat } from '../utils/parse-response-format'
import { COMPONENT_TYPE } from '../constants/pogues-constants'

const { QUESTION, SEQUENCE } = COMPONENT_TYPE

/**
 * Creates an update to apply to the reducer when receiving a questionnaire
 *
 * model is a representation of a questionnaire
 *
 * @param  {object} qr questionnaire description (from remote API)
 * @return {object}    update to merge into the reducer to import
 *                              this questionnaire
 */
export default function toState(_model) {
  // We use a closure around ...ById to avoid repetition

  const model = removeLeading_(_model)
  const componentById = {}
  const controlById = {}
  const goToById = {}
  const declarationById = {}
  const codeListById = {}
  const codeListByQuestionnaire = {}
  const codeById = {}
  const conditionById = {}
  const responseFormatById = {}

  const { agency, survey, componentGroups, codeLists } =  model
  let pageBreakById = {}
  
  if (componentGroups.length > 1) {
    pageBreakById = componentGroups.slice(0, -1).reduce((pbById, group) => {
      if (group.Member.length > 0) pbById[group.Member[group.Member.length-1]] = true
      return pbById
    }, {})
  }

  const id = toComponent(model) // id === model.id
  const qrId  = id
  codeListByQuestionnaire[qrId] = []

  const questionnaire = {
    id, agency, survey,
    codeLists: {
      codeListSpecification: codeLists.codeListSpecification,
      codeList: codeLists.codeList.map(toCodeList)
    }
  }
  
  return {
    questionnaire,
    componentById,
    goToById,
    declarationById,
    controlById,
    codeListById,
    conditionById,
    codeListByQuestionnaire,
    codeById,
    responseFormatById,
    pageBreakById
  }

  function toComponent(cmpnt) {
    const { id, name, label, declarations, goTos, controls, type } = cmpnt

    // mutations are ok here
    componentById[id] = {
      id, name,
      label: label[0],
      declarations: declarations.map(toDeclaration),
      goTos: goTos.map(toGoTo),
      controls: controls.map(toControl),
    }
    //enhance componentById[_id] to make it a question or a sequence}
    if (type === 'SequenceType') toSequence(cmpnt)
    else toQuestion(cmpnt)
    return id
  }

  function toSequence(sequence) {
    const { id, genericName, depth, children } = sequence
    componentById[id] = {
      ...componentById[id],// already a component
      genericName,
      depth, //TODO do we keep track of depth ?
      type: SEQUENCE,
      childCmpnts: children.map(toComponent)
    }
    return id
  }

  function toQuestion(question) {
    //TODO solve unconsistencies between QuestionType/SequenceType in the model
    //and QUESTION and SEQUENCE constants elsewhere in Pogues
    let { id, label: [rawLabel] } = question
    const { conditionIds, label } = conditionsFromLabel(rawLabel)
    toResponseFormat(id, question)
    componentById[id] = {
      ...componentById[id],// already a component
      label,
      conditions: conditionIds,
      type: QUESTION
    }
    return id
  }

// see state to model transformation to know how to deserialize the label string
// provided to build the current label and the conditions defined within the
// question.
function conditionsFromLabel(rawLabel) {
  //extract first comment line
  const regExpCmt = /##([^\n]*)/
  const hasComment = rawLabel.match(regExpCmt)
  if (!hasComment) return {
    label: rawLabel,
    conditionIds: []
  }
  const { label, conditions } = JSON.parse(hasComment[1])
  const conditionIds = conditions.map(condition => {
    const { id } = condition
    conditionById[id] = condition
    return id
  })
  return {
    label,
    conditionIds
  }
}
  
function toResponseFormat(id, question) {
  responseFormatById[id] = parseResponseFormat(question)
  return id
}


  function toGoTo(goTo) {
    const { id, description, expression, ifTrue } = goTo
    goToById[id] = {
      id, description, expression,
      ifTrue: ifTrue || '',
    }
    return id
  }

  function toControl(ctrl) {
    const { id, description, expression, failMessage, criticity } =
      ctrl
    controlById[id] = {
      id, description, expression, failMessage, criticity
    }
    return id
  }

  function toDeclaration(dcl) {
    const { type, text, position } = dcl
    const id = uuid()
    declarationById[id] = {
      id, type, text, position
    }
    return id
  }
  
  function toCondition(cnd) {
    const { label, condition } = cnd
    const id = uuid()
    conditionById[id] = {
      id, label, condition
    }
    return id
  }

  //TODO check if code list ids are unique (not the same id in different
  //questionnaire)
  function toCodeList(cl) {
    const { id, name, label, codes } = cl
    const clState = {
      id, name, label,
      codes: codes.map(toCode)
    }
    //HACK for now, it's not possible to distinguish between code list created
    //by the user from code list that come from code list specification when
    //we load the questionnaire.
    if (name.startsWith('cl_')) {
      clState.spec = true
      clState.loaded = true
    }
    codeListById[id] = clState
    codeListByQuestionnaire[qrId].push(id)
    return id
  }

  function toCode(code) {
    const { label, value } = code
    const id = uuid()
    codeById[id] = {
      id, label, value
    }
    return id
  }
}
