import { shallow } from 'enzyme';
import { describe, expect, test, vi } from 'vitest';

import { WIDGET_LIST_WITH_INPUT_PANEL } from '../../../constants/dom-constants';
import { fakeEvent, noop } from '../../../utils/test/test-utils';
import ListWithInputPanel from './list-with-input-panel';

vi.mock('../../../hooks/useReadonly', () => ({
  useReadonly: vi.fn(),
}));

const {
  BUTTON_SUBMIT_CLASS,
  BUTTON_REMOVE_CLASS,
  BUTTON_DUPLICATE_CLASS,
  BUTTON_RESET_CLASS,
  BUTTON_NEW_CLASS,
} = WIDGET_LIST_WITH_INPUT_PANEL;

describe('<ListWithInputPanel', () => {
  const props = {
    formName: 'FAKE_FORM_NAME',
    selectorPath: 'FAKE_SELECTOR_PATH',
    name: 'FAKE_NAME',
    componentId: 'componentId',
    formValues: {},
    currentValues: {},
    resetObject: {},

    change: noop,
    arrayRemove: noop,
    arrayPush: noop,
    arrayInsert: noop,
    validateForm: noop,
    clearErrors: noop,
    removeIntegrityError: noop,
    clearSubformValidationErrors: noop,
  };

  const FakeInputPanel = () => <div />;
  const buildFakeListWithPanel = (customProps) => {
    return shallow(
      <ListWithInputPanel {...customProps}>
        <FakeInputPanel />
      </ListWithInputPanel>,
    );
  };

  describe('Props and render behaviour', () => {
    test('Should render the children component passed as input panel', () => {
      const wrapper = buildFakeListWithPanel(props);
      expect(wrapper.find(FakeInputPanel)).toHaveLength(1);
    });

    test('Should show the corresponding buttons only if the property associated is true', () => {
      let wrapper;

      const buttons = [
        {
          className: BUTTON_REMOVE_CLASS,
          property: 'canRemove',
        },
        {
          className: BUTTON_DUPLICATE_CLASS,
          property: 'canDuplicate',
        },
        {
          className: BUTTON_NEW_CLASS,
          property: 'canAddNew',
        },
      ];

      buttons.forEach((btn) => {
        wrapper = buildFakeListWithPanel(props);
        expect(wrapper.find(`.${btn.className}`)).toHaveLength(1);
        wrapper = buildFakeListWithPanel({ ...props, [btn.property]: false });
        expect(wrapper.find(`.${btn.className}`)).toHaveLength(0);
      });
    });
  });

  // @TODO: The actions are defined in the state
  describe.skip('Actions', () => {
    test('Should call the corresponding action when click in the associated button', () => {
      let wrapper;
      const buttons = [
        {
          className: BUTTON_SUBMIT_CLASS,
          action: 'submit',
        },
        {
          className: BUTTON_REMOVE_CLASS,
          action: 'remove',
        },
        {
          className: BUTTON_DUPLICATE_CLASS,
          action: 'duplicate',
        },
        {
          className: BUTTON_RESET_CLASS,
          action: 'reset',
        },
        {
          className: BUTTON_NEW_CLASS,
          action: 'reset',
        },
      ];

      buttons.forEach((btn) => {
        const spy = vi.fn();
        wrapper = buildFakeListWithPanel({ ...props, [btn.action]: spy });
        wrapper.find(`.${btn.className}`).simulate('click', fakeEvent);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
