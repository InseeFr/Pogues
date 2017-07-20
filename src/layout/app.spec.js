jest.dontMock('./app');

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import renderer from 'react-test-renderer';

import App from './app';

describe('<App />', () => {
  const props = {
    children: <div />,
  };
  const store = createStore(() => {});

  test.skip('should have the right template', () => {
    const tree = renderer.create(<Provider store={store}><App {...props} /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
