import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { decoreFormField } from '@/utils/test/test-utils';

import ResponseFormatSingle from './response-format-single';

vi.mock('../../../../codes-lists/containers/suggester-lists-container', () => ({
  default: () => <div data-testid="suggester-lists">Suggester Lists</div>,
}));

vi.mock('./response-format-single-code-list', () => ({
  default: () => <div data-testid="code-list-section">Code List Section</div>,
}));

vi.mock('./response-format-single-variable', () => ({
  default: () => <div data-testid="variable-section">Variable Section</div>,
}));

vi.mock('../../../../../forms/controls/list-radios', () => ({
  default: ({ children, label, name }) => (
    <div data-testid={`list-radios-${name}`} role="group" aria-label={label}>
      {children}
    </div>
  ),
}));

vi.mock('../../../../../forms/controls/generic-option', () => ({
  default: ({ children, value }) => (
    <label>
      <input type="radio" value={value} />
      {children}
    </label>
  ),
}));

vi.mock('../../../../selector-view', () => ({
  SelectorView: ({ children, label }) => (
    <div data-testid="selector-view" role="group" aria-label={label}>
      {children}
    </div>
  ),
  View: ({ children, value, label }) => (
    <div data-testid={`view-${value}`} role="region" aria-label={label}>
      {children}
    </div>
  ),
}));

describe('responseFormatSingle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with form sections', () => {
    const { getByTestId } = render(decoreFormField(<ResponseFormatSingle />));
    expect(getByTestId('selector-view')).toBeInTheDocument();
  });

  it('should render with three options', () => {
    const { getByText } = render(decoreFormField(<ResponseFormatSingle />));
    expect(getByText('Code List Section')).toBeInTheDocument();
    expect(getByText('Suggester Lists')).toBeInTheDocument();
    expect(getByText('Variable Section')).toBeInTheDocument();
  });
});
