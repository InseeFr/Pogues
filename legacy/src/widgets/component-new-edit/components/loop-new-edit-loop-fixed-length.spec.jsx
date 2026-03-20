import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Input from '../../../forms/controls/input';
import { decoreFormField } from '../../../utils/test/test-utils';
import { LoopFixedLength } from './loop-new-edit-loop-fixed-length';

/*
  Mock InputWithVariableAutoCompletion as the classic Input,
  since there are errors when importing antlr-editor in tests
 */
vi.mock('../../../forms/controls/control-with-suggestions', () => ({
  InputWithVariableAutoCompletion: (props) => <Input {...props} />,
}));

describe('LoopFixedLength', () => {
  it('renders size field with correct label', () => {
    const { getByText, getByPlaceholderText } = render(
      decoreFormField(<LoopFixedLength />),
    );

    expect(getByText('Occurrences number')).toBeInTheDocument();
    expect(getByPlaceholderText('Occurrences number')).toBeInTheDocument();
  });

  it('renders shouldSplitIterations radios with yes/no options', () => {
    const { getByText, getByRole } = render(
      decoreFormField(<LoopFixedLength />),
    );

    expect(
      getByText('Display all occurrences on a single page'),
    ).toBeInTheDocument();
    expect(getByRole('radio', { name: /yes/i })).toBeInTheDocument();
    expect(getByRole('radio', { name: /no/i })).toBeInTheDocument();
  });

  it('renders business warning message only when shouldSplitIterations is true', () => {
    const { rerender, queryByText, getByText } = render(
      decoreFormField(<LoopFixedLength shouldSplitIterations={false} />),
    );
    expect(
      queryByText(
        'Reminder: for business surveys, all occurrences must be displayed on a single page.',
      ),
    ).not.toBeInTheDocument();

    rerender(decoreFormField(<LoopFixedLength shouldSplitIterations={true} />));
    expect(
      getByText(
        'Reminder: for business surveys, all occurrences must be displayed on a single page.',
      ),
    ).toBeInTheDocument();
  });
});
