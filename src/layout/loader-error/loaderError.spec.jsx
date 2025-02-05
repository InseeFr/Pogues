import React from 'react';

import { shallow } from 'enzyme';
import { describe, expect, test } from 'vitest';

import LoaderError from './component';

describe('<LoaderError />', () => {
  const wrapperWithoutMessage = shallow(<LoaderError />);
  test('should render without throwing an error', () => {
    expect(wrapperWithoutMessage.is('div')).toBe(true);
    expect(wrapperWithoutMessage.contains(<h4 />)).toBe(true);
  });

  const wrapperWithMessage = shallow(<LoaderError message={'Error message'} />);
  test('should render without throwing an error', () => {
    expect(wrapperWithMessage.is('div')).toBe(true);
    expect(wrapperWithoutMessage.contains(<h4 />)).toBe(true);
    expect(wrapperWithMessage.text()).toBe('Error message');
  });
});
