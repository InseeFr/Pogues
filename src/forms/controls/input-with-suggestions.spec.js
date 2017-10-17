import React from 'react';
import { decoreFormField } from 'utils/test/test-utils';
import { Field } from 'redux-form';
import InputWithSuggestions from './input-with-suggestions';

describe('InputWithSuggestions', () => {
  test('Should have this default template', () => {
    const tree = decoreFormField(
      <Field type="text" component={InputWithSuggestions} name="input" label="Label Name" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should have a help block', () => {
    const tree = decoreFormField(
      <Field help type="text" component={InputWithSuggestions} name="input" label="Label Name" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should accept available suggestions props', () => {
    const tree = decoreFormField(
      <Field
        help
        type="text"
        availableSuggestions={['foo', 'bar']}
        component={InputWithSuggestions}
        name="input"
        label="Label Name"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
