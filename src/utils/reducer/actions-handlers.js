import { createOrRemoveSubEntity } from 'utils/component/component-utils';

/**
 * This utility method will manage the execution of the right reducer based 
 * on the triggered action.
 * 
 * @param {object} actionHandlers redux actions/reducers
 */
export function createActionHandlers(actionHandlers) {
  return function(state = {}, action) {
    if (!action) return state;
    const { type, payload } = action;
    const hndlr = actionHandlers[type];
    return hndlr ? hndlr(state, payload, action) : state;
  };
}

export function makeSubsHandlers(subs) {
  return subs.reduce((hndlrs, [actionType, entityArrName, op]) => {
    const fn = createOrRemoveSubEntity(entityArrName, op);
    hndlrs[actionType] = (cmpntsById, { cmpntId: id, id: entityId }) => ({
      ...cmpntsById,
      [id]: fn(cmpntsById[id], entityId),
    });
    return hndlrs;
  }, {});
}
