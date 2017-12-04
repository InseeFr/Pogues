jest.dontMock('./app');

import React from 'react';
import renderer from 'react-test-renderer';

import App from './app';

describe('<App />', () => {
  const props = {
    children: <div />,
    loadUser() {},
    loadUnitsIfNeeded() {},
    loadQuestionnaireList() {},
  };

  test.skip('should have the right template', () => {
    const tree = renderer.create(<App {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
