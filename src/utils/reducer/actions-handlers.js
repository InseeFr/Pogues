import { createOrRemoveSubEntity } from 'utils/component/component-utils';

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
