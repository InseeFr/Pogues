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
    const result = addVisualizationError(
      {
        showErrorVisualizationPopup: '',
      },
      {
        error: {
          message: 'visualisation error message',
        },
      },
    );
    expect(result).toEqual({
      showErrorVisualizationPopup: 'visualisation error message',
    });
  });
  [ADD_VISUALIZATION_ERROR].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        {
          showErrorVisualizationPopup: '',
        },
        {
          type: action,
          payload: {
            error: {
              message: 'handler visualisation error message',
            },
          },
        },
      );
      expect(result).toEqual({
        showErrorVisualizationPopup: 'handler visualisation error message',
      });
    });
  });
});

describe('removeVisualizationError', () => {
  test('when called directly', () => {
    const result = removeVisualizationError({
      showErrorVisualizationPopup:
        'il y a quelque chose de pourri au royaume de Danemark',
    });
    expect(result).toEqual({
      showErrorVisualizationPopup: '',
    });
  });
  [REMOVE_VISUALIZATION_ERROR].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        {
          showErrorVisualizationPopup:
            'il y a quelque chose de pourri au royaume de Danemark',
        },
        {
          type: action,
        },
      );
      expect(result).toEqual({
        showErrorVisualizationPopup: '',
      });
    });
  });
});
