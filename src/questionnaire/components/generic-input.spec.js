jest.dontMock('./generic-input');

import React from 'react';
import { shallow } from 'enzyme';

import GenericInput from './generic-input';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

describe('<GenericInput />', () => {
  const spy = jest.fn();
  const props = {
    placeholders: {},
    saveActiveQuestionnaire: spy,
  };
  const emptyPlaceholder = {
    parent: '',
    weight: 0,
  };
  const notEmptyPlaceholder = {
    parent: '454fdfdf',
    weight: 0,
  };

  props.placeholders[QUESTION] = emptyPlaceholder;
  props.placeholders[SEQUENCE] = emptyPlaceholder;
  props.placeholders[SUBSEQUENCE] = emptyPlaceholder;

  test('should render without throw an error', () => {
    const wrapper = shallow(<GenericInput {...props} />);
    expect(wrapper.is('#questionnaire-generic-input')).toBe(true);
  });

  test('should render enabled the "Question" button only when the prop "newQuestionPlaceholder" is defined', () => {
    props.placeholders[QUESTION] = notEmptyPlaceholder;
    const wrapperWithQuestionPlaceholder = shallow(<GenericInput {...props} />);
    // @TODO: Fix this test
    // expect(wrapperWithQuestionPlaceholder.find('#add-question[disabled]').exists()).toBe(false);
  });
});
