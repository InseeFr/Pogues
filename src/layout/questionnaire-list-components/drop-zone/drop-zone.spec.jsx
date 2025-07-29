import React from 'react';

import renderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest';

import DropZone from './drop-zone';

describe('DropZone', () => {
  test('Should have this default template', () => {
    const style = {};
    const tree = renderer.create(<DropZone style={style} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
