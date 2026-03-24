import React from 'react';

import { shallow } from 'enzyme';
import { describe, expect, test } from 'vitest';

import HighLighter from './highlighter';

describe('<HighLighter />', () => {
  test('Should highlight a subtext in the main text', () => {
    const wrapper = shallow(
      <HighLighter highlight="test">
        Fake test string and anothertest
      </HighLighter>,
    );

    expect(wrapper.html()).toBe(
      '<span>Fake <strong>test</strong> string and another<strong>test</strong></span>',
    );
  });
  // @TODO: Add test for case sensitive feature
});
