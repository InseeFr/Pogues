import { describe, expect, test } from 'vitest';
import { SET_ACTIVE_VARIABLES } from '../../actions/app-state';
import {
  CREATE_COMPONENT,
  DUPLICATE_COMPONENT,
  UPDATE_COMPONENT,
} from '../../actions/component';
import actionsHandlers, {
  setActiveCollectedVariables,
  updateActiveCollectedVariables,
} from './collected-variable-by-question';

describe('setActiveCollectedVariables', () => {
  test('when called directly', () => {
    const result = setActiveCollectedVariables(
      { state: 'previous' },
      { collectedVariableByQuestion: 'collectedVariableByQuestion' },
    );
    expect(result).toEqual('collectedVariableByQuestion');
  });
  [SET_ACTIVE_VARIABLES].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: {
            collectedVariableByQuestion: 'collectedVariableByQuestion',
          },
        },
      );
      expect(result).toEqual('collectedVariableByQuestion');
    });
  });
});

describe('updateActiveCollectedVariables', () => {
  test('when called directly', () => {
    const result = updateActiveCollectedVariables(
      { state: 'previous' },
      {
        update: {
          activeCollectedVariablesById: {
            activeCollectedVariablesById: 'activeCollectedVariablesById',
          },
        },
      },
    );
    expect(result).toEqual({
      state: 'previous',
      activeCollectedVariablesById: 'activeCollectedVariablesById',
    });
  });
  [UPDATE_COMPONENT, CREATE_COMPONENT, DUPLICATE_COMPONENT].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: {
            update: {
              activeCollectedVariablesById: {
                activeCollectedVariablesById: 'activeCollectedVariablesById',
              },
            },
          },
        },
      );
      expect(result).toEqual({
        state: 'previous',
        activeCollectedVariablesById: 'activeCollectedVariablesById',
      });
    });
  });
});
