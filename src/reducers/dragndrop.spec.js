import reducer from './dragndrop';
import { DRAGGED_COMPONENT } from 'actions/dragndrop';

describe('dragndrop reducer', () => {
  test('should handle DRAGGED_COMPONENT', () => {
    expect(
      reducer([], {
        type: DRAGGED_COMPONENT,
        payload: {
          DRAGGED_COMPONENT: true,
        },
      })
    ).toEqual({
      DRAGGED_COMPONENT: true,
    });
  });
})