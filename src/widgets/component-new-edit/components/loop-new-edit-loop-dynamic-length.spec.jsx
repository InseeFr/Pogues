import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Input from '../../../forms/controls/input';
import Dictionary from '../../../utils/dictionary/dictionary';
import { decoreFormField } from '../../../utils/test/test-utils';
import { LoopDynamicLength } from './loop-new-edit-loop-dynamic-length';

/*
  Mock InputWithVariableAutoCompletion as the classic Input,
  since there are errors when importing antlr-editor in tests
 */
vi.mock('../../../forms/controls/control-with-suggestions', () => ({
  InputWithVariableAutoCompletion: (props) => <Input {...props} />,
}));

describe('LoopDynamicLength', () => {
  it('renders business context warning message', () => {
    const { getByText } = render(decoreFormField(<LoopDynamicLength />));

    expect(
      getByText(
        'Reminder: for business surveys, the min and max number of occurrences of a loop must be equal.',
      ),
    ).toBeInTheDocument();
  });

  it('renders minimum and maximum fields with correct label', () => {
    const { getByText, getByPlaceholderText } = render(
      decoreFormField(<LoopDynamicLength />),
    );

    // minimum
    expect(getByText(Dictionary.loopMinOccurrencesNb)).toBeInTheDocument();
    expect(
      getByPlaceholderText(Dictionary.loopMinOccurrencesNb),
    ).toBeInTheDocument();

    // maximum
    expect(getByText(Dictionary.loopMaxOccurrencesNb)).toBeInTheDocument();
    expect(
      getByPlaceholderText(Dictionary.loopMaxOccurrencesNb),
    ).toBeInTheDocument();
  });

  it('renders add button label field', () => {
    const { getByLabelText } = render(decoreFormField(<LoopDynamicLength />));

    expect(getByLabelText(Dictionary.AddButton)).toBeInTheDocument();
  });
});
