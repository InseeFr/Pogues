import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Variables from './variables-list';

vi.mock('../../../constants/dom-constants', () => ({
  WIDGET_CODES_LISTS: { COMPONENT_CLASS: 'test-class' },
}));

vi.mock('../../errors-panel', () => ({
  ErrorsPanel: ({ path }) => <div data-testid={`errors-panel-${path}`} />,
}));

vi.mock('../../../utils/dictionary/dictionary', () => ({
  default: { selectVariable: 'Select Variable' },
}));

vi.mock('redux-form', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Field: ({ name, component: Component, ...props }) => (
      <Component name={name} {...props} data-testid={`field-${name}`} />
    ),
    FormSection: ({ name, children, className }) => (
      <div data-testid={`form-section-${name}`} className={className}>
        {children}
      </div>
    ),
  };
});

vi.mock('../../../forms/controls/select', () => ({
  default: ({ children, onChange, disabled, name, ...props }) => (
    <select
      onChange={(e) => onChange(e, e.target.value)}
      disabled={disabled}
      data-testid={`field-${name}`}
      {...props}
    >
      {children}
    </select>
  ),
}));

vi.mock('../../../forms/controls/generic-option', () => ({
  default: ({ value, children }) => <option value={value}>{children}</option>,
}));

describe('Variable select list: ', () => {
  const defaultProps = {
    selectorPath: 'selectorPath',
    selectorPathParent: 'selectorPathParent',
    formName: 'formName',
    path: 'path.',
    currentId: '',
    variablesStore: {},
    change: vi.fn(),
    scope: '',
  };

  const mockVariableStore = {
    variable1: { id: 'variable1', name: 'Variable 1', label: 'Variable 1' },
    variable2: { id: 'variable2', name: 'Variable 2', label: 'Variable 2' },
  };

  const createMockStore = () =>
    createStore(combineReducers({ form: formReducer }));

  const renderWithStore = (component) => {
    return render(<Provider store={createMockStore()}>{component}</Provider>);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with props', () => {
    const { getByTestId } = renderWithStore(<Variables {...defaultProps} />);
    expect(getByTestId('form-section-selectorPath')).toBeInTheDocument();
    expect(getByTestId('field-id')).toBeInTheDocument();
  });

  it('should be disabled if scope is empty', () => {
    const { getByTestId } = renderWithStore(<Variables {...defaultProps} />);
    expect(getByTestId('field-id')).toBeDisabled();
  });

  it('should be enabled if scope is provided', () => {
    const { getByTestId } = renderWithStore(
      <Variables {...defaultProps} scope="scope1" />,
    );
    expect(getByTestId('field-id')).not.toBeDisabled();
  });

  it('should render variable options from variablesStore', () => {
    renderWithStore(
      <Variables
        {...defaultProps}
        scope="scope1"
        variablesStore={mockVariableStore}
      />,
    );
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[1]).toHaveTextContent('Variable 1');
    expect(options[2]).toHaveTextContent('Variable 2');
  });

  it('should call change when variable is selected', async () => {
    const changeMock = vi.fn();
    const user = userEvent.setup();
    renderWithStore(
      <Variables
        {...defaultProps}
        scope="scope1"
        variablesStore={mockVariableStore}
        change={changeMock}
      />,
    );
    await user.selectOptions(screen.getByTestId('field-id'), 'variable1');
    expect(changeMock).toHaveBeenCalledWith(
      'formName',
      'path.label',
      'Variable 1',
    );
    expect(changeMock).toHaveBeenCalledWith(
      'formName',
      'path.name',
      'Variable 1',
    );
  });

  it('should clear fields when empty option selected', async () => {
    const changeMock = vi.fn();
    const user = userEvent.setup();
    renderWithStore(
      <Variables
        {...defaultProps}
        scope="scope1"
        variablesStore={mockVariableStore}
        change={changeMock}
      />,
    );
    await user.selectOptions(screen.getByTestId('field-id'), '');
    expect(changeMock).toHaveBeenCalledWith('formName', 'path.id', '');
    expect(changeMock).toHaveBeenCalledWith('formName', 'path.label', '');
    expect(changeMock).toHaveBeenCalledWith('formName', 'path.name', '');
  });
});
