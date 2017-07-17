import React from 'react';
import renderer from 'react-test-renderer';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm, reducer as form } from 'redux-form';
import { Field } from 'redux-form';
import Input from './input';

describe('Input', () => {
  test('Should have this default template', () => {
    function MyForm() {
      return <Field type="text" component={Input} name="input" label="Label Name" />;
    }
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

  test('should have a help block', () => {
    function MyForm() {
      return <Field help type="text" component={Input} name="input" label="Label Name" />;
    }
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
