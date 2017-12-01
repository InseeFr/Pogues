import {
  isSubSequence,
  isSequence,
  isQuestion,
  toComponents,
  updateNewComponentParent,
} from 'utils/component/component-utils';
import { moveQuestionToSubSequence, moveQuestionAndSubSequenceToSequence } from './component-insert';
import { increaseWeightOfAll } from './component-update';

export const CREATE_COMPONENT = 'CREATE_COMPONENT';
export const DUPLICATE_COMPONENT = 'DUPLICATE_COMPONENT';
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT';
export const UPDATE_COMPONENT_PARENT = 'UPDATE_COMPONENT_PARENT';
export const UPDATE_COMPONENT_ORDER = 'UPDATE_COMPONENT_ORDER';
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';
export const MOVE_COMPONENT = 'MOVE_COMPONENT';

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
export const createComponent = (
  componentState,
  codesListsStore,
  calculatedVariablesStore,
  externalVariablesStore,
  collectedVariablesStore
) => dispatch => {
  const activeComponentsStore = {
    [componentState.id]: componentState,
  };

  return new Promise(resolve => {
    const result = dispatch({
      type: CREATE_COMPONENT,
      payload: {
        id: componentState.id,
        update: {
          activeComponentsById: activeComponentsStore,
          activeCalculatedVariablesById: calculatedVariablesStore,
          activeExternalVariablesById: externalVariablesStore,
          activeCollectedVariablesById: { [componentState.id]: collectedVariablesStore },
          activeCodeListsById: codesListsStore,
        },
      },
    });
    resolve({
      payload: {
        id: componentState.id,
        lastCreatedComponent: result.payload.update.activeComponentsById,
      },
    });
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
  const selectedComponent = activesComponents[selectedComponentId];

  let activeComponentsById = {};

  /**
   * We do the reorder only if we have a selected component
   */
  if (selectedComponent) {
    // We get the next sibling component of the currently selected component
    const siblingSelectedComponent = toComponents(
      activesComponents[selectedComponent.parent].children,
      activesComponents
    ).find(c => c.weight === selectedComponent.weight + 1);

    const childrenSelectedComponentLength = selectedComponent.children.length;

    /**
     * When we insert a SUBSEQUENCE, we have to do a reorder only in these two cases :
     * 1. The currently selected component is QUESTION and its sibling is also a QUESTION
     * 2. The currently selecteed component is a SUBSEQUENCE with children (of course QUESTION)
     */
    if (
      isSubSequence(lastCreatedComponent[id]) &&
      ((isQuestion(selectedComponent) && isQuestion(siblingSelectedComponent)) ||
        (isSubSequence(selectedComponent) && childrenSelectedComponentLength > 0))
    ) {
      // If the selected component have children, we will use the first child as the component used for the insert
      const comp =
        childrenSelectedComponentLength === 0
          ? selectedComponent
          : toComponents(activesComponents[selectedComponent.id].children, activesComponents).find(c => c.weight === 0);

      activeComponentsById = moveQuestionToSubSequence(
        activesComponents,
        comp,
        lastCreatedComponent[id],
        true,
        comp.id !== selectedComponent.id
      );

      /**
       * We move components into the new
       *  sequence only if the selected is not a sequence without children
       */
    } else if (
      isSequence(lastCreatedComponent[id]) &&
      !(isSequence(selectedComponent) && childrenSelectedComponentLength === 0)
    ) {
      // If the selected component have children, we will use the first child as the component used for the in
      const comp =
        childrenSelectedComponentLength === 0
          ? selectedComponent
          : toComponents(activesComponents[selectedComponent.id].children, activesComponents).find(c => c.weight === 0);
      activeComponentsById = moveQuestionAndSubSequenceToSequence(
        activesComponents,
        comp,
        lastCreatedComponent[id],
        comp.id !== selectedComponent.id
      );
    } else {
      activeComponentsById = increaseWeightOfAll(activesComponents, lastCreatedComponent[id]);
    }
  }

  return dispatch({
    type: UPDATE_COMPONENT_ORDER,
    payload: {
      id,
      update: {
        activeComponentsById,
      },
    },
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
    type: UPDATE_COMPONENT_PARENT,
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
