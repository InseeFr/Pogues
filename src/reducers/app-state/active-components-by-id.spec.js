import reducer from './active-components-by-id';
import {
  CREATE_COMPONENT,
  UPDATE_COMPONENT,
  REMOVE_COMPONENT
} from 'actions/component';
import { SET_ACTIVE_COMPONENTS } from 'actions/app-state';

describe('active-components-by-id reducer', () => {
  test('should handle SET_ACTIVE_COMPONENTS', () => {
    expect(
      reducer([], {
        type: SET_ACTIVE_COMPONENTS,
        payload: {
          SET_ACTIVE_COMPONENTS: true
        }
      })
    ).toEqual({
      SET_ACTIVE_COMPONENTS: true
    });
  });

  test('should handle CREATE_COMPONENT', () => {
    const store = {
      '1': {
        id: '1'
      }
    };
    expect(
      reducer(store, {
        type: CREATE_COMPONENT,
        payload: {
          update: {
            activeComponentsById: {
              '2': {
                id: '2'
              }
            }
          }
        }
      })
    ).toEqual({
      '1': {
        id: '1'
      },
      '2': {
        id: '2'
      }
    });
  });

  test('should handle UPDATE_COMPONENT', () => {
    const store = {
      '1': {
        id: '1'
      },
      '2': {
        id: '2'
      }
    };

    expect(
      reducer(store, {
        type: UPDATE_COMPONENT,
        payload: {
          update: {
            activeComponentsById: {
              '2': {
                id: '2',
                label: 'label2'
              }
            }
          }
        }
      })
    ).toEqual({
      '1': {
        id: '1'
      },
      '2': {
        id: '2',
        label: 'label2'
      }
    });
  });

  test('should handle REMOVE_COMPONENT', () => {
    expect(
      reducer([], {
        type: REMOVE_COMPONENT,
        payload: {
          REMOVE_COMPONENT: true
        }
      })
    ).toEqual({
      REMOVE_COMPONENT: true
    });
  });
});
