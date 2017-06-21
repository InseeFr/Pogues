import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME, QUESTION_TYPE_NAME, DATATYPE_NAME } from 'constants/pogues-constants';
import { QUESTION_TYPE_ENUM } from 'constants/schema';
import { uuid } from 'utils/data-utils';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;
const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { NUMERIC, TEXT } = DATATYPE_NAME;

/**
 * Contains comment
 *
 * Verify if exist a comment parsed in a string. In case it exists, the comment is returned.
 *
 * @param  {string}   str   String
 * @return {false|string} false if the comment is not present or the comment itself
 */
export function containsComment(str) {
  const regExpCmt = /##([^\n]*)/;
  return str.match(regExpCmt);
}

/**
 * Get conditions from raw question label
 *
 * It obtains from a question label a list of conditions in case it's exist a comment serialized
 *
 * @param  {string}   rawQuestionLabel   Raw question label
 * @return {array} list of conditions
 */
export function getConditionsFromRawQuestionLabel(rawQuestionLabel) {
  const hasComment = containsComment(rawQuestionLabel);
  if (!hasComment) return [];
  const { conditions } = JSON.parse(hasComment[1]);
  return conditions;
}

/**
 * Get conditions from normalized questions
 *
 * It obtains the list of conditions from a list of normalized questions
 *
 * @param  {array}   normalizedQuestions   List of normalized questions
 * @return {object} List of conditions
 */
export function getConditionsFromNormalizedQuestions(normalizedQuestions) {
  return Object.keys(normalizedQuestions).reduce((acc, key) => {
    const conditionsById = {};
    getConditionsFromRawQuestionLabel(normalizedQuestions[key].label).forEach(c => (conditionsById[c.id] = c));
    return { ...acc, ...conditionsById };
  }, {});
}

/**
 * Get question label from raw
 *
 * It obtains a parsed question label from a raw question label. It removes the comment if exists and
 * it parse the markdown text.
 *
 * @param  {string}   rawQuestionLabel   Raw question label
 * @return {string} parsed question label
 */
export function getQuestionLabelFromRaw(rawQuestionLabel) {
  // @TODO: Markdow is not parsed yed. Include this feature.
  const hasComment = containsComment(rawQuestionLabel);
  if (!hasComment) return rawQuestionLabel;
  const { label } = JSON.parse(hasComment[1]);
  return label;
}

export function normalizeResponseFormatSimple(dataType, mandatory) {
  const dataTypeName = dataType.typeName;
  const formatResponseSimple = {
    type: SIMPLE,
    [SIMPLE]: {
      mandatory: mandatory,
      type: dataTypeName,
    },
  };

  if (dataTypeName === NUMERIC) {
    formatResponseSimple[SIMPLE][NUMERIC] = {
      minimun: '',
      maximun: '',
      decimals: '',
      precision: '',
    };
  }

  if (dataTypeName === TEXT) {
    formatResponseSimple[SIMPLE][TEXT] = {
      maxLength: '',
      pattern: '',
    };
  }

  return formatResponseSimple;
}

export function normalizeResponseFormat(type, responses) {
  let formatResponse = {};

  if (type && responses && responses.length > 0) {
    if (type === SIMPLE) {
      const [{ datatype, mandatory }] = responses;
      formatResponse = normalizeResponseFormatSimple(datatype, mandatory);
    }
  }
  return formatResponse;
}

export function normalizeQuestion({ id, type, name, label, parent, weight, responseFormat }) {
  const question = {
    id,
    type,
    parent,
    weight,
    name,
    rawLabel: label,
    label: getQuestionLabelFromRaw(label),
    conditions: getConditionsFromRawQuestionLabel(label).map(c => c.id),
    responseFormat,
  };

  return question;
}

export function normalizeSequence({ id, type, name, label, children, parent, weight }) {
  const sequence = {
    id,
    type,
    parent,
    weight,
    name,
    label,
    children: children || [],
  };

  return sequence;
}

