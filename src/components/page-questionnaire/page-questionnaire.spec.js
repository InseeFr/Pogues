jest.dontMock('./index.jsx');

import React from 'react';
import { shallow } from 'enzyme';

import PageQuestionnaire from './index';

describe('<PageQuestionnaire />', () => {
  const wrapper = shallow(<PageQuestionnaire />);

  test('should render without throwing an error', () => {
    expect(wrapper.is('#page-questionnaire')).toBe(true);
  });

  // test('should render <Questionnaire /> component', () => {
  //   expect(wrapper.find('Questionnaire').length).toBe(1);
  // });
  //
  // test('should render <QuestionnaireNav /> component', () => {
  //   expect(wrapper.find('QuestionnaireNav').length).toBe(1);
  // });
});
