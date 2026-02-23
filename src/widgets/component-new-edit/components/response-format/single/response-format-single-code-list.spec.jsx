import React from 'react';

import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { decoreFormField } from '@/utils/test/test-utils';

import Dictionary from '../../../../../utils/dictionary/dictionary';
import ResponseFormatSimpleCodeslist from './response-format-single-code-list';

vi.mock('@/forms/controls/select', () => ({
  default: ({ children, label, name }) => (
    <div data-testid={`select-${name}`} aria-label={label}>
      {children}
    </div>
  ),
}));

vi.mock('@/forms/controls/list-radios', () => ({
  default: ({ children, label, name }) => (
    <div data-testid={`list-radios-${name}`} role="group" aria-label={label}>
      {children}
    </div>
  ),
}));

vi.mock('../../../../../forms/controls/generic-option', () => ({
  default: ({ children, value }) => (
    <div data-testid={`option-${value}`}>{children}</div>
  ),
}));

vi.mock('../../../../codes-lists', () => ({
  CodesLists: ({ selectorPathParent, scope }) => (
    <div
      data-testid="codesList-list"
      data-scope={scope}
      data-path={selectorPathParent}
    />
  ),
}));

describe('responseFormatSingleCodeslist', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with code-list select and visHint select', () => {
    const { getByText, getByTestId } = render(
      decoreFormField(<ResponseFormatSimpleCodeslist />),
    );
    expect(getByTestId('codesList-list')).toBeInTheDocument();
    expect(getByText(Dictionary.radio)).toBeInTheDocument();
    expect(getByText(Dictionary.checkbox)).toBeInTheDocument();
    expect(getByText(Dictionary.dropdown)).toBeInTheDocument();
  });
});
