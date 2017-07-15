import { COMPONENT_TYPE, COMPONENT_UTIL } from 'constants/pogues-constants';
import { nameFromLabel } from 'utils/name-utils';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;
const { CREATE, REMOVE } = COMPONENT_UTIL;

const emptyCmpnt = {
  name: '',
  label: '',
  declarations: [],
  goTos: [],
  controls: [],
};

const emptySequence = {
  depth: 0,
  childCmpnts: [],
  type: COMPONENT_TYPE.SEQUENCE,
};

const emptyQuestion = {
  type: QUESTION,
  conditions: [], // conditions for the label
  // responses will be initialized when we create a question
};

// For some actions, state as first argument is useless, but we keep it in the
// function signature to be able to normalize function calls from a reducer (
// fn(state, payload))
//
// see payload of CREATE_QUESTIONNAIRE
export function createQuestionnaire({ id, name, label }) {
  return {
    ...emptyCmpnt,
    ...emptySequence,
    id,
    name,
    label,
    type: SEQUENCE,
  };
}

export function createComponent({ id, label, type }) {
  const questionOrSequence = type === SEQUENCE ? emptySequence : { ...emptyQuestion, responses: [id] };
  return {
    ...emptyCmpnt,
    ...questionOrSequence,
    id,
    label,
    type,
    name: nameFromLabel(label),
  };
}

// Easier to deal with an UPDATE action and not an UPDATE_NAME and an
// UPDATE_LABEL action.
export function editComponent(cmpnt, { update }) {
  return {
    ...cmpnt,
    ...update,
  };
}

export function createOrRemoveSubEntity(arrName, op) {
  return function(cmpnt, id) {
    const ids = cmpnt[arrName];
    let index;
    if (op === REMOVE) index = ids.indexOf(id);
    return {
      ...cmpnt,
      [arrName]: op === CREATE ? [...ids, id] : [...ids.slice(0, index), ...ids.slice(index + 1)],
    };
  };
}

/**
 * This method return true if the component passed as a parameter is a QUESTION
 * 
 * @param {object} component The component we should test
 */
export function isQuestion(component) {
  return component && component.type === QUESTION;
}

/**
 * This method return true if the component passed as a parameter is a SUBSEQUENCE
 * 
 * @param {object} component The component we should test
 */
export function isSubSequence(component) {
  return component && component.type === SUBSEQUENCE;
}

/**
 * This method return true if the component passed as a parameter is a SEQUENCE
 * 
 * @param {object} component The component we should test
 */
export function isSequence(component) {
  return component && component.type === SEQUENCE;
}

/**
 * This method will return an array of component based of the ids passed as parameter
 * 
 * @param {string[]} ids The list of IDs
 * @param {object} activesComponents The object representing the activated components
 */
export function toComponents(ids, activesComponents) {
  return ids.map(id => activesComponents[id]);
}

/**
 * This method will return an array of component's id
 * 
 * @param {object[]} components The list of components
 */
export function toId(components) {
  return components.map(c => c.id);
}
