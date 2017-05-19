jest.dontMock('./header');

import React from 'react';
import { shallow } from 'enzyme';
import Header from './header';

describe('<Header />', () => {
  const wrapper = shallow(<Header />);

  test('should render without throwing an error', () => {
    expect(wrapper.is('#header')).toBe(true);
  });

  test('should render a link to homepage', () => {
    expect(wrapper.find('Link[to="/"]').length).toBe(1);
  });

  // @TODO: wireframe needed (Maybe it's a new page, maybe une pop-up)
  test('should render a link to the help page', () => {
    expect(wrapper.find('Link[to="/help"]').length).toBe(1);
  });

  test('should render a <UserConnection />', () => {
    expect(wrapper.find('UserConnection').length).toBe(1);
  });
});
