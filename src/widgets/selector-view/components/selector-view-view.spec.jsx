import React from 'react';
import renderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest';

import SelectorViewView from './selector-view-view';

describe('Tab', () => {
  test('Should exists with the corresponding template', () => {
    const props = {
      label: 'Fake label',
      value: 'fake value',
    };
    const selectorViewView = renderer
      .create(
        <SelectorViewView {...props}>
          <div>Fake Children</div>
        </SelectorViewView>,
      )
      .toJSON();

    expect(selectorViewView).toMatchSnapshot();
  });
});
