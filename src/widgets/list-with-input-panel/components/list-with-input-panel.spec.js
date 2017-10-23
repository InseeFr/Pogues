import React from 'react';
import { shallow } from 'enzyme';

import ListWithInputPanel from './list-with-input-panel';

import { WIDGET_LIST_WITH_INPUT_PANEL } from 'constants/dom-constants';
import { fakeEvent, noop } from 'utils/test/test-utils';

const {
  BUTTON_SUBMIT_CLASS,
  BUTTON_REMOVE_CLASS,
  BUTTON_DUPLICATE_CLASS,
  BUTTON_RESET_CLASS,
  BUTTON_NEW_CLASS,
} = WIDGET_LIST_WITH_INPUT_PANEL;

describe('<ListWithInputPanel', () => {
  const props = {
    name: 'FAKE_NAME',
    canSubmit: true,
    canRemove: true,
    edit: false,
    submit: noop,
    remove: noop,
    duplicate: noop,
    reset: noop,
  };
  const FakeInputPanel = () => <div />;
  const buildFakeListWithPanel = customProps => {
    return shallow(
      <ListWithInputPanel {...customProps}>
        <FakeInputPanel />
      </ListWithInputPanel>
    );
  };

  describe('Props and render behaviour', () => {
    test('Should render the children component passed as input panel', () => {
      const wrapper = buildFakeListWithPanel(props);
      expect(wrapper.find(FakeInputPanel)).toHaveLength(1);
    });

    test('Should exist a field with name "ref"', () => {
      const wrapper = buildFakeListWithPanel(props);
      expect(wrapper.find('Field[name="ref"]')).toHaveLength(1);
    });

    test('Should show the corresponding buttons only if the property associated is true', () => {
      let wrapper;

      const buttons = [
        {
          className: BUTTON_SUBMIT_CLASS,
          property: 'canSubmit',
        },
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
          property: 'canSubmit',
        },
      ];

      buttons.forEach(btn => {
        wrapper = buildFakeListWithPanel(props);
        expect(wrapper.find(`.${btn.className}`)).toHaveLength(1);
        wrapper = buildFakeListWithPanel({ ...props, [btn.property]: false });
        expect(wrapper.find(`.${btn.className}`)).toHaveLength(0);
      });
    });

    test('Should disable de Remove button and the Duplicate button only if the "edit" property is false', () => {
      let wrapper = buildFakeListWithPanel(props);
      expect(wrapper.find(`.${BUTTON_REMOVE_CLASS}`).prop('disabled')).toBeTruthy();
      expect(wrapper.find(`.${BUTTON_DUPLICATE_CLASS}`).prop('disabled')).toBeTruthy();

      wrapper = buildFakeListWithPanel({ ...props, edit: true });
      expect(wrapper.find(`.${BUTTON_REMOVE_CLASS}`).prop('disabled')).toBeFalsy();
      expect(wrapper.find(`.${BUTTON_DUPLICATE_CLASS}`).prop('disabled')).toBeFalsy();
    });
  });

  describe('Actions', () => {
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

      buttons.forEach(btn => {
        const spy = jest.fn();
        wrapper = buildFakeListWithPanel({ ...props, [btn.action]: spy });
        wrapper.find(`.${btn.className}`).simulate('click', fakeEvent);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
