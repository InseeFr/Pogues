import { describe, expect, test } from 'vitest';

import { SET_ACTIVE_COMPONENTS } from '../../actions/app-state';
import {
  CREATE_COMPONENT,
  DUPLICATE_COMPONENT,
  MOVE_COMPONENT,
  REMOVE_COMPONENT,
  UPDATE_COMPONENT,
  UPDATE_COMPONENT_ORDER,
  UPDATE_COMPONENT_PARENT,
} from '../../actions/component';
import actionsHandlers, {
  setActiveComponents,
  updateActiveComponents,
} from './active-components-by-id';

describe('setActiveComponents', () => {
  test('when called directly', () => {
    const result = setActiveComponents(
      { state: 'previous' },
      { activeComponents: 'activeComponents' },
    );
    expect(result).toEqual({ activeComponents: 'activeComponents' });
  });
  [SET_ACTIVE_COMPONENTS, REMOVE_COMPONENT].forEach((action) => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: { activeComponents: 'activeComponents' },
        },
      );
      expect(result).toEqual({ activeComponents: 'activeComponents' });
    });
  });
});

describe('updateActiveComponents', () => {
  test('when called directly', () => {
    const result = updateActiveComponents(
      { state: 'previous' },
      {
        update: {
          activeComponentsById: { activeComponents: 'activeComponents' },
        },
      },
    );
    expect(result).toEqual({
      state: 'previous',
      activeComponents: 'activeComponents',
    });
  });
  [
    CREATE_COMPONENT,
    DUPLICATE_COMPONENT,
    UPDATE_COMPONENT,
    UPDATE_COMPONENT_ORDER,
    UPDATE_COMPONENT_PARENT,
    MOVE_COMPONENT,
  ].forEach((action) => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: {
            update: {
              activeComponentsById: { activeComponents: 'activeComponents' },
            },
          },
        },
      );
      expect(result).toEqual({
        state: 'previous',
        activeComponents: 'activeComponents',
      });
    });
  });
});
