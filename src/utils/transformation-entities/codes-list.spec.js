jest.dontMock('./codes-list.js');

import codesListTransformerFactory from './codes-list';
import {
  codesListFirstFormUpdate,
  codesListFirstState,
  codesListsStore,
  codesListsModel,
  codesListFirstForm,
} from './__mocks__/codes-list';

describe('Transformation entities - codesList', () => {
  test('Should produce expected STATE in updating from codes list FORM', () => {
    expect(
      codesListTransformerFactory({ initialState: codesListFirstState }).formToState(codesListFirstFormUpdate)
    ).toEqual(codesListFirstState);
  });

  test('Should produce expected STORE from codes lists MODEL', () => {
    expect(codesListTransformerFactory().modelToStore(codesListsModel)).toEqual(codesListsStore);
  });

  test('Should produce expected FORM from codes list STATE', () => {
    const codesListTransformer = codesListTransformerFactory({
      initialState: codesListFirstState,
    });
    expect(codesListTransformer.stateToForm()).toEqual(codesListFirstForm);
  });

  test('Should produce expected MODEL from codes lists STORE', () => {
    expect(codesListTransformerFactory().storeToModel(codesListsStore)).toEqual(codesListsModel);
  });
});
