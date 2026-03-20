import { shallow } from 'enzyme';
import { describe, expect, test, vi } from 'vitest';

import { fakeEvent, noop } from '../../../utils/test/test-utils';
import ListWithInputPanelItem from './list-with-input-panel-item';

describe('<ListWithInputPanelItem', () => {
  const fakeString = 'This is a fake string';

  test('Should render the contained string', () => {
    const wrapper = shallow(
      <ListWithInputPanelItem select={noop}>
        {fakeString}
      </ListWithInputPanelItem>,
    );
    expect(wrapper.contains(fakeString)).toBeTruthy();
  });

  test('Should show the "Invalid item style" only in the case is not a valid item', () => {
    let wrapper = shallow(
      <ListWithInputPanelItem select={noop}>
        {fakeString}
      </ListWithInputPanelItem>,
    );
    expect(
      wrapper.hasClass('widget-list-with-input-panel__item-invalid'),
    ).toBeFalsy();

    wrapper = shallow(
      <ListWithInputPanelItem select={noop} invalid>
        {fakeString}
      </ListWithInputPanelItem>,
    );
    expect(
      wrapper.hasClass('widget-list-with-input-panel__item-invalid'),
    ).toBeTruthy();
  });

  test('Should call the "select" action when the item button is clicked', () => {
    const spySelect = vi.fn();
    const wrapper = shallow(
      <ListWithInputPanelItem select={spySelect}>
        {fakeString}
      </ListWithInputPanelItem>,
    );

    wrapper.find('button').simulate('click', fakeEvent);

    expect(spySelect).toHaveBeenCalled();
  });
});
