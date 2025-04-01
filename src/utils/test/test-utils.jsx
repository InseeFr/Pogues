import React from 'react';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { reducer as form, reduxForm } from 'redux-form';

export function decoreFormField(Field) {
  function createForm() {
    return Field;
  }
  const store = createStore(combineReducers({ form }), { form: {} });

  const Decorated = reduxForm({ form: 'testForm' })(createForm);
  return (
    <Provider store={store}>
      <Decorated />
    </Provider>
  );
}

export const noop = () => {};

export const fakeFieldInput = {
  name: 'FAKE_NAME',
  onBlur: noop,
  onChange: noop,
  onDragStart: noop,
  onDrop: noop,
  onFocus: noop,
};

export const fakeFieldMeta = {
  active: true,
  asyncValidating: false,
  autofilled: false,
  dirty: false,
  dispatch: noop,
  form: 'FORM_FAKE',
  invalid: false,
  pristine: true,
  submitting: false,
  submitFailed: false,
  touched: false,
  valid: true,
  visited: false,
};

export const fakeFieldArrayMeta = {
  dirty: false,
  form: 'FAKE_FORM',
  invalid: false,
  pristine: true,
  valid: true,
  error: undefined,
  warning: undefined,
  submitFailed: false,
  submitting: false,
};

export const fakeFieldArrayFields = {
  insert: noop,
  name: 'FAKE_NAME',
  forEach: noop,
  get: noop,
  getAll: noop,
  length: 0,
  map: noop,
  move: noop,
  pop: noop,
  push: noop,
  remove: noop,
  removeAll: noop,
  shift: noop,
  swap: noop,
  unshift: noop,
  reduce: noop,
};

export const fakeFieldArray = {
  fields: fakeFieldArrayFields,
  meta: fakeFieldArrayMeta,
};

export const fakeFieldProps = {
  input: fakeFieldInput,
  meta: fakeFieldMeta,
};

export const fakeEvent = {
  preventDefault: noop,
};

export const fakeEnterEvent = {
  preventDefault: noop,
  key: 'Enter',
  keyCode: 13,
  which: 13,
};

export default undefined;