/**
 * Normalize component
 *
 * Transform the raw data from a component to normalized component representation
 *
 * @param  {object}             component             raw component
 * @param  {string}             component.id          component id
 * @param  {string}             component.weight      component weight in the branch
 * @param  {string}             component.parent      component parent
 * @param  {SEQUENCE|QUESTION}  component.type        component type
 * @param  {string}             component.name        component name
 * @param  {string}             component.label.0     component label
 * @param  {array|undefined}    component.children    component children
 * @return {object} normalized component
 */
export function normalizeComponent({ type, parent, depth, label: [label], questionType, responses, ...data }) {
  let typeInState = QUESTION;
  // The component types received from the model are differents to the types used in the state
  if (type === SEQUENCE_TYPE_NAME) {
    if (parent === '') {
      typeInState = QUESTIONNAIRE;
    } else if (depth === 1) {
      typeInState = SEQUENCE;
    } else {
      typeInState = SUBSEQUENCE;
    }
    return normalizeSequence({ type: typeInState, parent, depth, label, ...data });
  }

  return normalizeQuestion({
    type: typeInState,
    responseFormat: normalizeResponseFormat(questionType, responses),
    parent,
    depth,
    label,
    ...data,
  });
}

/**
 * Normalize list of components
 *
 * Normalize a list of raw components
 *
 * @param  {object} components    object representing a list of raw components
 * @return {object} normalized components
 */
export function normalizeListComponents(components) {
  const normalizedComponents = {};
  Object.keys(components).forEach(key => {
    normalizedComponents[key] = normalizeComponent(components[key]);
  });
  return normalizedComponents;
}

/**
 * Get raw component with hierarchy
 *
 * It adds hierarchy to a raw component
 *
 * @param  {object}   component       raw component
 * @param  {number}   weight          the component weight in the branch
 * @param  {string}   parentId        questionnaire id
 * @return {object} raw component with a parent attribute and maybe a children attribute
 */
export function getRawComponentWithHierarchy(component, weight = 0, parentId = '') {
  const rawComponent = {
    ...component,
    parent: parentId,
    weight: weight,
  };
  if (component.children) {
    rawComponent.children = component.children.map(c => c.id);
  }
  return rawComponent;
}

/**
 * Get raw components from nested questionnaire
 *
 * Get a plain list with all the questionnaire components. We keep all the attributtes and the hierarchy is added.
 *
 * @param  {array}  questionnaireChildren   direct children of the questionnaire
 * @param  {string} questionnaireId         questionnaire id
 * @return {object} raw components
 */
export function getRawComponentsFromNested(questionnaireChildren, questionnaireId) {
  function getRawComponents(components, parent, carry) {
    let weight = 0;
    components.forEach(component => {
      const rawComponent = getRawComponentWithHierarchy(component, weight, parent);
      carry[component.id] = rawComponent;
      weight += 1;
      if (component.children) getRawComponents(component.children, component.id, carry);
      return carry;
    });

    return carry;
  }
  return getRawComponents(questionnaireChildren, questionnaireId, {});
}

/**
 * Normalize codes
 *
 * Normalize codes from pretreated codes lists
 *
 * @param  {array}  preNormalizedCodesLists   lists of codes prenormalized
 * @return {object} normalized codes
 */
function normalizeCodes(preNormalizedCodesLists) {
  return preNormalizedCodesLists.reduce((acc, cl) => {
    return {
      ...acc,
      ...cl.codes,
    };
  }, {});
}

/**
 * Prenormalize codes lists
 *
 * Prepare the list of codes to obtain codeListById, codeById and codeListByQuestionnaire
 *
 * @param  {array}  codesLists   lists of codes
 * @return {array}  prenormalized lists of codes
 */
function preNormalizeCodesLists(codesLists) {
  return codesLists.map(cl => {
    cl.codes = cl.codes.reduce((acc, code) => {
      const id = uuid();
      const { label, value } = code;
      return {
        ...acc,
        [id]: {
          id,
          label,
          value,
        },
      };
    }, {});
    return cl;
  });
}

