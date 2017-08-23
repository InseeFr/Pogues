import { uuid } from 'utils/data-utils';
import { nameFromLabel } from 'utils/name-utils';
import { CODES_LIST_INPUT_ENUM } from 'constants/pogues-constants';

const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;

export const defaultCodesListForm = {
  label: '',
  name: '',
  codes: [],
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
  } else {
    const { codesListId } = form;
    state = codesListsStore[codesListId];
  }

  return state;
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

function transformationStateToForm(state, type) {
  let form;

  if (type === NEW) {
    const { label, name, codes } = state;
    form = {
      label,
      name,
      codes: Object.keys(codes).reduce((acc, key) => {
        const { label: labelCode, value, code } = codes[key];
        return [
          ...acc,
          {
            label: labelCode,
            value,
            code,
          },
        ];
      }, []),
    };
  } else {
    const { codesListId } = state;
    form = {
      codesListId,
    };
  }

  return form;
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
  const { initialState, codesListsStore, type } = conf;

  let currentState = initialState || defaultCodesListForm;

  return {
    formToState: form => {
      currentState = transformationFormToState(form, type, currentState, codesListsStore);
      return currentState;
    },
    modelToStore: model => {
      return transformationModelToStore(model);
    },
    stateToForm: () => {
      return transformationStateToForm(currentState, type);
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
