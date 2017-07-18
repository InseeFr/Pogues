import React from 'react';
import renderer from 'react-test-renderer';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm, reducer as form } from 'redux-form';
import { Field } from 'redux-form';
import TextArea from './rich-textarea';

describe('RichTextArea', () => {
  test('should have this default template', () => {
    function MyForm() {
      return <Field component={TextArea} name="checkbox" label="Label Name" />;
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
      return <Field help component={TextArea} name="checkbox" label="Label Name" />;
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

  test('should have a an action toolbar', () => {
    function MyForm() {
      return <Field buttons component={TextArea} name="checkbox" label="Label Name" />;
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
