jest.dontMock('./index.jsx');

import React from 'react';
import { shallow } from 'enzyme';

import { PageHome } from './index';
import { getLocale } from 'utils/test/test-utils';

const locale = getLocale();

describe('<PageHome />', () => {
  const props = {
    locale: locale,
    history: {},
  };
  const wrapper = shallow(<PageHome {...props} />);

  test('should render without throwing an error', () => {
    expect(wrapper.is('#page-home')).toBe(true);
  });

  test('should render a "new questionnaire button"', () => {
    expect(wrapper.find('button#questionnaire-new').length).toBe(1);
  });

  test('should render a "show my team questionnaires button"', () => {
    expect(wrapper.find('#questionnaires-team').length).toBe(1);
  });

  test('should render a "show Insee questionnaires button"', () => {
    expect(wrapper.find('#questionnaires-insee').length).toBe(1);
  });
});
