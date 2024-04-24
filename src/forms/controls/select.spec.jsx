import { shallow } from 'enzyme';
import React from 'react';
import { describe, expect, test } from 'vitest';

import GenericOption from './generic-option';
import Select from './select';

import { fakeFieldProps } from '../../utils/test/test-utils';

describe('Form controls - Select', () => {
  const props = {
    ...fakeFieldProps,
    input: {
      ...fakeFieldProps.input,
      value: '',
    },
    label: 'Fake label',
  };

  let wrapper = shallow(
    <Select {...props}>
      <GenericOption value="fakeValue1">Fake label 1</GenericOption>
      <GenericOption value="fakeValue2">Fake label 2</GenericOption>
    </Select>,
  );

  test('Should render as many options as GenericOptios passed', () => {
    expect(wrapper.find('option')).toHaveLength(2);
  });

  test('Should exists a label element with the label text only when this prop is passed', () => {
    expect(wrapper.find('label').text()).toBe(props.label);
  });

  test('Should exists a notice dans le label when the field is required', () => {
    props.required = true;
    wrapper = shallow(
      <Select {...props}>
        <GenericOption value="fakeValue1">Fake label 1</GenericOption>
        <GenericOption value="fakeValue2">Fake label 2</GenericOption>
      </Select>,
    );
    expect(wrapper.find('label').text()).toBe(`${props.label}*`);
  });

  test('Should exists an error message when the field is touched and an error text is passed', () => {
    props.meta.touched = true;
    props.meta.error = 'Fake error message';
    wrapper = shallow(
      <Select {...props}>
        <GenericOption value="fakeValue1">Fake label 1</GenericOption>
        <GenericOption value="fakeValue2">Fake label 2</GenericOption>
      </Select>,
    );
    expect(wrapper.find('.form-error').text()).toBe(props.meta.error);
  });
});
