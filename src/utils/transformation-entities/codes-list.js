import { uuid } from 'utils/data-utils';
import { nameFromLabel } from 'utils/name-utils';
import { CODES_LIST_INPUT_ENUM } from 'constants/pogues-constants';

const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;

export const defaultCodesListForm = {
  [NEW]: {
    label: '',
    codes: [],
  },
  [REF]: {},
  [QUESTIONNAIRE]: {
    codesListId: '',
  },
  type: NEW,
};

// export const defaultCodesListState = {
//   id: '',
//   label: '',
//   name: '',
//   codes: [],
// };

export const defaultCodesListComponentState = {
  type: NEW,
  codesListId: '',
};

function transformationFormToState(form, type, currentState, codesListsStore) {
  const { id } = currentState;
  let state = {};

  if (type === NEW) {
    const { name, label, codes } = form;

    state = {
      id: id || uuid(),
      label,
      name: name || nameFromLabel(label),
      codes: [],
    };

    state.codes = codes.reduce((acc, c) => {
      const { label: labelCode, value, code } = c;
      const idCode = c.id || uuid();

      return {
        ...acc,
        [idCode]: {
          id: idCode,
          label: labelCode,
          value,
          code,
        },
      };
    }, {});
  } else if (form) {
    const { codesListId } = form;
    state = codesListsStore[codesListId];
  }

  return state;
}

function transformationFormToStateComponent(form, currentComponentState) {
  const { codesListId } = currentComponentState;
  const { type, [type]: codesListForm } = form;
  const componentState = {
    type,
  };

  if (type === NEW) {
    componentState.codesListId = codesListId && codesListId !== '' ? codesListId : uuid();
  } else if (type === QUESTIONNAIRE) {
    componentState.codesListId = codesListForm[QUESTIONNAIRE].codesListId;
  }

  return componentState;
}

function transformationModelToStore(model = []) {
  return model.reduce((acc, codesList) => {
    const { Label: label, Name: name, Code: codes } = codesList;
    const id = codesList.id || uuid();
    return {
      ...acc,
      [id]: {
        id,
        label,
        name,
        codes: (codes || []).reduce((accCodes, c) => {
          const { Label: labelCode, Value, code } = c;
          const idCode = c.id || uuid();
          return {
            ...accCodes,
            [idCode]: {
              id: idCode,
              label: labelCode,
              code,
              value: Value,
            },
          };
        }, {}),
      },
    };
  }, {});
}

function transformationStateComponentToForm(state, { type, codesListId }) {
  const { label, codes } = state;
  const form = {};

  if (type === NEW && label && codes) {
    form[NEW] = {
      label,
      codes,
    };
  } else if (type === QUESTIONNAIRE) {
    form[QUESTIONNAIRE] = {
      codesListId,
    };
  }

  return {
    ...defaultCodesListForm,
    ...form,
    type,
  };
}

function transformationStoreToModel(currentStore = {}) {
  const codesLists = [];

  Object.keys(currentStore).forEach(key => {
    const { id, label: Label, name: Name, codes } = currentStore[key];
    codesLists.push({
      id,
      Label,
      Name,
      Code: Object.keys(codes).reduce((acc, keyCode) => {
        const { id: idCode, label: labelCode, value, code } = codes[keyCode];
        return [
          ...acc,
          {
            id: idCode,
            Label: labelCode,
            Value: value,
            code,
          },
        ];
      }, []),
    });
  });

  return codesLists;
}

const CodesListTransformerFactory = (conf = {}) => {
  const { codesListsStore, initialComponentState } = conf;

  let currentComponentState = initialComponentState || {};
  let currentState = (codesListsStore && codesListsStore[currentComponentState.codesListId]) || {};

  return {
    formToState: form => {
      currentState = transformationFormToState(form);
      return currentState;
    },
    formToStateComponent: form => {
      currentComponentState = transformationFormToStateComponent(form, currentComponentState);
      return currentComponentState;
    },
    modelToStore: model => {
      return transformationModelToStore(model);
    },
    stateComponentToForm: () => {
      return transformationStateComponentToForm(currentState, currentComponentState);
    },
    storeToModel: store => {
      return transformationStoreToModel(store);
    },
    getState: () => {
      return currentState;
    },
  };
};

export default CodesListTransformerFactory;
