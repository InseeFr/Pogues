import { shallow } from 'enzyme';
import React from 'react';
import { beforeEach, describe, expect, test } from 'vitest';
import { fakeEvent, fakeFieldProps } from '../../../utils/test/test-utils';
import GenericOption from '../generic-option';
import InputAutocomplete from './input-autocomplete';

describe('Form controls - Input autocomplete', () => {
  describe('Props and render behaviour', () => {
    let props;

    beforeEach(() => {
      props = {
        ...fakeFieldProps,
        label: 'Fake label',
      };
    });

    test('Should exists a input element with the name passed as property', () => {
      const wrapper = shallow(<InputAutocomplete {...props} />);
      expect(wrapper.find(`input[name="${props.input.name}"]`)).toHaveLength(1);
    });

    test('Should exists a label element with the label text only when this prop is passed', () => {
      const wrapper = shallow(<InputAutocomplete {...props} />);
      expect(wrapper.find('label').text()).toBe(props.label);
    });

    test('Should exists a notice dans le label when the field is required', () => {
      props.required = true;
      const wrapper = shallow(<InputAutocomplete {...props} />);
      expect(wrapper.find('label').text()).toBe(`${props.label}*`);
    });

    test('Should exists an error message when the field is touched and an error text is passed', () => {
      props.meta.touched = true;
      props.meta.error = 'Fake error message';
      const wrapper = shallow(<InputAutocomplete {...props} />);
      expect(wrapper.find('.form-error').text()).toBe(props.meta.error);
    });

    test('Should keep in the state all the option values passed', () => {
      const wrapper = shallow(
        <InputAutocomplete {...props}>
          <GenericOption value="FAKE_VALUE_1">
            Fake value label first
          </GenericOption>
          <GenericOption value="FAKE_VALUE_2">
            Fake value label first
          </GenericOption>
          <GenericOption value="FAKE_VALUE_3">
            Fake value label second
          </GenericOption>
        </InputAutocomplete>,
      );

      expect(wrapper.state('options')).toEqual([
        {
          value: 'FAKE_VALUE_1',
          label: 'Fake value label first',
          className: undefined,
        },
        {
          value: 'FAKE_VALUE_2',
          label: 'Fake value label first',
          className: undefined,
        },
        {
          value: 'FAKE_VALUE_3',
          label: 'Fake value label second',
          className: undefined,
        },
      ]);
    });
  });

  describe('Events', () => {
    let props;

    beforeEach(() => {
      props = {
        ...fakeFieldProps,
        label: 'Fake label',
      };
    });

    test('Should show two suggestions when the text "first" is written', () => {
      const wrapper = shallow(
        <InputAutocomplete {...props}>
          <GenericOption value="FAKE_VALUE_1">
            Fake value label first
          </GenericOption>
          <GenericOption value="FAKE_VALUE_2">
            Fake value label first
          </GenericOption>
          <GenericOption value="FAKE_VALUE_3">
            Fake value label second
          </GenericOption>
        </InputAutocomplete>,
      );
      const event = { ...fakeEvent, ...{ currentTarget: { value: 'first' } } };

      wrapper.find('input[type="text"]').simulate('keyUp', event);

      expect(wrapper.find('ul li')).toHaveLength(2);
    });
  });
});
