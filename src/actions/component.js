import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { normalizeComponentFromForm, addIdsNewFormItems } from 'utils/model/form-state-utils';
import { uuid } from 'utils/data-utils';
import Component from 'utils/model/transformation-entities/component';

const { QUESTION } = COMPONENT_TYPE;

export const CREATE_COMPONENT = 'CREATE_COMPONENT';
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT';

function updateNewComponentParent(activeComponents, parentId, newComponentId) {
  const parent = activeComponents[parentId];
  return {
    [parentId]: {
      ...parent,
      children: [...parent.children, newComponentId],
    },
  };
}

function updateNewComponentSiblings(activesComponents, siblingsIds, newComponentWeight) {
  return siblingsIds.reduce((acc, key) => {
    const sibling = activesComponents[key];
    let siblingWeight = sibling.weight;
    if (newComponentWeight <= siblingWeight) {
      siblingWeight += 1;
    }
    return {
      ...acc,
      [key]: {
        ...sibling,
        weight: siblingWeight,
      },
    };
  }, {});
}

function normalizeCodes(codes) {
  if (!codes) return {};
  return codes.reduce((acc, code) => {
    return {
      ...acc,
      [code.id]: code,
    };
  }, {});
}

function normalizeCodeList(codesList, codeIds) {
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
export const createComponent = (form, parentId, weight, type) => (dispatch, getState) => {
  const state = getState();
  const activeComponents = state.appState.activeComponentsById;
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

  const activeComponentsById = {
    ...normalizeComponentFromForm(form, id, parentId, weight, type),
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
