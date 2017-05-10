jest.dontMock('./app');

import React from 'react';
import { shallow } from 'enzyme';

import App from './app';

describe('<App />', () => {
  const wrapper = shallow(<App />);

  test('should render without throwing an error', () => {
    expect(wrapper.is('#app')).toBe(true);
  });

  test('should render <Header /> component', () => {
    expect(wrapper.find('Header').length).toBe(1);
  });
  //
  // test('should render <HomePage /> component', () => {
  //   expect(wrapper.find('HomePage').length).toBe(1)
  // })

  // test('should render <Footer /> component', () => {
  //   expect(wrapper.find('Footer').length).toBe(1);
  // });
});
