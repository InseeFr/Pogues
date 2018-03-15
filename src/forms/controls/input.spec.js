import React from 'react';
import { shallow } from 'enzyme';

import Input from './input';

import { fakeFieldProps } from 'utils/test/test-utils';

describe('Form controls - Input', () => {
  let props;

  beforeEach(() => {
    props = {
      ...fakeFieldProps,
      input: {
        ...fakeFieldProps.input,
        value: ''
      },
      label: 'Fake label',
      type: 'text'
    };
  });

  test('Should exists a label element with the label text', () => {
    const wrapper = shallow(<Input {...props} />);

    expect(wrapper.find('label').text()).toBe(props.label);
  });

  test('Should exists a notice dans le label when the field is required', () => {
    props.required = true;
    const wrapper = shallow(<Input {...props} />);

    expect(wrapper.find('label').text()).toBe(`${props.label}*`);
  });

  test('Should exists an error message when the field is touched and an error text is passed', () => {
    props.meta.touched = true;
    props.meta.error = 'Fake error message';
    const wrapper = shallow(<Input {...props} />);

    expect(wrapper.find('.form-error').text()).toBe(props.meta.error);
  });
});
