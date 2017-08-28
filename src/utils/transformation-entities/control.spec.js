jest.dontMock('./control.js');

import ControlTransformerFactory from './control';
import { controlsFormNew, controlsFormUpdate, controlsState, controlsModel } from './__mocks__/control';

describe('Transformation entities - Control', () => {
  test('Should produce expected STATE in controls creation from FORM', () => {
    const controlTransformer = ControlTransformerFactory();

    // The id is random in creation, so it's not take it into account for testing.
    const state = controlTransformer.formToState(controlsFormNew);
    const currentState = Object.keys(state).map(key => {
      const { id, ...stateItem } = state[key];
      return stateItem;
    });

    const expectedState = Object.keys(controlsState).map(key => {
      const { id, ...expectedStateItem } = controlsState[key];
      return expectedStateItem;
    });
    expect(currentState).toEqual(expectedState);
  });

  test('Should produce expected STATE from questionnaire MODEL', () => {
    const controlTransformer = ControlTransformerFactory();
    expect(controlTransformer.modelToState(controlsModel)).toEqual(controlsState);
  });

  test('Should produce expected FORM from questionnaire STATE', () => {
    const controlTransformer = ControlTransformerFactory({
      initialState: controlsState,
    });
    expect(controlTransformer.stateToForm()).toEqual(controlsFormUpdate);
  });

  test('Should produce expected MODEL from questionnaire STATE', () => {
    const controlTransformer = ControlTransformerFactory({ initialState: controlsState });
    expect(controlTransformer.stateToModel()).toEqual(controlsModel);
  });
});
