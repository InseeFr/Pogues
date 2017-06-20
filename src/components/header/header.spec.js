jest.dontMock('./header');

import React from 'react';
import { shallow } from 'enzyme';
import Header from './header';
import { getLocale } from 'utils/test/test-utils';

const locale = getLocale();

describe('<Header />', () => {
  const wrapper = shallow(<Header locale={locale} />);

  test('should render without throwing an error', () => {
    expect(wrapper.is('#header')).toBe(true);
  });

  test('should render a link to homepage', () => {
    expect(wrapper.find('Link[to="/"]').length).toBe(1);
  });

  // @TODO: wireframe needed (Maybe it's a new page, maybe a pop-up)
  test('should render a link to the help page', () => {
    expect(wrapper.find('Link[to="/help"]').length).toBe(1);
  });

  test('should render a <UserConnection /> component', () => {
    expect(wrapper.find('UserConnection').length).toBe(1);
  });
});
