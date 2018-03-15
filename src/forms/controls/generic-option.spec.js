import React from 'react';
import renderer from 'react-test-renderer';

import GenericOption from './generic-option';

describe('Form controls - Generic option', () => {
  test('Should exists with the corresponding template', () => {
    const props = {
      value: 'Fake value',
      className: 'fake-class-name'
    };
    const tree = renderer
      .create(<GenericOption {...props}>Fake label</GenericOption>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
