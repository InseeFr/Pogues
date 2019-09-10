import actionsHandlers, {
  setActiveCalculatedVariables,
  updateActiveCalculatedVariables,
} from './active-calculated-variables-by-id';
import { SET_ACTIVE_VARIABLES } from 'actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from 'actions/component';

describe('setActiveCalculatedVariables', () => {
  test('when called directly', () => {
    const result = setActiveCalculatedVariables(
      { state: 'previous' },
      { activeCalculatedVariablesById: 'activeCalculatedVariablesById' },
    );
    expect(result).toEqual('activeCalculatedVariablesById');
  });
  test('when called when we trigger SET_ACTIVE_VARIABLES', () => {
    const result = actionsHandlers(
      { state: 'previous' },
      {
        type: SET_ACTIVE_VARIABLES,
        payload: {
          activeCalculatedVariablesById: 'activeCalculatedVariablesById',
        },
      },
    );
    expect(result).toEqual('activeCalculatedVariablesById');
  });
});

describe('setActiveCalculatedVariables', () => {
  test('when called directly', () => {
    const result = updateActiveCalculatedVariables(
      { state: 'previous' },
      {
        update: {
          activeCalculatedVariablesById: 'activeCalculatedVariablesById',
        },
      },
    );
    expect(result).toEqual('activeCalculatedVariablesById');
  });
  [CREATE_COMPONENT, UPDATE_COMPONENT].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: {
            update: {
              activeCalculatedVariablesById: 'activeCalculatedVariablesById',
            },
          },
        },
      );
      expect(result).toEqual('activeCalculatedVariablesById');
    });
  });
});
