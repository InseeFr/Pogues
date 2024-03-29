import { vi } from 'vitest';

vi.mock('../../../utils/dictionary/dictionary', () => ({
  default: {
    no_FAKE_NAME: 'This is a no items message fake',
  },
}));

import React from 'react';
import { shallow } from 'enzyme';

import ListWithInputPanelList from './list-with-input-panel-list';
import ListWithInputPanelItem from './list-with-input-panel-item';

import { getFakeFields } from '../utils/test-utils';
import { noop } from '../../../utils/test/test-utils';
import { WIDGET_LIST_WITH_INPUT_PANEL } from '../../../constants/dom-constants';

const { LIST_EMPTY_CLASS } = WIDGET_LIST_WITH_INPUT_PANEL;

describe('<ListWithInputPanelList', () => {
  let props;
  const items = [
    {
      id: 'FAKE_ITEM_0',
      label: 'Fake label 0',
    },
    {
      id: 'FAKE_ITEM_1',
      label: 'Fake label 1',
    },
    {
      id: 'FAKE_ITEM_2',
      label: 'Fake label 2',
    },
  ];

  beforeEach(() => {
    props = {
      fields: getFakeFields(items, 'FAKE_NAME'),
      select: noop,
      dictionaryNoItems: '',
    };
  });

  test('Should render all the elements existing in the "fields" property', () => {
    const wrapper = shallow(<ListWithInputPanelList {...props} />);

    expect(wrapper.find(ListWithInputPanelItem)).toHaveLength(3);
  });

  test('Should render an one item list with the corresponding message when the list of fields is empty', () => {
    const messageNoItems = 'This is a no items message fake';
    props.fields = getFakeFields([], 'FAKE_NAME');
    props.dictionaryNoItems = 'fakeNoItems';
    const wrapper = shallow(<ListWithInputPanelList {...props} />);

    expect(wrapper.find(ListWithInputPanelItem)).toHaveLength(0);
    expect(wrapper.find(`.${LIST_EMPTY_CLASS}`)).toHaveLength(1);
    expect(wrapper.find(`.${LIST_EMPTY_CLASS}`).text()).toBe(messageNoItems);
  });
});
