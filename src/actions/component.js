import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { normalizeComponentFromForm, addIdsNewFormItems } from 'utils/model/form-state-utils';
import { uuid } from 'utils/data-utils';
import Component from 'utils/model/transformation-entities/component';
import { isSubSequence, isSequence } from 'utils/component/component-utils';
import {
  moveQuestionToSubSequence,
  moveQuestionAndSubSequenceToSequence,
  increaseWeightOfAll,
} from './component-moves';

const { QUESTION } = COMPONENT_TYPE;

export const CREATE_COMPONENT = 'CREATE_COMPONENT';
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT';

/**
 * This function is called when we add a component to a parent
 * 
 * @param {object[]} activeComponents The liste of components
 * @param {string} parentId The id of the parent we should update
 * @param {string} newComponentId The id of the created component
 */
export function updateNewComponentParent(activeComponents, parentId, newComponentId) {
  const parent = activeComponents[parentId];
  return {
    [parentId]: {
      ...parent,
      children: [...parent.children, newComponentId],
    },
  };
}

/**
 * Convert a list of codes into an object
 * [{id: '1'}] => { '1': {id: '1'}}
 * 
 * @param {object[]} codes 
 */
export function normalizeCodes(codes) {
  if (!codes) return {};
  return codes.reduce((acc, code) => {
    return {
      ...acc,
      [code.id]: code,
    };
  }, {});
}

/**
 * Add codeIds to a codeList object
 * 
 * @param {object} codesList
 * @param {array} codeIds 
 */
export function normalizeCodeList(codesList, codeIds) {
  if (!codesList) return {};
  return {
    [codesList.id]: {
      ...codesList,
      codes: codeIds,
    },
  };
}

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
export const createComponent = (form, parentId, weight, type) => dispatch => {
  const id = uuid();
  let activeCodeListsById = {};
  let activeCodesById = {};

  if (type === QUESTION) {
    const responseFormat = form.responseFormat;
    const responseFormatType = responseFormat.type;
    responseFormat[responseFormatType] = addIdsNewFormItems(responseFormat[responseFormatType]);
    activeCodesById = normalizeCodes(responseFormat[responseFormatType].codes);
    activeCodeListsById = normalizeCodeList(responseFormat[responseFormatType].codesList, Object.keys(activeCodesById));
  }

  const componentFromForm = normalizeComponentFromForm(form, id, parentId, weight, type);

  return new Promise(resolve => {
    const result = dispatch({
      type: CREATE_COMPONENT,
      payload: {
        id,
        update: {
          activeComponentsById: componentFromForm,
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
 * TODO TEST
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
  let activeCodeListsById = {};
  let activeCodesById = {};

  if (type === QUESTION) {
    const responseFormat = form.responseFormat;
    const responseFormatType = responseFormat.type;
    responseFormat[responseFormatType] = addIdsNewFormItems(responseFormat[responseFormatType]);
    activeCodesById = normalizeCodes(responseFormat[responseFormatType].codes);
    activeCodeListsById = normalizeCodeList(responseFormat[responseFormatType].codesList, Object.keys(activeCodesById));
  }
  // const activeComponentsById = normalizeComponentFromForm(form, id, parent, weight, type);

  const activeComponentsById = {
    [form.id]: Component.formToState({ ...form, id, parent, weight, type }),
  };
  return {
    type: UPDATE_COMPONENT,
    payload: {
      id: form.id,
      update: {
        activeComponentsById,
        activeCodesById,
        activeCodeListsById,
      },
    },
  };
};
