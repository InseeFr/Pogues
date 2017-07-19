import { DATATYPE_NAME, DATATYPE_TYPE_FROM_NAME } from 'constants/pogues-constants';

const { DATE, NUMERIC, TEXT, BOOLEAN } = DATATYPE_NAME;

export const defaultResponseModel = {
  datatype: {
    typeName: '',
    type: '',
  },
};

function stateToModel(state) {
  const { mandatory, codeListReference, type, datatype = {} } = state;
  const model = {
    mandatory: mandatory || false,
    codeListReference: codeListReference || '',
    datatype: {
      ...datatype,
      typeName: type,
      type: DATATYPE_TYPE_FROM_NAME[type],
    },
  };

  return {
    ...defaultResponseModel,
    ...model,
  };
}

export default {
  stateToModel,
};
