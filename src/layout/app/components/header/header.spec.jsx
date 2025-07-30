import { shallow } from 'enzyme';
import { describe, expect, test } from 'vitest';

import Header from './header';

describe.skip('<Header />', () => {
  const wrapper = shallow(<Header />);
  test('should render without throwing an error', () => {
    expect(wrapper.is('#header')).toBe(true);
  });
  test('should render a link to homepage', () => {
    expect(wrapper.find('Link[to="/"]').length).toBe(1);
  });
  test('should render a link to the help page', () => {
    expect(wrapper.find('a').length).toBe(2);
  });
  test('should render a <UserConnection /> component', () => {
    expect(wrapper.find('Connect(UserConnection)').length).toBe(1);
  });
});
