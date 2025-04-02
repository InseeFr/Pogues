import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { DECLARATION_TYPES } from '../../../constants/pogues-constants';
import { decoreFormField } from '../../../utils/test/test-utils';
import Declarations from './declarations';

// need to mock rich editor, else we have .css import error when trying to import Antlr Editor. For now we mock it as an input
vi.mock('../../../forms/controls/control-with-suggestions', () => ({
  RichEditorWithVariable: ({ id, label, input }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...input} />
    </div>
  ),
}));

// TODO : find a solution to avoid errors without mocking ListWithInputPanel
vi.mock('../../list-with-input-panel', () => ({
  ListWithInputPanel: ({ children }) => <div>{children}</div>,
}));

// TODO : find a better solution to fill the declarationType from a state
let mockDeclarationType = 'HELP';
vi.mock('redux-form', async () => {
  const actual = await vi.importActual('redux-form');
  return {
    ...actual,
    formValueSelector: vi.fn((formName) => {
      return (state, field) => {
        if (
          formName === 'component' &&
          field === 'declarations.declarationType'
        ) {
          return mockDeclarationType;
        }
        return undefined;
      };
    }),
  };
});

describe('Declarations Component', () => {
  const defaultProps = {
    activeQuestionnaire: {},
    addErrors: vi.fn(),
  };

  test('renders the component with correct fields', () => {
    render(decoreFormField(<Declarations {...defaultProps} />));

    // type field
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    // label field
    expect(screen.getByLabelText(/Statement label/i)).toBeInTheDocument();
    // position field
    expect(screen.getByLabelText(/Position/i)).toBeInTheDocument();
    // target mode field
    expect(screen.getByLabelText(/Collection Mode/i)).toBeInTheDocument();
  });

  test('does not render position field if showPosition=false', () => {
    const props = { ...defaultProps, showPosition: false };
    render(decoreFormField(<Declarations {...props} />));

    expect(screen.queryByLabelText(/Position/i)).not.toBeInTheDocument();
  });

  test('renders a different label, and as a text input when declaration is a code card', () => {
    mockDeclarationType = DECLARATION_TYPES.CODE_CARD;
    render(decoreFormField(<Declarations {...defaultProps} />));

    // Check that the "label" field is rendered as a text input, with a different label
    expect(screen.getByLabelText(/Code of the card/i)).toHaveAttribute(
      'type',
      'text',
    );
    expect(screen.queryByLabelText(/Statement label/i)).not.toBeInTheDocument();
  });
});
