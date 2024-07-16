import { describe, expect, test } from 'vitest';
import { SET_ACTIVE_VARIABLES } from '../../actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from '../../actions/component';
import actionsHandlers, {
  setActiveExternalVariables,
  updateActiveExternalVariables,
} from './active-external-variables-by-id';

describe('setActiveExternalVariables', () => {
  test('when called directly', () => {
    const result = setActiveExternalVariables(
      { state: 'previous' },
      { activeExternalVariablesById: 'activeExternalVariablesById' },
    );
    expect(result).toEqual('activeExternalVariablesById');
  });
  [SET_ACTIVE_VARIABLES].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: {
            activeExternalVariablesById: 'activeExternalVariablesById',
          },
        },
      );
      expect(result).toEqual('activeExternalVariablesById');
    });
  });
});

describe('updateActiveExternalVariables', () => {
  test('when called directly', () => {
    const result = updateActiveExternalVariables(
      { state: 'previous' },
      {
        update: { activeExternalVariablesById: 'activeExternalVariablesById' },
      },
    );
    expect(result).toEqual('activeExternalVariablesById');
  });
  [CREATE_COMPONENT, UPDATE_COMPONENT].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: {
            update: {
              activeExternalVariablesById: 'activeExternalVariablesById',
            },
          },
        },
      );
      expect(result).toEqual('activeExternalVariablesById');
    });
  });
});
