import React from 'react';
import { shallow } from 'enzyme';

import ListWithInputPanelItem from './list-with-input-panel-item';

import { LIST_WITH_INPUT_PANEL_WIDGET } from 'constants/dom-constants';

const { ITEM_INVALID_CLASS } = LIST_WITH_INPUT_PANEL_WIDGET;

describe('<ListWithInputPanelItem', () => {
  const fakeString = 'This is a fake string';
  test('Should render the contained string', () => {
    const wrapper = shallow(<ListWithInputPanelItem>{fakeString}</ListWithInputPanelItem>);
    expect(wrapper.contains(fakeString)).toBeTruthy();
  });

  test('Should show the "Invalid item style" only in the case is not a valid item', () => {
    let wrapper = shallow(<ListWithInputPanelItem>{fakeString}</ListWithInputPanelItem>);
    expect(wrapper.hasClass(ITEM_INVALID_CLASS)).toBeFalsy();

    wrapper = shallow(<ListWithInputPanelItem invalid>{fakeString}</ListWithInputPanelItem>);
    expect(wrapper.hasClass(ITEM_INVALID_CLASS)).toBeTruthy();
  });
});
