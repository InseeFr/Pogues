import { nameFromLabel } from 'utils/name-utils';
import { uuid } from 'utils/data-utils';
import { normalizeQuestion, normalizeSequence } from 'utils/model/model-to-state-utils';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

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

function normalizeComponent(component, id, parent, weight, type, responseFormat) {
  const name = component.name || nameFromLabel(component.label);
  if (type === QUESTION) {
    component = normalizeQuestion({ ...component, parent, weight, type, id, name, responseFormat });
  } else {
    component = normalizeSequence({ ...component, parent, weight, type, id, name });
  }

  return {
    [id]: component,
  };
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

function prepareResponseFormat(responseFormat) {
  if (!responseFormat) return responseFormat;

  const { type, [type]: selectedFormat } = responseFormat;
  const normalizedData = {};

  if (selectedFormat.codesList) {
    const codesList = selectedFormat.codesList;

    if (codesList.label !== '' && !codesList.id) {
      codesList.id = uuid();
    }

    normalizedData.codesList = {
      id: codesList.id,
      label: codesList.label,
      name: nameFromLabel(codesList.label),
    };
  }

  if (selectedFormat.codes) {
    normalizedData.codes = selectedFormat.codes.map(code => {
      return {
        ...code,
        id: code.id || uuid(),
      };
    });
  }

  return {
    type,
    [type]: {
      ...selectedFormat,
      ...normalizedData,
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
export const createComponent = (component, parentId, weight, type) => (dispatch, getState) => {
  const state = getState();
  const activeComponentsById = state.appState.activeComponentsById;
  const responseFormat = prepareResponseFormat(component.responseFormat);
  const id = uuid();
  let activeCodeListsById = {};
  let activeCodesById = {};

  if (responseFormat) {
    const responseFormatType = responseFormat.type;
    activeCodesById = normalizeCodes(responseFormat[responseFormatType].codes);
    activeCodeListsById = normalizeCodeList(responseFormat[responseFormatType].codesList, Object.keys(activeCodesById));
  }

  return dispatch({
    type: CREATE_COMPONENT,
    payload: {
      id,
      update: {
        activeComponentsById: {
          ...normalizeComponent(component, id, parentId, weight, type, responseFormat),
          ...updateNewComponentParent(activeComponentsById, parentId, id),
          ...updateNewComponentSiblings(activeComponentsById, activeComponentsById[parentId].children, weight),
        },
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
export const updateComponent = component => {
  const responseFormat = prepareResponseFormat(component.responseFormat);
  let activeCodeListsById = {};
  let activeCodesById = {};

  if (responseFormat) {
    const responseFormatType = responseFormat.type;
    activeCodesById = normalizeCodes(responseFormat[responseFormatType].codes);
    activeCodeListsById = normalizeCodeList(responseFormat[responseFormatType].codesList, Object.keys(activeCodesById));
  }
  return {
    type: UPDATE_COMPONENT,
    payload: {
      id: component.id,
      update: {
        activeComponentsById: {
          ...normalizeComponent(
            component,
            component.id,
            component.parent,
            component.weight,
            component.type,
            responseFormat
          ),
        },
        activeCodesById,
        activeCodeListsById,
      },
    },
  };
};
