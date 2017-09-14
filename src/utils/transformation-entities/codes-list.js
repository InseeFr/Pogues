import { uuid } from 'utils/data-utils';
import { CODES_LIST_INPUT_ENUM, QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;
const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM;

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

export const defaultCodesListComponentState = {
  type: NEW,
  codesListId: '',
};

function transformationFormToState(form) {
  const { id, label, codes } = form;

  return {
    id,
    label,
    codes: codes.reduce((acc, c) => {
      const { label: labelCode, code } = c;
      const idCode = uuid();

      return {
        ...acc,
        [idCode]: {
          id: idCode,
          label: labelCode,
          code,
        },
      };
    }, {}),
  };
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
    componentState.codesListId = codesListForm.codesListId;
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

function transformationStateComponentToForm(state, { codesListId }) {
  const { label, codes } = state;

  const form = {
    [NEW]: {
      label: label || '',
      codes: Object.keys(codes || {}).reduce((acc, key) => {
        return [...acc, codes[key]];
      }, []),
    },
  };

  if (codesListId && codesListId !== '') {
    form[QUESTIONNAIRE] = {
      codesListId,
    };
  }

  // Always initialize the type NEW
  return {
    ...defaultCodesListForm,
    ...form,
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

function transformationFormToStore(form, currentComponentState) {
  const { type: typeResponseFormat, [typeResponseFormat]: responseFormat } = currentComponentState;
  const store = {};

  if (typeResponseFormat === SINGLE_CHOICE) {
    const { codesListId } = responseFormat;
    const { type: typeCodesList, [typeCodesList]: codesList } = form[SINGLE_CHOICE];

    if (typeCodesList === NEW) {
      store[codesListId] = transformationFormToState({ id: codesListId, ...codesList });
    }
  }

  return store;
}

const CodesListTransformerFactory = (conf = {}) => {
  const { codesListsStore, initialComponentState } = conf;

  let currentComponentState = initialComponentState || {};
  let currentState = (codesListsStore && codesListsStore[currentComponentState.codesListId]) || {};

  return {
    formToStore: form => {
      return transformationFormToStore(form, currentComponentState);
    },
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
