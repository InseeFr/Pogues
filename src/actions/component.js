import { uuid } from 'utils/data-utils';
import Component from 'utils/model/transformation-entities/component';
import {
  getCodesListFromForm,
  getCodesFromForm,
  updateNewComponentParent,
  updateNewComponentSiblings,
} from 'utils/model/form-to-state-utils';

export const CREATE_COMPONENT = 'CREATE_COMPONENT';
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT';

/**
 * Create component
 *
 * It creates a component in the store appState.activeComponents.
 *
 * @param   {object}  component The component data required for creation.
 * @param   {object}  parent    The component parent data.
 * @param   {object}  siblings  The siblings of the components in the tree.
 * @param   {integer} weight    The position of the component.
 * @param   {string}  type      The type of component
 * @return  {object}            CREATE_COMPONENT action
 */
export const createComponent = (form, parentId, weight, type) => (dispatch, getState) => {
  const state = getState();
  const id = uuid();
  const activeComponents = state.appState.activeComponentsById;
  const newComponent = Component.formToState({ ...form, parent: parentId, weight, type, id });
  const activeCodesById = getCodesFromForm(newComponent);
  const activeCodeListsById = getCodesListFromForm(newComponent);
  const activeComponentsById = {
    [id]: newComponent,
    ...updateNewComponentParent(activeComponents, parentId, id),
    ...updateNewComponentSiblings(activeComponents, activeComponents[parentId].children, weight),
  };

  return dispatch({
    type: CREATE_COMPONENT,
    payload: {
      id,
      update: {
        activeComponentsById,
        activeCodesById,
        activeCodeListsById,
      },
    },
  });
};

/**
 * Update component
 *
 * It updates in the store appState.activeComponents the corresponding component with the new values.
 *
 * @param   {string}  componentId The component id
 * @param   {object}  update      The properties which need to be updated
 * @return  {object}              UPDATE_COMPONENT action
 */
export const updateComponent = (form, id, parent, weight, type) => {
  const updatedComponent = Component.formToState({ ...form, parent, weight, type, id });
  const activeCodesById = getCodesFromForm(updatedComponent);
  const activeCodeListsById = getCodesListFromForm(updatedComponent);
  const activeComponentsById = {
    [id]: updatedComponent,
  };
  return {
    type: UPDATE_COMPONENT,
    payload: {
      id,
      update: {
        activeComponentsById,
        activeCodesById,
        activeCodeListsById,
      },
    },
  };
};
