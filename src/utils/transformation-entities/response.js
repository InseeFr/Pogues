import { DATATYPE_TYPE_FROM_NAME } from 'constants/pogues-constants';

export const defaultResponseModel = {
  datatype: {
    typeName: '',
    type: '',
  },
};

function stateToModel(state) {
  const { mandatory, codeListReference, type, datatype = {} } = state;
  const model = {
    datatype: {
      ...datatype,
      typeName: type,
      type: DATATYPE_TYPE_FROM_NAME[type],
    },
  };

  if (mandatory) model.mandatory = mandatory;
  if (codeListReference) model.codeListReference = codeListReference;

  return {
    ...defaultResponseModel,
    ...model,
  };
}

export default {
  stateToModel,
};
