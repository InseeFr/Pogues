import { COMPONENT_TYPE } from '../constants/pogues-constants';

const { QUESTION, SEQUENCE } = COMPONENT_TYPE;

export const uuid = () => (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

// TODO flattened questionnaire structure might be part of the main reducer,
// because this information is used in multiple places ; we might choose to keep
// this representation instead of the regular parent/child relationships

/**
 * Build a flat representation of the questionnaire
 *
 * It returns multiple objects, including an array representing the
 * questionnaire in chronological order, where each component is assigned a
 * depth.
 *
 * @param  {object} register dictionary with all the components
 * @param  {string@} main    the id of the main sequence (the questionnaire id)
 * @return {object}          information to proccess the questionnaire structure
 *                           as an array
 */
export function flatten(register, main) {
  const rank = -1;
  const idToRank = {};
  const nameToId = {};
  const idToName = {};
  const flat = [];

  // Check if arguments have changed since last call. The common use cases of
  // `flatten` can make it call multiple times with the same arguments. We only
  // do memoization of the last arguments because there's no reason to find
  // these arguements in the call history of flatten if there are not the last
  // arguments used.
  const { lastRegister, lastMain, lastValue } = flatten.lastResult;
  if (lastRegister === register && lastMain === main) return lastValue;

  function flatten_(innerMain, depth) {
    const cmpnt = register[innerMain];
    const { type, name } = cmpnt;
    idToRank[innerMain] = rank + 1;
    idToName[innerMain] = name;
    // HACK `nameToId` should not have an entry for the main sequence
    // of the questionnaire (a questionnaire is a sequence, but for the end
    // user, it should not be offered as an option for operations like control
    // or goTo edition).
    if (rank > 0) nameToId[name] = innerMain;
    const k = { id: innerMain, type, name, depth, start: rank, cmpnt };
    flat.push(k);
    if (type === SEQUENCE) {
      depth += 1;
      cmpnt.childCmpnts.forEach(id => flatten_(id, depth));
    }
    k.end = rank;
  }

  flatten_(main, 0);

  const result = {
    flat,
    idToRank,
    nameToId,
    idToName,
  };
  flatten.lastResult = {
    lastValue: result,
    lastRegister: register,
    lastMain: main,
  };
  return result;
}
// memoization
flatten.lastResult = {
  lastRegister: null,
  lastMain: null,
  lastValue: null,
};
// TODO We keep only used components ; see if it's necessary to start with a
// copy of register to keep also components outside the questionnaire
export function unflatten(flat) {
  const register = {};

  // Initialisation
  let childCmpnts = [];
  const { cmpnt: main } = flat.shift(); // main sequence
  register[main.id] = {
    ...main,
    childCmpnts,
  };
  const path = [childCmpnts]; // depth = 0

  return flat.reduce((innerRegister, { id, type, depth, cmpnt }) => {
    if (type === QUESTION) {
      childCmpnts.push(id);
      innerRegister[id] = cmpnt;
    } else {
      childCmpnts = [];
      innerRegister[id] = { ...cmpnt, childCmpnts };
      // path.length represents current depth
      if (depth >= path.length) {
        // In most cases, path.length === depth (same depth as the last opened
        // sequence) or path.length + 1 === depth (we are openig a new sequence
        // within the current sequence). But sometimes there might be some
        // inconsistencies in depth (depth > path.length + 1) due to the
        // removal of a sequence (especially when you remove the first sequence
        // of the questionnaire).
        path[path.length - 1].push(id);
        path[path.length] = childCmpnts;
      } else if (depth < path.length) {
        // We close a current sequence and open a new one at the right depth
        path[depth - 1].push(id);
        path[depth] = childCmpnts;
        // We remove the tail of the path
        path.splice(depth + 1);
      }
    }
    return innerRegister;
  }, register);
}
