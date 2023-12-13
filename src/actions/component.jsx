import {
  isSubSequence,
  isSequence,
  isQuestion,
  toComponents,
  updateNewComponentParent,
  isExternalQuestionnaire,
  isLoop,
  isFilter,
  isNestedFilter,
} from '../utils/component/component-utils';
import { increaseWeightOfAll } from './component-update';
import { remove } from './component-remove';
import {
  moveQuestionToSubSequence,
  moveQuestionAndSubSequenceToSequence,
  duplicate,
  duplicateComponentAndVars,
} from './component-insert';
import { moveComponent } from './component-move';
import { COMPONENT_TYPE } from '../constants/pogues-constants';

export const CREATE_COMPONENT = 'CREATE_COMPONENT';
export const DUPLICATE_COMPONENT = 'DUPLICATE_COMPONENT';
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT';
export const UPDATE_COMPONENT_PARENT = 'UPDATE_COMPONENT_PARENT';
export const UPDATE_COMPONENT_ORDER = 'UPDATE_COMPONENT_ORDER';
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';
export const MOVE_COMPONENT = 'MOVE_COMPONENT';

const { FILTER } = COMPONENT_TYPE;
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
export const createComponent =
  (
    componentState,
    calculatedVariablesStore,
    externalVariablesStore,
    collectedVariablesStore,
    codesListsStore,
  ) =>
  dispatch => {
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
            activeCollectedVariablesById: collectedVariablesStore
              ? {
                  [componentState.id]: collectedVariablesStore,
                }
              : {},
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
 * Method exectued right after the creation of a component. We will trigger
 * the UPDATE_COMPONENT action in order add to the parent element the id of
 * this new component.
 *
 * @param {object} param Result of the previous CREATE_COMPONENT action
 */
export const updateParentChildren =
  ({ payload: { id, lastCreatedComponent } }) =>
  (dispatch, getState) => {
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
            id,
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
export const orderComponents =
  ({ payload: { id, lastCreatedComponent } }) =>
  (dispatch, getState) => {
    const state = getState();
    const { selectedComponentId, activeComponentsById: activesComponents } =
      state.appState;
    const selectedComponent = activesComponents[selectedComponentId];
    let activeComponentsById = {};
    /**
     * We do the reorder only if we have a selected component
     */
    if (
      selectedComponent &&
      !isLoop(selectedComponent) &&
      !isFilter(selectedComponent) &&
      !isNestedFilter(selectedComponent)
    ) {
      // We get the next sibling component of the currently selected component
      const siblingSelectedComponent = toComponents(
        activesComponents[selectedComponent.parent].children,
        activesComponents,
      ).find(c => c.weight === selectedComponent.weight + 1);
      const childrenSelectedComponentLength = selectedComponent.children.length;

      /**
       * When we insert a SUBSEQUENCE, we have to do a reorder only in these two cases :
       * 1. The currently selected component is QUESTION and its sibling is also a QUESTION
       * 2. The currently selected component is a SUBSEQUENCE with children (of course QUESTION)
       */
      if (
        isSubSequence(lastCreatedComponent[id]) &&
        ((isQuestion(selectedComponent) &&
          isQuestion(siblingSelectedComponent)) ||
          (isSubSequence(selectedComponent) &&
            childrenSelectedComponentLength > 0))
      ) {
        // If the selected component has children, we will use the first child as the component used for the insert
        const comp =
          childrenSelectedComponentLength === 0
            ? selectedComponent
            : toComponents(
                activesComponents[selectedComponent.id].children,
                activesComponents,
              ).find(c => c.weight === 0);

        activeComponentsById = moveQuestionToSubSequence(
          activesComponents,
          comp,
          lastCreatedComponent[id],
          true,
          comp.id !== selectedComponent.id,
        );

        /**
         * We move components into the new
         *  sequence only if the selected is not a sequence without children
         */
      } else if (
        isSequence(lastCreatedComponent[id]) &&
        !isExternalQuestionnaire(selectedComponent) &&
        !(
          isSequence(selectedComponent) && childrenSelectedComponentLength === 0
        )
      ) {
        // If the selected component has children, we will use the first child as the component used for the in
        const comp =
          childrenSelectedComponentLength === 0
            ? selectedComponent
            : toComponents(
                activesComponents[selectedComponent.id].children,
                activesComponents,
              ).find(c => c.weight === 0);
        activeComponentsById = moveQuestionAndSubSequenceToSequence(
          activesComponents,
          comp,
          lastCreatedComponent[id],
          comp.id !== selectedComponent.id,
        );
      } else {
        activeComponentsById = increaseWeightOfAll(
          activesComponents,
          lastCreatedComponent[id],
        );
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
 * Update component
 *
 * It updates in the store appState.activeComponents the corresponding component with the new values.
 *
 * @param   {string}  componentId The component id
 * @param   {object}  update      The properties which need to be updated
 * @return  {object}              UPDATE_COMPONENT action
 */
export const updateComponent = (
  componentId,
  componentsStore,
  calculatedVariablesStore = {},
  externalVariablesStore = {},
  collectedVariablesStore = {},
  codesListsStore = {},
) => {
  return {
    type: UPDATE_COMPONENT,
    payload: {
      componentId,
      update: {
        activeComponentsById: componentsStore,
        activeCalculatedVariablesById: calculatedVariablesStore,
        activeExternalVariablesById: externalVariablesStore,
        activeCollectedVariablesById: {
          [componentId]: collectedVariablesStore,
        },
        activeCodeListsById: codesListsStore,
      },
    },
  };
};

/**
 * Method used when we drag a component next to another one.
 *
 * @param {string} idMovedComponent id of the dragged component
 * @param {string} idTargetComponent id of the dropped component
 * @param {number} newWeight the new weight of the dragged component
 */
export const dragComponent =
  (idMovedComponent, idTargetComponent, newWeight) => (dispatch, getState) => {
    const state = getState();
    const activesComponents = state.appState.activeComponentsById;
    const find_Filters = Object.values(activesComponents).filter(
      element =>
        element.type === FILTER &&
        (element.initialMember === idTargetComponent ||
          element.finalMember === idTargetComponent),
    );
    if (find_Filters.length > 0) {
      find_Filters.forEach(filter => {
        if (filter.finalMember !== idTargetComponent) {
          const next_element = Object.values(activesComponents).find(
            element =>
              activesComponents[filter.initialMember] &&
              element.type === activesComponents[filter.initialMember].type &&
              element.parent ===
                activesComponents[filter.initialMember].parent &&
              element.weight ===
                activesComponents[filter.initialMember].weight + 1,
          );
          if (next_element) {
            filter.initialMember = next_element.id;
            const { id } = filter;
            const component = {};
            component[filter.id] = filter;

            dispatch({
              type: UPDATE_COMPONENT,
              payload: {
                id,
                update: {
                  activeComponentsById: component,
                  activeCalculatedVariablesById: {},
                  activeExternalVariablesById: {},
                  activeCollectedVariablesById: {
                    [id]: {},
                  },
                  activeCodeListsById: {},
                },
              },
            });
          }
        } else if (filter.initialMember !== idTargetComponent) {
          const next_element = Object.values(activesComponents).find(
            element =>
              activesComponents[filter.finalMember] &&
              element.type === activesComponents[filter.finalMember].type &&
              element.parent === activesComponents[filter.finalMember].parent &&
              element.weight ===
                activesComponents[filter.finalMember].weight - 1,
          );
          if (next_element) {
            filter.finalMember = next_element.id;
            const { id } = filter.id;
            const component = {};
            component[filter.id] = filter;

            dispatch({
              type: UPDATE_COMPONENT,
              payload: {
                id,
                update: {
                  activeComponentsById: component,
                  activeCalculatedVariablesById: {},
                  activeExternalVariablesById: {},
                  activeCollectedVariablesById: {
                    [id]: {},
                  },
                  activeCodeListsById: {},
                },
              },
            });
          }
        } else {
          const { id } = filter;
          dispatch({
            type: REMOVE_COMPONENT,
            payload: remove(activesComponents, id),
          });
        }
      });
    }
    const stateNew = getState();
    const newActivesComponents = stateNew.appState.activeComponentsById;
    return dispatch({
      type: MOVE_COMPONENT,
      payload: {
        idMovedComponent,
        idTargetComponent,
        update: {
          activeComponentsById: moveComponent(
            newActivesComponents,
            idMovedComponent,
            idTargetComponent,
            newWeight,
          ),
        },
      },
    });
  };

/**
 * Method used when we click on the DELETE button on a SEQUENCE, SUBSEQUENCE or QUESTION
 *
 * @param {string} idDeletedComponent the id of the component we want to remove
 */
export const removeComponent = idDeletedComponent => (dispatch, getState) => {
  const state = getState();
  const { activeComponentsById } = state.appState;

  dispatch({
    type: REMOVE_COMPONENT,
    payload: remove(activeComponentsById, idDeletedComponent),
  });
};

/**
 * Method used when we click on the DUPLICATE button on a SEQUENCE, SUBSEQUENCE or QUESTION
 *
 * @param {string} idDeletedComponent the id of the component we want to remove
 */
export const duplicateComponent = idComponent => (dispatch, getState) => {
  const state = getState();
  const { activeComponentsById } = state.appState;
  dispatch({
    type: DUPLICATE_COMPONENT,
    payload: {
      update: {
        activeComponentsById: duplicate(activeComponentsById, idComponent),
      },
    },
  });
};

/**
 * Method used when we click on the DUPLICATE button on a SEQUENCE, SUBSEQUENCE or QUESTION
 *
 * @param {string} idComponent the id of the component we want to remove
 */
export const duplicateComponentAndVariables =
  idComponent => (dispatch, getState) => {
    const state = getState();
    const { activeComponentsById } = state.appState;
    const collectedVariables =
      state.appState.collectedVariableByQuestion[idComponent];
    const update = duplicateComponentAndVars(
      activeComponentsById,
      collectedVariables,
      idComponent,
    );
    dispatch({
      type: DUPLICATE_COMPONENT,
      payload: { update },
    });
  };
