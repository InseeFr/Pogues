import { nameFromLabel } from 'utils/name-utils';
import { uuid } from 'utils/data-utils';

export const CREATE_COMPONENT = 'CREATE_COMPONENT';
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT';

/**
 * Create component
 *
 * It creates a component in the store appState.activeComponents.
 *
 * @param   {object}  component The component data required for creation
 * @return  {object}            CREATE_COMPONENT action
 */
export const createComponent = component => ({
  type: CREATE_COMPONENT,
  payload: {
    ...component,
    id: uuid(),
    name: nameFromLabel(component.label),
  },
});

/**
 * Update component
 *
 * It updates in the store appState.activeComponents the corresponding component with the new values.
 *
 * @param   {string}  componentId The component id
 * @param   {object}  update      The properties which need to be updated
 * @return  {object}              UPDATE_COMPONENT action
 */
export const updateComponent = (componentId, update) => ({
  type: UPDATE_COMPONENT,
  payload: {
    componentId,
    update,
  },
});
