import { uuid } from 'utils/data-utils';
import { nameFromLabel } from 'utils/name-utils';

export const defaultCodesListForm = {
  label: '',
  name: '',
  codes: [],
};

function transformationFormToState(form, currentState) {
  const { id } = currentState;
  const { name, label, codes } = form;

  const state = {
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

  return state;
}

function transformationModelToStore(model = []) {
  return model.reduce((acc, codesList) => {
    const { label, name, codes } = codesList;
    const id = codesList.id || uuid();
    return {
      ...acc,
      [id]: {
        id,
        label,
        name,
        codes: codes.reduce((accCodes, c) => {
          const { label: labelCode, value, code } = c;
          const idCode = c.id || uuid();
          return {
            ...accCodes,
            [idCode]: {
              id: idCode,
              label: labelCode,
              code,
              value,
            },
          };
        }, {}),
      },
    };
  }, {});
}

function transformationStateToForm(state) {
  const { label, name, codes } = state;

  return {
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
}

function transformationStoreToModel(currentStore = {}) {
  const codesLists = [];

  Object.keys(currentStore).forEach(key => {
    const { id, label, name, codes } = currentStore[key];
    codesLists.push({
      id,
      label,
      name,
      codes: Object.keys(codes).reduce((acc, keyCode) => {
        const { id: idCode, label: labelCode, value, code } = codes[keyCode];
        return [
          ...acc,
          {
            id: idCode,
            label: labelCode,
            value,
            code,
          },
        ];
      }, []),
    });
  });

  return codesLists;
}

const CodesListTransformerFactory = (conf = {}) => {
  const { initialState } = conf;

  let currentState = initialState || defaultCodesListForm;

  return {
    formToState: form => {
      currentState = transformationFormToState(form, currentState);
      return currentState;
    },
    modelToStore: model => {
      return transformationModelToStore(model);
    },
    stateToForm: () => {
      return transformationStateToForm(currentState);
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
