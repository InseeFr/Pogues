import React from 'react';

import dictionary from 'constants/dictionary';
import { DEFAULT_LANG } from 'constants/pogues-constants';
import { reduxForm, reducer as form } from 'redux-form';
import { combineReducers, createStore } from 'redux';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

export function getLocale(lang) {
  if (!lang) lang = DEFAULT_LANG;

  return Object.keys(dictionary).reduce((locale, k) => {
    locale[k] = dictionary[k][lang];
    return locale;
  }, {});
}

export function decoreFormField(field) {
  function createForm() {
    return field;
  }
  const store = createStore(combineReducers({ form }), { form: {} });

  const Decorated = reduxForm({ form: 'testForm' })(createForm);
  const tree = renderer.create(
    <Provider store={store}>
      <Decorated />
    </Provider>
  );
  return tree;
}

export default undefined;
