import { COMPONENT_TYPE, COMPONENT_UTIL } from 'constants/pogues-constants';
import { nameFromLabel } from 'utils/name-utils';

const { QUESTION, SEQUENCE } = COMPONENT_TYPE;
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
