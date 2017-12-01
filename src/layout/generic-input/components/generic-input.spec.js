import React from 'react';
import { shallow } from 'enzyme';

import GenericInput from './generic-input';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { GENERIC_INPUT } from 'constants/dom-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;
const { COMPONENT_ID } = GENERIC_INPUT;

describe('<GenericInput />', () => {
  const spy = jest.fn();
  const props = {
    placeholders: {},
    saveActiveQuestionnaire: spy,
    isQuestionnaireValid: true,
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

  test.skip('should render without throw an error', () => {
    const wrapper = shallow(<GenericInput {...props} />);
    expect(wrapper.is(`#${COMPONENT_ID}`)).toBe(true);
  });

  // @TODO: Fix this test
  test.skip('should render enabled the "Question" button only when the prop "newQuestionPlaceholder" is defined', () => {
    props.placeholders[QUESTION] = notEmptyPlaceholder;
    const wrapperWithQuestionPlaceholder = shallow(<GenericInput {...props} />);
    expect(wrapperWithQuestionPlaceholder.find('#add-question[disabled]').exists()).toBe(false);
  });
});
