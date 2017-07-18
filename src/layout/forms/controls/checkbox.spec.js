import React from 'react';
import renderer from 'react-test-renderer';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm, reducer as form } from 'redux-form';
import { Field } from 'redux-form';
import Checkbox from './checkbox';

function MyForm() {
  return <Field component={Checkbox} name="checkbox" label="Label Name" />;
}

describe('Checkbox', () => {
  test('Should have this default template', () => {
    const store = createStore(combineReducers({ form }), { form: {} });

    const Decorated = reduxForm({ form: 'testForm' })(MyForm);
    const tree = renderer
      .create(
        <Provider store={store}>
          <Decorated />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
