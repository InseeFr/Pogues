jest.dontMock('./homepage');

import React from 'react';
import { shallow } from 'enzyme';

import HomePage from './homepage';

describe('<HomePage />', () => {
  const wrapper = shallow(<HomePage />);

  test('should render without throwing an error', () => {
    expect(wrapper.is('#homepage')).toBe(true);
  });

  test('should render <QuestionnaireList /> component', () => {
    expect(wrapper.find('QuestionnaireList').length).toBe(1);
  });

  test('should render a "new questionnaire button"', () => {
    expect(wrapper.find('button#questionnaire-new').length).toBe(1);
  });

  test('should render a "show my team questionnaires button"', () => {
    expect(wrapper.find('button#questionnaires-team').length).toBe(1);
  });

  test('should render a "show Insee questionnaires button"', () => {
    expect(wrapper.find('button#questionnaires-insee').length).toBe(1);
  });
});
