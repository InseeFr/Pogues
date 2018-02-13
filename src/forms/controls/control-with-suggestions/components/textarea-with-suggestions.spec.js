import React from 'react';
import { shallow } from 'enzyme';

import { fakeFieldProps } from 'utils/test/test-utils';

import TextareaWithSuggestions from './textarea-with-suggestions';
import ControlWithSuggestions from './control-with-suggestions';

describe('Form controls - TextareaWithSuggestions', () => {
  const props = {
    ...fakeFieldProps,
    input: {
      ...fakeFieldProps.input,
      value: ''
    },
    label: 'Fake label'
  };

  test('Should extends ControlWithSuggestions component', () => {
    const wrapper = shallow(<TextareaWithSuggestions {...props} />);

    expect(wrapper.instance()).toBeInstanceOf(ControlWithSuggestions);
  });
});