/**
 * Normalize codes lists
 *
 * Get a plain list with all the list of codes
 *
 * @param  {array}  preNormalizedCodesLists   lists of codes prenormalized
 * @return {object} normalized lists of codes
 */
function normalizeCodesLists(preNormalizedCodesLists) {
  return preNormalizedCodesLists.reduce((acc, cl) => {
    const { id, name, label, codes } = cl;
    const clState = {
      id,
      name,
      label,
      codes: Object.keys(codes),
    };
    // HACK for now, it's not possible to distinguish between code list created
    // by the user from code list that come from code list specification when
    // we load the questionnaire.
    if (name.startsWith('cl_')) {
      clState.spec = true;
      clState.loaded = true;
    }
    return {
      ...acc,
      [id]: clState,
    };
  }, {});
}

export function normalizeDeclarations(questions) {
  return Object.keys(questions).reduce((acc, key) => {
    const declarations = questions[key].declarations.map(declaration => {
      const { declarationType, text, position } = declaration;
        return {
        id: uuid(),
        text,
        position,
        type: declarationType,
        qid: key
      }
    })

    let result = declarations.reduce((acc, dec) => {
      return {
        ...acc,
        [dec.id] : dec,
      }
    }, {});
    return result;
  }, {});
}

/**
 * Normalize questionnaire
 *
 * Normalize a nested representation of a questionnaire
 *
 * @param  {object} questionnaire   the nested questionnaire
 * @return {object} normalized data from the questionnaire
 */
export function normalizeQuestionnaire(questionnaire) {
  const { id, name, agency, survey, label: [label], children, codeLists: { codeList } } = questionnaire;
  const rawComponents = getRawComponentsFromNested(children, id);

  // COMPONENT BY ID
  const componentById = {
    ...normalizeListComponents(rawComponents),
    [id]: normalizeComponent(getRawComponentWithHierarchy(questionnaire)),
  };

  // COMPONENT BY QUESTIONNAIRE
  const componentByQuestionnaire = {
    [id]: componentById,
  };

  // Filter the list of normalized components by the type QUESTION
  const normalizedQuestions = {};

  Object.keys(componentById)
    .filter(key => {
      return componentById[key].type === QUESTION;
    })
    .forEach(key => {
      normalizedQuestions[key] = componentById[key];
    });

  // Get the pre-normalized codes lists
  const preNormalizedCodesLists = preNormalizeCodesLists(codeList);

  // CODE_LIST_BY_ID
  const codeListById = normalizeCodesLists(preNormalizedCodesLists);

  // CODE_BY_ID
  const codeById = normalizeCodes(preNormalizedCodesLists);

  // CONDITION_BY_ID
  const conditionById = getConditionsFromNormalizedQuestions(normalizedQuestions);

  // QUESTIONNAIRE_BY_ID
  const questionnaireById = {
    [id]: {
      id,
      name,
      label,
      agency,
      survey,
      components: Object.keys(componentById),
      codeLists: Object.keys(codeListById),
      conditions: Object.keys(conditionById),
    },
  };

  // Filter the raw questions from raw compopnents
  const rawQuestions = {};

  Object.keys(rawComponents)
    .filter(key => {
      return rawComponents[key].type === QUESTION_TYPE_NAME;
    })
    .forEach(key => {
      rawQuestions[key] = rawComponents[key];
    });

  // RESPONSE_FORMAT_BY_ID
  // const responseFormatById = getResponseFormatsFromRawQuestions(rawQuestions);
  const responseFormatById = {};

  const declarationById = normalizeDeclarations(rawQuestions);

  const declarationsByQuestionnaire = {
    [id]: declarationById,
  };
  
  return {
    componentById,
    componentByQuestionnaire,
    codeListById,
    codeById,
    conditionById,
    questionnaireById,
    responseFormatById,
    declarationsByQuestionnaire,
    declarationById,
  };
}

export function normalizeListQuestionnaires(questionnairesList) {
  return questionnairesList.map(questionnaire => normalizeQuestionnaire(questionnaire));
}

export function getQuestionnaireIdFromUri(uri) {
  return uri.substr(uri.lastIndexOf('/') + 1);
}
