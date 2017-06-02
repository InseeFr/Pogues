// @TODO: Documentation
import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME, QUESTION_TYPE_NAME } from 'constants/pogues-constants';
import parseResponseFormat from './response-format/parse-response-format';

const { QUESTION, SEQUENCE } = COMPONENT_TYPE;

export function getQuestionnaireIdFromUri(uri) {
  return uri.substr(uri.lastIndexOf('/') + 1);
}

export function removeUnderscore(wholeModel) {
  function remove(model, result) {
    let newKey;
    if (!model) return result;
    Object.keys(model).forEach(key => {
      newKey = key.replace(/(_)(.+)/, '$2');
      if (Array.isArray(model[key])) {
        result[newKey] = model[key].map(item => {
          if (typeof item === 'string') return item;
          return remove(item, {});
        });
      } else if (typeof model[key] === 'object') {
        result[newKey] = remove(model[key], {});
      } else {
        result[newKey] = model[key];
      }
    });
    return result;
  }
  return remove(wholeModel, {});
}

/**
 * Get response formats from raw questions
 *
 * It obtains the list of response formats from a list of questions
 *
 * @param  {array}   rawQuestions   List of raw questions
 * @return {object} List of response formats
 */
export function getResponseFormatsFromRawQuestions(rawQuestions) {
  return Object.keys(rawQuestions).reduce((acc, key) => {
    acc[key] = parseResponseFormat(rawQuestions[key]);
    return acc;
  }, {});
}

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

/**
 * Create component
 *
 * Create a new object component using the parameters passed
 *
 * @param  {object}             component             raw component
 * @param  {string}             component.id          component id
 * @param  {SEQUENCE_TYPE_NAME|
 *          SEQUENCE|
 *          QUESTION}           component.type        component type
 * @param  {string}             component.name        component name
 * @param  {string}             component.label       component label
 * @param  {array|undefined}    component.children    component children
 * @param  {string}             parent      component parent
 * @return {object} component
 */
export function createComponent({ id, type, name, label, children }, parent) {
  const component = {
    id,
    parent,
    type,
    name,
  };

  // @TODO: It will be necessary refactor
  if (type === SEQUENCE_TYPE_NAME || type === SEQUENCE) {
    component.type = SEQUENCE;
    component.label = label;
    component.children = children;
  } else {
    component.type = QUESTION;
    component.rawLabel = label;
    component.label = getQuestionLabelFromRaw(label);
    component.conditions = getConditionsFromRawQuestionLabel(label).map(c => c.id);
  }

  return component;
}

/**
 * Normalize component
 *
 * Transform the raw data from a component to normalized component representation
 *
 * @param  {object}             component             raw component
 * @param  {string}             component.id          component id
 * @param  {string}             component.parent      component parent
 * @param  {SEQUENCE|QUESTION}  component.type        component type
 * @param  {string}             component.name        component name
 * @param  {string}             component.label.0     component label
 * @param  {array|undefined}    component.children    component children
 * @return {object} normalized component
 */
export function normalizeComponent({ id, parent, type, name, label: [label], children }) {
  return createComponent({ id, type, name, label, children }, parent);
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
 * @param  {object}   component   raw component
 * @param  {string}   parentId         questionnaire id
 * @return {object} raw component with a parent attribute and maybe a children attribute
 */
export function getRawComponentWithHierarchy(component, parentId = '') {
  const rawComponent = {
    ...component,
    parent: parentId,
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
    components.forEach(component => {
      const rawComponent = getRawComponentWithHierarchy(component, parent);
      carry[component.id] = rawComponent;
      if (component.children) getRawComponents(component.children, component.id, carry);
      return carry;
    });

    return carry;
  }
  return getRawComponents(questionnaireChildren, questionnaireId, {});
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
  const { id, label: [label], children } = questionnaire;
  const rawComponents = getRawComponentsFromNested(children, id);
  const rawQuestions = {};
  const normalizedQuestions = {};

  Object.keys(rawComponents)
    .filter(key => {
      return rawComponents[key].type === QUESTION_TYPE_NAME;
    })
    .forEach(key => {
      rawQuestions[key] = rawComponents[key];
    });

  // COMPONENT_BY_ID
  const componentById = normalizeListComponents(rawComponents);
  componentById[id] = normalizeComponent(getRawComponentWithHierarchy(questionnaire));

  Object.keys(componentById)
    .filter(key => {
      return componentById[key].type === QUESTION;
    })
    .forEach(key => {
      normalizedQuestions[key] = componentById[key];
    });

  // CONDITION_BY_ID
  const conditionById = getConditionsFromNormalizedQuestions(normalizedQuestions);
  // RESPONSE_FORMAT_BY_ID
  const responseFormatById = getResponseFormatsFromRawQuestions(rawQuestions);
  return {
    questionnaire: {
      id,
      label,
    },
    componentById,
    conditionById,
    responseFormatById,
  };
}

export function getNumNestedChildren(children) {
  return children.reduce((carry, value) => {
    let result = 1;
    if (value.children) {
      result = getNumNestedChildren(value.children) + result;
    }
    return result + carry;
  }, 0);
}
