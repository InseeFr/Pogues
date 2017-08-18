import { createActionHandlers } from './actions-handlers';

describe('createActionHandlers', () => {
  const defaultState = {
    '1': {
      id: '1',
    },
  };
  test('should return the default state if the action is undefined', () => {
    expect(createActionHandlers({})(defaultState)).toEqual(defaultState);
  });

  test('should return the default state if the action does not exist', () => {
    expect(createActionHandlers({})(defaultState, 'ACTION')).toEqual(defaultState);
  });

  test('should return the default state if the action does not exist', () => {
    const payloadSample = {
      '2': {
        id: '2',
      },
    };
    function reducer(state, payload, action) {
      expect(state).toEqual(defaultState);
      expect(payload).toEqual(payloadSample);
      expect(action).toEqual({
        type: 'ACTION',
        payload: payloadSample,
      });
      return { reducer: true };
    }
    const result = createActionHandlers({ ACTION: reducer })(defaultState, {
      type: 'ACTION',
      payload: payloadSample,
    });
    expect(result).toEqual({ reducer: true });
  });
});
