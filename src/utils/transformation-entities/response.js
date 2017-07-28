import { DATATYPE_TYPE_FROM_NAME, DATATYPE_NAME } from 'constants/pogues-constants';

const { TEXT } = DATATYPE_NAME;

export const defaultResponseModel = {
  mandatory: false,
  codeListReference: '',
  datatype: { typeName: TEXT, maxLength: 255, pattern: '', type: DATATYPE_TYPE_FROM_NAME[TEXT] },
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
