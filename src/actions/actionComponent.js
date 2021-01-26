import { remove } from './component-remove';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { LOOP } = COMPONENT_TYPE;

export const UPDATE_COMPONENT = 'UPDATE_COMPONENT';
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';

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
) => (dispatch, getState) => {
  const state = getState();
  const { activeComponentsById } = state.appState;
  if (
    componentsStore[componentId]?.type === LOOP &&
    componentsStore[componentId]?.basedOn &&
    activeComponentsById[componentId]?.basedOn === undefined
  ) {
    const loops = Object.values(activeComponentsById).filter(
      element => element.type === LOOP && element.basedOn === componentId,
    );
    if (loops.length > 0) {
      loops.forEach(loop => {
        loop.basedOn = componentsStore[componentId].basedOn;
        const { id } = loop;
        dispatch({
          type: UPDATE_COMPONENT,
          payload: {
            id,
            update: {
              activeComponentsById: { [id]: loop },
              activeCalculatedVariablesById: {},
              activeExternalVariablesById: {},
              activeCollectedVariablesById: {
                [id]: {},
              },
              activeCodeListsById: {},
            },
          },
        });
      });
    }
  }

  return dispatch({
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
