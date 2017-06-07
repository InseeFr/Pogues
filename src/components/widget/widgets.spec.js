jest.dontMock('./tabs');

import React from 'react';
import { shallow } from 'enzyme';
import Tabs from './tabs';

describe('<Tabs />', () => {
  function MockComponent({ id }) {
    return <div id={id} />;
  }

  const mockComponents = [
    {
      label: 'First component',
      content: <MockComponent id="first-component" />,
    },
    {
      label: 'Second component',
      content: <MockComponent id="second-component" />,
    },
    {
      label: 'Third component',
      content: <MockComponent id="third-component" />,
    },
  ];

  const wrapper = shallow(<Tabs components={mockComponents} />);

  test('should render as many tabs as components passed', () => {
    expect(wrapper.find('.nav-item').length).toBe(mockComponents.length);
  });

  test('should set as active only the first tab after initialization', () => {
    expect(wrapper.find('.nav-link').at(0).is('.active')).toBe(true);
    expect(wrapper.find('.nav-link').at(1).is('.active')).toBe(false);
    expect(wrapper.find('.nav-link').at(2).is('.active')).toBe(false);
  });

  test('should set as active only the first tab content after initialization', () => {
    expect(wrapper.find('.nav-content').at(0).is('.active')).toBe(true);
    expect(wrapper.find('.nav-content').at(1).is('.active')).toBe(false);
    expect(wrapper.find('.nav-content').at(2).is('.active')).toBe(false);
  });
});
