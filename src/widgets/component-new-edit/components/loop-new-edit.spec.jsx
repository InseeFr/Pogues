import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { COMPONENT_TYPE } from '../../../constants/pogues-constants';
import Input from '../../../forms/controls/input';
import Dictionary from '../../../utils/dictionary/dictionary';
import { decoreFormField } from '../../../utils/test/test-utils';
import LoopNewEdit from './loop-new-edit';

/*
 Mock InputWithVariableAutoCompletion as the classic Input,
 since there are errors when importing antlr-editor in tests
 */
vi.mock('../../../forms/controls/control-with-suggestions', () => ({
  InputWithVariableAutoCompletion: (props) => <Input {...props} />,
}));

describe('LoopNewEdit', () => {
  const defaultProps = {
    componentType: COMPONENT_TYPE.LOOP,
    componentsStore: {},
    scopes: [
      <option key="1" value="1">
        Scope 1
      </option>,
      <option key="2" value="2">
        Scope 2
      </option>,
    ],
    form: 'testForm',
  };

  it('renders name field with correct label', () => {
    const { getByPlaceholderText } = render(
      decoreFormField(<LoopNewEdit {...defaultProps} />),
    );

    expect(getByPlaceholderText(Dictionary.name)).toBeInTheDocument();
  });

  it('renders basedOn field with correct scopes and label', () => {
    const { getByPlaceholderText, getByText } = render(
      decoreFormField(<LoopNewEdit {...defaultProps} />),
    );

    expect(getByPlaceholderText(Dictionary.BasedOn)).toBeInTheDocument();
    expect(getByText('Scope 1')).toBeInTheDocument();
    expect(getByText('Scope 2')).toBeInTheDocument();
  });

  it('renders Roundabout-specific fields (occurence label, occurence description, locked) when componentType is ROUNDABOUT', () => {
    const { getByText, getByPlaceholderText } = render(
      decoreFormField(
        <LoopNewEdit
          componentType="ROUNDABOUT"
          scopes={[]}
          componentsStore={{}}
          form="testForm"
        />,
      ),
    );

    // occurence label
    expect(getByText(Dictionary.occurrenceLabel)).toBeInTheDocument();
    expect(
      getByPlaceholderText(Dictionary.occurrenceLabel),
    ).toBeInTheDocument();

    // occurence description
    expect(getByText(Dictionary.occurrenceDescription)).toBeInTheDocument();
    expect(
      getByPlaceholderText(Dictionary.occurrenceDescription),
    ).toBeInTheDocument();

    // locked
    expect(getByText(Dictionary.isRoundaboutLocked)).toBeInTheDocument();
    expect(
      getByPlaceholderText(Dictionary.isRoundaboutLocked),
    ).toBeInTheDocument();
  });
});
