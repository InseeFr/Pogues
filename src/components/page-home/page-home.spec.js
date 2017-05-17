jest.dontMock('./index.jsx');

import React from 'react';
import { shallow } from 'enzyme';

import { PageHome } from './index';

describe.skip('<PageHome />', () => {
  const wrapper = shallow(<PageHome />);

  test('should render without throwing an error', () => {
    expect(wrapper.is('#page-home')).toBe(true);
  });

  // @TODO: Find the way to test if the plain component is presented. Avoid the
  // testing for the connected component.
  test.skip('should render <QuestionnaireListContainer /> component', () => {
    expect(wrapper.find('QuestionnaireListContainer').length).toBe(1);
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
