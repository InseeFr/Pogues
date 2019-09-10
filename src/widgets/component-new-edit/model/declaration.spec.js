jest.dontMock('./declaration.js');

import DeclarationTransformerFactory from './declaration';
import {
  declarationsFormNew,
  declarationsFormUpdate,
  declarationsState,
  declarationsModel,
} from './__mocks__/declaration';

describe.skip('Transformation entities - Declaration', () => {
  test('Should produce expected STATE in declarations creation from FORM', () => {
    const declarationTransformer = DeclarationTransformerFactory();

    // The id is random in creation, so it's not take it into account for testing.
    const state = declarationTransformer.formToComponentState(
      declarationsFormNew,
    );
    const currentState = Object.keys(state).map(key => {
      const { id, ...stateItem } = state[key];
      return stateItem;
    });

    const expectedState = Object.keys(declarationsState).map(key => {
      const { id, ...expectedStateItem } = declarationsState[key];
      return expectedStateItem;
    });
    expect(currentState).toEqual(expectedState);
  });

  test('Should produce expected STATE from questionnaire MODEL', () => {
    expect(
      DeclarationTransformerFactory().modelToState(declarationsModel),
    ).toEqual(declarationsState);
  });

  test('Should produce expected FORM from questionnaire STATE', () => {
    const declarationTransformer = DeclarationTransformerFactory({
      initialState: declarationsState,
    });
    expect(declarationTransformer.stateToForm()).toEqual(
      declarationsFormUpdate,
    );
  });

  test('Should produce expected MODEL from questionnaire STATE', () => {
    const declarationTransformer = DeclarationTransformerFactory({
      initialState: declarationsState,
    });
    expect(declarationTransformer.stateToModel()).toEqual(declarationsModel);
  });
});
