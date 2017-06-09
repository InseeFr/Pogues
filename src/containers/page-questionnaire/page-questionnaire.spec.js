jest.dontMock('./page-questionnaire.jsx');

import React from 'react';
import { shallow } from 'enzyme';

// Not connected to store
import { PageQuestionnaire } from './page-questionnaire';

describe('<PageQuestionnaire />', () => {
  const spy = jest.fn();
  const props = {
    match: { params: { id: 1 } },
    switchToQuestionnaire: spy,
  };

  const wrapper = shallow(<PageQuestionnaire {...props} />);

  test('should render without throwing an error', () => {
    expect(wrapper.is('#page-questionnaire')).toBe(true);
  });

  test('should render <QuestionnaireNav /> component', () => {
    expect(wrapper.find('QuestionnaireNav').length).toBe(1);
  });

  test('should call switchToQuestionnaire in render', () => {
    expect(spy).toBeCalled();
  });
});
