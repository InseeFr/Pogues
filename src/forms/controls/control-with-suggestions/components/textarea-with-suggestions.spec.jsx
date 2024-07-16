import { shallow } from 'enzyme';
import React from 'react';
import { describe, expect, test } from 'vitest';

import { fakeFieldProps } from '../../../../utils/test/test-utils';

import ControlWithSuggestions from './control-with-suggestions';
import TextareaWithSuggestions from './textarea-with-suggestions';

describe('Form controls - TextareaWithSuggestions', () => {
  const props = {
    ...fakeFieldProps,
    input: {
      ...fakeFieldProps.input,
      value: '',
    },
    label: 'Fake label',
  };

  test('Should extends ControlWithSuggestions component', () => {
    const wrapper = shallow(<TextareaWithSuggestions {...props} />);

    expect(wrapper.instance()).toBeInstanceOf(ControlWithSuggestions);
  });
});
