export const defaultCodesListState = {
  id: undefined,
  name: undefined,
  label: undefined,
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

export default {
  modelToState,
  stateToModel,
};
