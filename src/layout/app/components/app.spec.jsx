jest.dontMock('./app');
jest.mock('layout/header/header')
import React from 'react';
import renderer from 'react-test-renderer';

import { AppContainer } from './app';

describe('<App />', () => {
  const props = {
    children: <div />,
    loadUser() {},
    loadUnitsIfNeeded() {},
    loadQuestionnaireList() {},
  };

  test('should have the right template', () => {
    const tree = renderer.create(<AppContainer {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
