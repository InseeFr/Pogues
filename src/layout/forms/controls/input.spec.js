import React from 'react';
import { decoreFormField } from 'utils/test/test-utils';
import { Field } from 'redux-form';
import Input from './input';

describe('Input', () => {
  test('Should have this default template', () => {
    const tree = decoreFormField(<Field type="text" component={Input} name="input" label="Label Name" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should have a help block', () => {
    const tree = decoreFormField(<Field help type="text" component={Input} name="input" label="Label Name" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
