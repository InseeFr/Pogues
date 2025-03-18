import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';

import { QUESTION_TYPE_ENUM } from '../../../constants/pogues-constants';
import Multiple, {
  defaultState as multipleDefault,
} from './response-format-multiple';
import Pairing, {
  defaultState as pairingDefault,
} from './response-format-pairing';
import Simple, {
  defaultState as simpleDefault,
} from './response-format-simple';
import Single, {
  defaultState as singleDefault,
} from './response-format-single';
import Table, { defaultState as tableDefault } from './response-format-table';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE, PAIRING } =
  QUESTION_TYPE_ENUM;

export const defaultForm = {
  [SIMPLE]: simpleDefault,
  [SINGLE_CHOICE]: singleDefault,
  [MULTIPLE_CHOICE]: multipleDefault,
  [TABLE]: tableDefault,
  [PAIRING]: pairingDefault,
  type: '',
};

export function formToState(form, collectedVariables, transformers) {
  const { type, [type]: responseFormatForm } = form;
  const state = {
    type,
  };

  const { CodesList } = responseFormatForm;
  const newCodes = [];
  for (const code of CodesList.codes) {
    const { precisionid, precisionlabel, precisionsize } = code;
    if (precisionid) {
      for (const collectedVariable of collectedVariables) {
        if (precisionid === collectedVariable.name) {
          const newCode = {
            ...code,
            precisionByCollectedVariableId: {
              ...code.precisionByCollectedVariableId,
              [collectedVariable.id]: {
                precisionid,
                precisionlabel,
                precisionsize,
              },
            },
          };
          delete newCode.precisionid;
          delete newCode.precisionlabel;
          delete newCode.precisionsize;
          newCodes.push(newCode);
        }
      }
    } else {
      newCodes.push(code);
    }
  }
  const formWithNewCodes = {
    ...responseFormatForm,
    CodesList: { ...responseFormatForm.CodesList, codes: newCodes },
    [type]: {
      ...responseFormatForm[type],
      CodesList: { ...responseFormatForm.CodesList, codes: newCodes },
    },
  };

  if (type === SINGLE_CHOICE) {
    state[type] = transformers.single.formToState(formWithNewCodes);
  } else if (type === MULTIPLE_CHOICE) {
    state[type] = transformers.multiple.formToState(formWithNewCodes);
  } else if (type === TABLE) {
    state[type] = transformers.table.formToState(formWithNewCodes);
  } else if (type === PAIRING) {
    state[type] = transformers.pairing.formToState(formWithNewCodes);
  } else {
    state[type] = transformers.simple.formToState(formWithNewCodes);
  }

  state[type].CodesList = { ...CodesList, codes: newCodes };
  return state;
}

export function stateToForm(currentState, transformers) {
  const { type } = currentState;

  return merge({}, cloneDeep(defaultForm), {
    type,
    [SIMPLE]: transformers.simple.stateToForm(),
    [SINGLE_CHOICE]: transformers.single.stateToForm(),
    [MULTIPLE_CHOICE]: transformers.multiple.stateToForm(),
    [TABLE]: transformers.table.stateToForm(),
    [PAIRING]: transformers.pairing.stateToForm(),
  });
}

const Factory = (initialState = {}, codesListsStore) => {
  let currentState = merge(cloneDeep(defaultForm), initialState);

  const transformers = {
    simple: Simple(currentState[SIMPLE]),
    single: Single(currentState[SINGLE_CHOICE], codesListsStore),
    multiple: Multiple(currentState[MULTIPLE_CHOICE], codesListsStore),
    table: Table(currentState[TABLE], codesListsStore),
    pairing: Pairing(currentState[PAIRING], codesListsStore),
  };

  return {
    formToState: (form, collectedVariables) => {
      if (form) {
        const state = formToState(form, collectedVariables, transformers);
        currentState = merge(cloneDeep(currentState), state);
        return state;
      }
      return currentState;
    },
    stateToForm: () => {
      return stateToForm(currentState, transformers);
    },
    getCodesListStore: () => {
      let codesLists;

      if (currentState.type === SINGLE_CHOICE) {
        codesLists = transformers.single.getCodesListStore();
      } else if (currentState.type === MULTIPLE_CHOICE) {
        codesLists = transformers.multiple.getCodesListStore();
      } else if (currentState.type === TABLE) {
        codesLists = transformers.table.getCodesListStore();
      } else if (currentState.type === PAIRING) {
        codesLists = transformers.pairing.getCodesListStore();
      } else {
        codesLists = {};
      }

      return codesLists;
    },
    getNormalizedValues: (form) => {
      // Values ready to be validated
      const { type, [type]: responseFormatType } = form;
      const normalized = {
        type,
      };

      if (form.type === SIMPLE) {
        normalized[SIMPLE] =
          transformers.simple.getNormalizedValues(responseFormatType);
      } else if (form.type === SINGLE_CHOICE) {
        normalized[SINGLE_CHOICE] =
          transformers.single.getNormalizedValues(responseFormatType);
      } else if (form.type === MULTIPLE_CHOICE) {
        normalized[MULTIPLE_CHOICE] =
          transformers.multiple.getNormalizedValues(responseFormatType);
      } else if (form.type === TABLE) {
        normalized[TABLE] =
          transformers.table.getNormalizedValues(responseFormatType);
      } else if (form.type === PAIRING) {
        normalized[PAIRING] =
          transformers.pairing.getNormalizedValues(responseFormatType);
      }

      return normalized;
    },
  };
};

export default Factory;
