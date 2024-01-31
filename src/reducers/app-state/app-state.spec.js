import actionsHandlers, {
  startLoadingVisualization,
  endLoadingVisualization,
} from './app-state';

import {
  START_LOADING_VISUALIZATION,
  END_LOADING_VISUALIZATION,
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

describe('endLoadingVisualization', () => {
  test('when called directly', () => {
    const result = endLoadingVisualization({
      ...state,
      isLoadingVisualization: true,
    });
    expect(result).toEqual({
      ...state,
      isLoadingVisualization: false,
    });
  });
  [END_LOADING_VISUALIZATION].forEach(action => {
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
