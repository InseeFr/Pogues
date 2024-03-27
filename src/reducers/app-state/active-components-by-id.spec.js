import actionsHandlers, {
  setActiveComponents,
  updateActiveComponents,
} from './active-components-by-id';
import {
  CREATE_COMPONENT,
  DUPLICATE_COMPONENT,
  UPDATE_COMPONENT,
  REMOVE_COMPONENT,
  UPDATE_COMPONENT_PARENT,
  UPDATE_COMPONENT_ORDER,
  MOVE_COMPONENT,
} from '../../actions/component';
import { SET_ACTIVE_COMPONENTS } from '../../actions/app-state';

describe('setActiveComponents', () => {
  test('when called directly', () => {
    const result = setActiveComponents(
      { state: 'previous' },
      { activeComponents: 'activeComponents' },
    );
    expect(result).toEqual({ activeComponents: 'activeComponents' });
  });
  [SET_ACTIVE_COMPONENTS, REMOVE_COMPONENT].forEach(action => {
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
  ].forEach(action => {
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
