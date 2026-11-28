import React from 'react';

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { decoreFormField } from '@/utils/test/test-utils';

import Dictionary from '../../../../../utils/dictionary/dictionary';
import ResponseFormatSingleSuggester from './response-format-single-suggester';

vi.mock('@/forms/controls/list-radios', () => ({
  default: ({ children, label, name, required }) => (
    <div data-testid={`list-radios-${name}`} role="group" aria-label={label}>
      {required && <span data-testid="required-indicator">required</span>}
      {children}
    </div>
  ),
}));

vi.mock('../../../../../forms/controls/generic-option', () => ({
  default: ({ children, value }) => (
    <div data-testid={`option-${value}`}>{children}</div>
  ),
}));

vi.mock('../../../../codes-lists/containers/suggester-lists-container', () => ({
  default: ({ selectorPathParent }) => (
    <div
      data-testid="suggester-lists"
      data-selector-path-parent={selectorPathParent}
    />
  ),
}));

describe('responseFormatSingleSuggester', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the suggester with its selector path and mandatory checkbox', () => {
    render(
      decoreFormField(
        <ResponseFormatSingleSuggester selectorPathParent="/component/" />,
      ),
    );

    expect(screen.getByTestId('suggester-lists')).toBeInTheDocument();
    expect(screen.getByLabelText(Dictionary.mandatory)).toBeInTheDocument();
  });

  it('renders yes and no options for arbitrary responses by default', () => {
    render(decoreFormField(<ResponseFormatSingleSuggester />));

    expect(
      screen.getByRole('group', { name: Dictionary.allowArbitraryResponse }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('required-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('option-true')).toHaveTextContent(Dictionary.yes);
    expect(screen.getByTestId('option-false')).toHaveTextContent(Dictionary.no);
  });

  it('does not render arbitrary-response options when they are disabled', () => {
    render(
      decoreFormField(<ResponseFormatSingleSuggester disableSetArbitrary />),
    );

    expect(
      screen.queryByTestId('list-radios-allowArbitraryResponse'),
    ).toBeNull();
    expect(screen.getByLabelText(Dictionary.mandatory)).toBeInTheDocument();
  });
});
