import { describe, expect, test } from 'vitest';

import {
  externalVariablesFormNew,
  externalVariablesFormUpdate,
  externalVariablesModel,
  externalVariablesStore,
} from './__mocks__/external-variable';
import ExternalVariableTransformerFactory from './external-variable';

describe.skip('Transformation entities - ExternalVariable', () => {
  test('Should produce expected STORE in external variables creation from question FORM', () => {
    const cvTransformer = ExternalVariableTransformerFactory();

    // The id is random in creation, so it's not take it into account for testing.
    const store = cvTransformer.formToStore(externalVariablesFormNew);
    const state = Object.keys(store).map((key) => {
      // eslint-disable-next-line no-unused-vars
      const { id, ...stateItem } = store[key];
      return stateItem;
    });

    const expectedState = Object.keys(externalVariablesStore).map((key) => {
      // eslint-disable-next-line no-unused-vars
      const { id, ...expectedStateItem } = externalVariablesStore[key];
      return expectedStateItem;
    });
    expect(state).toEqual(expectedState);
  });

  test('Should produce expected STORE from questionnaire MODEL', () => {
    const cvTransformer = ExternalVariableTransformerFactory();
    expect(cvTransformer.modelToStore(externalVariablesModel)).toEqual(
      externalVariablesStore,
    );
  });

  test('Should produce expected FORM from questionnaire STORE', () => {
    const cvTransformer = ExternalVariableTransformerFactory({
      initialStore: externalVariablesStore,
    });
    expect(cvTransformer.storeToForm()).toEqual(externalVariablesFormUpdate);
  });

  test('Should produce expected MODEL from questionnaire STORE', () => {
    const cvTransformer = ExternalVariableTransformerFactory({
      initialStore: externalVariablesStore,
    });
    expect(cvTransformer.storeToModel()).toEqual(externalVariablesModel);
  });
});
