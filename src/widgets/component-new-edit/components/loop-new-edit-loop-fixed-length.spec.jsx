import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Input from '../../../forms/controls/input';
import Dictionary from '../../../utils/dictionary/dictionary';
import { decoreFormField } from '../../../utils/test/test-utils';
import { LoopFixedLength } from './loop-new-edit-loop-fixed-length';

/**
 * Mock InputWithVariableAutoCompletion as the classic Input,
 * since there are errors when importing antlr-editor in tests
 */
vi.mock('../../../forms/controls/control-with-suggestions', () => ({
  InputWithVariableAutoCompletion: (props) => <Input {...props} />,
}));

describe('LoopFixedLength', () => {
  it('renders size field with correct label', () => {
    const { getByText, getByPlaceholderText } = render(
      decoreFormField(<LoopFixedLength />),
    );

    expect(getByText(Dictionary.loopSize)).toBeInTheDocument();
    expect(getByPlaceholderText(Dictionary.loopSize)).toBeInTheDocument();
  });

  it('renders shouldSplitIterations radios with yes/no options', () => {
    const { getByText, getByRole } = render(
      decoreFormField(<LoopFixedLength />),
    );

    expect(getByText(Dictionary.loopSinglePage)).toBeInTheDocument();
    expect(getByRole('radio', { name: /yes/i })).toBeInTheDocument();
    expect(getByRole('radio', { name: /no/i })).toBeInTheDocument();
  });

  it('renders business warning message only when shouldSplitIterations is true', () => {
    const { rerender, queryByText, getByText } = render(
      decoreFormField(<LoopFixedLength shouldSplitIterations={false} />),
    );
    expect(
      queryByText(Dictionary.loopSinglePageBusinessContextWarning),
    ).not.toBeInTheDocument();

    rerender(decoreFormField(<LoopFixedLength shouldSplitIterations={true} />));
    expect(
      getByText(Dictionary.loopSinglePageBusinessContextWarning),
    ).toBeInTheDocument();
  });
});
