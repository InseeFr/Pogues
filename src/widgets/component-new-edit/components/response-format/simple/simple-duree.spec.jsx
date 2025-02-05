import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { decoreFormField } from '../../../../../utils/test/test-utils';
import { ResponseFormatDatatypeDuree } from './simple-duree';

describe('Visualize Dropdown Component: ', () => {
  test('Should return the right HTML according to format "PTnHnM" ', () => {
    const props = {
      componentId: 'component-id',
      format: 'PTnHnM',
    };
    const { container } = render(
      decoreFormField(<ResponseFormatDatatypeDuree {...props} />),
    );
    expect(container).toMatchSnapshot();
  });
  test('Should return the right HTML according to format "PnYnM" ', () => {
    const props = {
      componentId: 'component-id',
      format: 'PnYnM',
    };
    const { container } = render(
      decoreFormField(<ResponseFormatDatatypeDuree {...props} />),
    );
    expect(container).toMatchSnapshot();
  });
});
