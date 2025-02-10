import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { decoreFormField } from '../../../../../utils/test/test-utils';
import { ResponseFormatDatatypeDate } from './simple-date';

describe('Visualize Date Component "YYYY-MM-DD" format: ', () => {
  test('Should return the right HTML according for Date Field ', () => {
    const props = {
      componentId: 'component-id',
      format: 'YYYY-MM-DD',
    };
    const { container } = render(
      decoreFormField(<ResponseFormatDatatypeDate {...props} />),
    );
    expect(container).toMatchSnapshot();
  });
});

describe('Visualize Date Component "YYYY-MM" format: ', () => {
  test('Should return the right HTML according for Date Field ', () => {
    const props = {
      componentId: 'component-id',
      format: 'YYYY-MM',
    };
    const { container } = render(
      decoreFormField(<ResponseFormatDatatypeDate {...props} />),
    );
    expect(container).toMatchSnapshot();
  });
});

describe('Visualize Date Component "YYYY" format: ', () => {
  test('Should return the right HTML according for Date Field ', () => {
    const props = {
      componentId: 'component-id',
      format: 'YYYY',
    };
    const { container } = render(
      decoreFormField(<ResponseFormatDatatypeDate {...props} />),
    );
    expect(container).toMatchSnapshot();
  });
});
