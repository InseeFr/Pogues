import actionsHandlers, {
  startLoadingVisualization,
  loadingVisualizationSuccess,
  loadingVisualizationFailure,
} from './app-state';

import {
  START_LOADING_VISUALIZATION,
  LOADING_VISUALIZATION_SUCCESS,
  LOADING_VISUALIZATION_FAILURE,
} from 'actions/app-state';

const state = {
  activeCalculatedVariablesById: {},
  activeCodeListsById: {},
  activeComponentsById: {},
  activeExternalVariablesById: {},
  collectedVariableByQuestion: {},
  errorsByQuestionTab: {},
  invalidItemsByActiveQuestion: {},
};

describe('startLoadingVisualization', () => {
  test('when called directly', () => {
    const result = startLoadingVisualization({
      ...state,
      isLoadingVisualization: false,
    });
    expect(result).toEqual({
      ...state,
      isLoadingVisualization: true,
    });
  });
  [START_LOADING_VISUALIZATION].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        {
          ...state,
          isLoadingVisualization: false,
        },
        {
          type: action,
        },
      );
      expect(result).toEqual({
        ...state,
        isLoadingVisualization: true,
      });
    });
  });
});

describe('loadingVisualizationSuccess', () => {
  test('when called directly', () => {
    const result = loadingVisualizationSuccess({
      ...state,
      isLoadingVisualization: true,
    });
    expect(result).toEqual({
      ...state,
      isLoadingVisualization: false,
    });
  });
  [LOADING_VISUALIZATION_SUCCESS].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        {
          ...state,
          isLoadingVisualization: true,
        },
        {
          type: action,
        },
      );
      expect(result).toEqual({
        ...state,
        isLoadingVisualization: false,
      });
    });
  });
});

describe('loadingVisualizationFailure', () => {
  test('when called directly', () => {
    const result = loadingVisualizationFailure({
      ...state,
      isLoadingVisualization: true,
    });
    expect(result).toEqual({
      ...state,
      isLoadingVisualization: false,
    });
  });
  [LOADING_VISUALIZATION_FAILURE].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        {
          ...state,
          isLoadingVisualization: true,
        },
        {
          type: action,
        },
      );
      expect(result).toEqual({
        ...state,
        isLoadingVisualization: false,
      });
    });
  });
});
