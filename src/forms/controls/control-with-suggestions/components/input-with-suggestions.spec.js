import React from 'react';
import { shallow } from 'enzyme';

import { fakeFieldProps } from 'utils/test/test-utils';

import InputWithSuggestions from './input-with-suggestions';
import ControlWithSuggestions from './control-with-suggestions';

describe('Form controls - InputWithSuggestions', () => {
  const props = {
    ...fakeFieldProps,
    input: {
      ...fakeFieldProps.input,
      value: '',
    },
    label: 'Fake label',
  };

  test('Should extends ControlWithSuggestions component', () => {
    const wrapper = shallow(<InputWithSuggestions {...props} />);

    expect(wrapper.instance()).toBeInstanceOf(ControlWithSuggestions);
  });
});
