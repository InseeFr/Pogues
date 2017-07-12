import { uuid } from 'utils/data-utils';
import { nameFromLabel } from 'utils/name-utils';
import Code from './code';

export const defaultCodesListState = {
  id: undefined,
  name: undefined,
  label: undefined,
  codes: [],
};

export const defaultCodesListForm = {
  codesList: {
    id: '',
    label: '',
  },
  codes: [],
};

function modelToState(model) {
  const { id, name, label, codes } = model;

  const codeListData = {
    id,
    name,
    label,
    codes: Object.keys(codes),
  };

  return {
    ...defaultCodesListState,
    ...codeListData,
  };
}

function stateToModel(state) {}

function formToState(form) {
  const { codesList: { id, label }, codes } = form;
  const codesListState = {
    codesList: {
      id: id !== '' ? id : uuid(),
      label,
      name: nameFromLabel(label),
    },
    codes: codes.map(codeForm => {
      return Code.formToState(codeForm);
    }),
  };

  return {
    ...defaultCodesListForm,
    ...codesListState,
  };
}

export default {
  modelToState,
  stateToModel,
  formToState,
};
