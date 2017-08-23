jest.dontMock('./redirection.js');

import RedirectionTransformerFactory from './redirection';
import {
  redirectionsFormNew,
  redirectionsFormUpdate,
  redirectionsState,
  redirectionsModel,
} from './__mocks__/redirection';

describe('Transformation entities - Redirection', () => {
  test('Should produce expected STATE in redirections creation from FORM', () => {
    const redirectionTransformer = RedirectionTransformerFactory();

    // The id is random in creation, so it's not take it into account for testing.
    const state = redirectionTransformer.formToState(redirectionsFormNew);
    const currentState = Object.keys(state).map(key => {
      const { id, ...stateItem } = state[key];
      return stateItem;
    });

    const expectedState = Object.keys(redirectionsState).map(key => {
      const { id, ...expectedStateItem } = redirectionsState[key];
      return expectedStateItem;
    });
    expect(currentState).toEqual(expectedState);
  });

  test('Should produce expected STATE from questionnaire MODEL', () => {
    const redirectionTransformer = RedirectionTransformerFactory();
    expect(redirectionTransformer.modelToState(redirectionsModel)).toEqual(redirectionsState);
  });

  test('Should produce expected FORM from questionnaire STATE', () => {
    const redirectionTransformer = RedirectionTransformerFactory({
      initialState: redirectionsState,
    });
    expect(redirectionTransformer.stateToForm()).toEqual(redirectionsFormUpdate);
  });

  test('Should produce expected MODEL from questionnaire STATE', () => {
    const redirectionTransformer = RedirectionTransformerFactory({ initialState: redirectionsState });
    expect(redirectionTransformer.stateToModel()).toEqual(redirectionsModel);
  });
});
