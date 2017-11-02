import React from 'react';
import { shallow } from 'enzyme';

import CodesListPanelSelector from './codes-lists-panel-selector';

import { WIDGET_CODES_LISTS } from 'constants/dom-constants';
import { fakeEvent, noop } from 'utils/test/test-utils';

const { PANEL_SELECTOR_OPTION_CLASS } = WIDGET_CODES_LISTS;

describe('<CodesListPanelSelector />', () => {
  let wrapper;
  const customOptions = [
    {
      label: 'Fake option 01',
      value: 'FAKE_VALUE_01',
    },
    {
      label: 'Fake option 02',
      value: 'FAKE_VALUE_02',
    },
    {
      label: 'Fake option 03',
      value: 'FAKE_VALUE_03',
    },
  ];
  const customName = 'this.is.a.custom.name';

  beforeEach(() => {
    wrapper = shallow(<CodesListPanelSelector options={customOptions} name={customName} changeToPanel={noop} />);
  });

  test('Should render as many radios as options received with the corresponding text and value', () => {
    expect(wrapper.find('input[type="radio"]')).toHaveLength(customOptions.length);
    customOptions.forEach((o, index) => {
      expect(
        wrapper
          .find(`.${PANEL_SELECTOR_OPTION_CLASS}`)
          .at(index)
          .text()
      ).toBe(o.label);
      expect(
        wrapper
          .find('input[type="radio"]')
          .at(index)
          .prop('value')
      ).toBe(o.value);
    });
  });

  test('Should render as many radios as options with the same name like the prop "name"', () => {
    customOptions.forEach((o, index) => {
      expect(
        wrapper
          .find('input[type="radio"]')
          .at(index)
          .prop('name')
      ).toBe(customName);
    });
  });

  test.skip('Should set as checked the corresponding radio if the prop "selectedOption" option is passed', () => {
    const customSelectedOption = customOptions[2].value;
    wrapper = shallow(
      <CodesListPanelSelector
        options={customOptions}
        name={customName}
        changeToPanel={noop}
        selectedOption={customSelectedOption}
      />
    );

    expect(wrapper.find('input[type="radio"][checked="checked"]')).toHaveLength(1);
    expect(wrapper.find('input[type="radio"][checked="checked"]').prop('value')).toBe(customSelectedOption);
  });

  test.skip('Should set as checked the first radio if the prop "selectedOption" is not passed', () => {
    expect(wrapper.find('input[type="radio"][checked="checked"]')).toHaveLength(1);
    expect(wrapper.find('input[type="radio"][checked="checked"]').prop('value')).toBe(customOptions[0].value);
  });

  test('Should call changePanel with the corresponding radio value if a radio is clicked', () => {
    const spyChangeToPanel = jest.fn();

    wrapper = shallow(
      <CodesListPanelSelector options={customOptions} name={customName} changeToPanel={spyChangeToPanel} />
    );

    wrapper
      .find('input[type="radio"]')
      .at(1)
      .simulate('click', fakeEvent);

    expect(spyChangeToPanel).toHaveBeenCalledWith(customOptions[1].value);
  });
});
