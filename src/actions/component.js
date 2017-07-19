import { uuid } from 'utils/data-utils';
import Component from 'utils/transformation-entities/component';
import { isSubSequence, isSequence } from 'utils/component/component-utils';
import {
  getCodesListsAndCodesFromQuestion,
  updateNewComponentParent,
} from 'utils/model/form-to-state-utils';
import {
  moveQuestionToSubSequence,
  moveQuestionAndSubSequenceToSequence,
  increaseWeightOfAll,
} from './component-moves';

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
  const newComponent = Component.formToState({ ...form, parent: parentId, weight, type, id });
  const { codes: activeCodesById, codesLists: activeCodeListsById } = getCodesListsAndCodesFromQuestion(
    newComponent.responseFormat
  );
  const activeComponentsById = {
    [id]: newComponent,
  };

  return new Promise(resolve => {
    const result = dispatch({
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
    resolve({
      payload: {
        id,
        lastCreatedComponent: result.payload.update.activeComponentsById,
      },
    });
  });
};

/**
 * Method exectued right after the creation of a component. We will trigger
 * the UPDATE_COMPONENT action in order add to the parent element the id of
 * this new component.
 *
 * @param {object} param Result of the previous CREATE_COMPONENT action
 */
export const updateParentChildren = ({ payload: { id, lastCreatedComponent } }) => (dispatch, getState) => {
  const state = getState();
  return dispatch({
    type: UPDATE_COMPONENT,
    payload: {
      id,
      lastCreatedComponent,
      update: {
        activeComponentsById: updateNewComponentParent(
          state.appState.activeComponentsById,
          lastCreatedComponent[id].parent,
          id
        ),
      },
    },
  });
};

/**
 * Method executed right after the createComponent and updateParentChildren functions.
 * Based on the type of the new component, we will call the right functions in order to
 * the updated list of components.
 *
 * @param {object} param Result of the previous CREATE_COMPONENT action
 */
export const orderComponents = ({ payload: { id, lastCreatedComponent } }) => (dispatch, getState) => {
  const state = getState();
  const selectedComponentId = state.appState.selectedComponentId;
  const activesComponents = state.appState.activeComponentsById;

  let activeComponentsById;

  if (isSubSequence(lastCreatedComponent[id])) {
    activeComponentsById = moveQuestionToSubSequence(activesComponents, selectedComponentId, lastCreatedComponent[id]);
  } else if (isSequence(lastCreatedComponent[id])) {
    activeComponentsById = moveQuestionAndSubSequenceToSequence(
      activesComponents,
      selectedComponentId,
      lastCreatedComponent[id]
    );
  } else {
    activeComponentsById = increaseWeightOfAll(activesComponents, lastCreatedComponent[id]);
  }

  return dispatch({
    type: UPDATE_COMPONENT,
    payload: {
      id,
      update: {
        activeComponentsById,
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
  const { codes: activeCodesById, codesLists: activeCodeListsById } = getCodesListsAndCodesFromQuestion(
    updatedComponent.responseFormat
  );
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
