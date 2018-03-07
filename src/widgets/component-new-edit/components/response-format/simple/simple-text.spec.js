import React from 'react';
import renderer from 'react-test-renderer';
import { decoreFormField } from 'utils/test/test-utils.jsx';

import SimpleText from './simple-text.jsx';

describe('Simple Text', () => {
  test('with default props', () => {
    const props = {};
    const selectorView = renderer
      .create(decoreFormField(<SimpleText {...props} />))
      .toJSON();

    expect(selectorView).toMatchSnapshot();
  });
  test('with readOnly', () => {
    const props = {
      readOnly: true
    };
    const selectorView = renderer
      .create(decoreFormField(<SimpleText {...props} />))
      .toJSON();

    expect(selectorView).toMatchSnapshot();
  });
  test('with required', () => {
    const props = {
      required: true
    };
    const selectorView = renderer
      .create(decoreFormField(<SimpleText {...props} />))
      .toJSON();

    expect(selectorView).toMatchSnapshot();
  });
});
