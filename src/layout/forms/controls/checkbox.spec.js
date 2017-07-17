import React from 'react';
import { Field } from 'redux-form';
import Checkbox from './checkbox';
import { decoreFormField } from 'utils/test/test-utils';

describe('Checkbox', () => {
  test('Should have this default template', () => {
    const tree = decoreFormField(<Field component={Checkbox} name="checkbox" label="Label Name" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
