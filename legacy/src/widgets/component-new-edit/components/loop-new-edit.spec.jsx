import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { COMPONENT_TYPE } from '../../../constants/pogues-constants';
import Input from '../../../forms/controls/input';
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

    expect(getByPlaceholderText('Id')).toBeInTheDocument();
  });

  it('renders basedOn field with correct scopes and label', () => {
    const { getByPlaceholderText, getByText } = render(
      decoreFormField(<LoopNewEdit {...defaultProps} />),
    );

    expect(getByPlaceholderText('Based on')).toBeInTheDocument();
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
    expect(getByText('Occurrence identifier label')).toBeInTheDocument();
    expect(
      getByPlaceholderText('Occurrence identifier label'),
    ).toBeInTheDocument();

    // occurence description
    expect(getByText('Occurrence description')).toBeInTheDocument();
    expect(getByPlaceholderText('Occurrence description')).toBeInTheDocument();

    // locked
    expect(getByText('Forbid modifying ended occurrence')).toBeInTheDocument();
    expect(
      getByPlaceholderText('Forbid modifying ended occurrence'),
    ).toBeInTheDocument();
  });
});
