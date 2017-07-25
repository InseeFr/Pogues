import { DRAGGED_COMPONENT, setPlaceholder } from './dragndrop';

describe('setPlaceholder', () => {
  test('should trigger DRAGGED_COMPONENT action with the payload', () => {
    const payload = {
      DRAGGED_COMPONENT,
    };
    function dispatch(action) {
      expect(action.type).toEqual(DRAGGED_COMPONENT);
      expect(action.payload).toEqual(payload);
    }
    const fn = setPlaceholder(payload);
    fn(dispatch);
  });
});
