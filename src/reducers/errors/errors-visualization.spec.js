import actionsHandlers, {
  addVisualizationError,
  removeVisualizationError,
} from './errors-visualization';

import {
  ADD_VISUALIZATION_ERROR,
  REMOVE_VISUALIZATION_ERROR,
} from 'actions/errors';

describe('addVisualizationError', () => {
  test('when called directly', () => {
    const result = addVisualizationError({
      showErrorVisualizationPopup: false,
    });
    expect(result).toEqual({
      showErrorVisualizationPopup: true,
    });
  });
  [ADD_VISUALIZATION_ERROR].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        {
          showErrorVisualizationPopup: false,
        },
        {
          type: action,
        },
      );
      expect(result).toEqual({
        showErrorVisualizationPopup: true,
      });
    });
  });
});

describe('removeVisualizationError', () => {
  test('when called directly', () => {
    const result = removeVisualizationError({
      showErrorVisualizationPopup: true,
    });
    expect(result).toEqual({
      showErrorVisualizationPopup: false,
    });
  });
  [REMOVE_VISUALIZATION_ERROR].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        {
          showErrorVisualizationPopup: true,
        },
        {
          type: action,
        },
      );
      expect(result).toEqual({
        showErrorVisualizationPopup: false,
      });
    });
  });
});
