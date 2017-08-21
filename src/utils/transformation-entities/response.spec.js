import Default, { defaultResponseModel } from './response';
import { DATATYPE_TYPE_FROM_NAME, DATATYPE_NAME } from 'constants/pogues-constants';

const { TEXT } = DATATYPE_NAME;

describe('reponse', () => {
  test('the default model should be equal to', () => {
    expect(defaultResponseModel).toEqual({
      mandatory: false,
      codeListReference: '',
      datatype: { typeName: TEXT, maxLength: 255, pattern: '', type: DATATYPE_TYPE_FROM_NAME[TEXT] },
    });
  });

  test('should override default value', () => {
    expect(
      Default.stateToModel({
        mandatory: true,
        nonResponseModality: 'nonResponseModality',
        codeListReference: 'codeListReference',
        type: DATATYPE_NAME.NUMERIC,
      })
    ).toEqual({
      mandatory: true,
      nonResponseModality: 'nonResponseModality',
      codeListReference: 'codeListReference',
      datatype: {
        typeName: DATATYPE_NAME.NUMERIC,
        type: 'NumericDatatypeType',
      },
    });
  });
});
