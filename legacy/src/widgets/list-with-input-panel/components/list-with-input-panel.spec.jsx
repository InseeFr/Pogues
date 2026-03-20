import { shallow } from 'enzyme';
import { describe, expect, test, vi } from 'vitest';

import { fakeEvent, noop } from '../../../utils/test/test-utils';
import ListWithInputPanel from './list-with-input-panel';

vi.mock('../../../hooks/useReadonly', () => ({
  useReadonly: vi.fn(),
}));

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
          className: 'widget-list-with-input-panel__remove',
          property: 'canRemove',
        },
        {
          className: 'widget-list-with-input-panel__duplicate',
          property: 'canDuplicate',
        },
        {
          className: 'widget-list-with-input-panel__new',
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
          className: 'widget-list-with-input-panel__submit',
          action: 'submit',
        },
        {
          className: 'widget-list-with-input-panel__remove',
          action: 'remove',
        },
        {
          className: 'widget-list-with-input-panel__duplicate',
          action: 'duplicate',
        },
        {
          className: 'widget-list-with-input-panel__reset',
          action: 'reset',
        },
        {
          className: 'widget-list-with-input-panel__new',
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
