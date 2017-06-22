jest.dontMock('./questionnaire-list.jsx');

import React from 'react';
import { shallow } from 'enzyme';

import { QuestionnaireListContainer } from './questionnaire-list';

describe('<QuestionnaireListContainer />', () => {
  test('should call loadQuestionnaireList and loadCodeListSpecs', () => {
    const mockLoadQuestionnaireList = jest.fn();
    const mockLoadCodeListSpecs = jest.fn();
    shallow(
      <QuestionnaireListContainer
        loadQuestionnaireList={mockLoadQuestionnaireList}
        loadCodeListSpecs={mockLoadCodeListSpecs}
      />
    );

    expect(mockLoadQuestionnaireList).toHaveBeenCalled();
    expect(mockLoadCodeListSpecs).toHaveBeenCalled();
  });
});

describe('<QuestionnaireDetailContainer />', () => {
  test('should render a spinner if the questionnaire is loading');
});
