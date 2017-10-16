import React from 'react';
import { decoreFormField } from 'utils/test/test-utils';
import { Field } from 'redux-form';
import TextArea from './rich-textarea';

describe('RichTextArea', () => {
  test('should have this default template', () => {
    const tree = decoreFormField(<Field component={TextArea} name="checkbox" label="Label Name" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should use the rte lib to get desired element', () => {
    const tree = decoreFormField(<Field component={TextArea} buttons name="checkbox" label="Label Name" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should have a help block', () => {
    const tree = decoreFormField(<Field help component={TextArea} name="checkbox" label="Label Name" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should accept available suggestions props', () => {
    const tree = decoreFormField(
      <Field component={TextArea} availableSuggestions={['foo', 'bar']} name="checkbox" label="Label Name" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
