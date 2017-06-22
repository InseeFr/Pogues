jest.dontMock('./questionnaire-list.jsx');

import React from 'react';
import { shallow } from 'enzyme';

import { QuestionnaireListContainer } from './questionnaire-list';

describe('<QuestionnaireListContainer />', () => {
  test('should call loadQuestionnaireList and loadCodeListSpecs', () => {
    const mockLoadQuestionnaireList = jest.fn(() => false);
    shallow(
      <QuestionnaireListContainer
        loadQuestionnaireList={mockLoadQuestionnaireList}
      />
    );

    expect(mockLoadQuestionnaireList).toBeCalled();
  });
});

describe('<QuestionnaireDetailContainer />', () => {
  test('should render a spinner if the questionnaire is loading');
});
