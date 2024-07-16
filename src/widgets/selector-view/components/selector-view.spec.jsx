import React from 'react';
import renderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest';
import { decoreFormField } from '../../../utils/test/test-utils.jsx';

import SelectorView from './selector-view.jsx';

describe('Tab', () => {
  test('Should exists with the corresponding template with select', () => {
    const props = {
      activeViewValue: 'value2',
      label: 'fake label',
      radio: false,
    };
    const selectorView = renderer
      .create(
        decoreFormField(
          <SelectorView {...props} required readOnly={false}>
            <div value="value1" label="label1">
              Fake Children
            </div>
            <div value="value2" label="label2">
              Fake Children2
            </div>
          </SelectorView>,
        ),
      )
      .toJSON();

    expect(selectorView).toMatchSnapshot();
  });
  test('Should exists with the corresponding template with radio', () => {
    const props = {
      activeViewValue: 'value2',
      label: 'fake label',
      radio: true,
    };
    const selectorView = renderer
      .create(
        decoreFormField(
          <SelectorView {...props} required readOnly={false}>
            <div value="value1" label="label1">
              Fake Children
            </div>
            <div value="value2" label="label2">
              Fake Children2
            </div>
          </SelectorView>,
        ),
      )
      .toJSON();

    expect(selectorView).toMatchSnapshot();
  });
});
