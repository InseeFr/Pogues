import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { reducer as formReducer, reduxForm } from 'redux-form';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Dictionary from '../../../../../utils/dictionary/dictionary';
import ResponseFormatSimpleVariable from './response-format-single-variable';

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

vi.mock('../../../../codes-lists/variables', () => ({
  VariablesList: ({ selectorPathParent, scope }) => (
    <div
      data-testid="variables-list"
      data-scope={scope}
      data-path={selectorPathParent}
    />
  ),
}));

vi.mock('../../variables/utils-loops', () => ({
  getQuestionnaireScope: () => ({
    scope1: { id: 'scope1', label: 'Scope 1' },
    scope2: { id: 'scope2', name: 'Scope 2' },
  }),
}));

const FormWrapper = reduxForm({ form: 'DEFAULT_FORM_NAME' })(({ children }) => (
  <form>{children}</form>
));

const renderWithStore = (ui, preloadedState = {}) => {
  const store = createStore(
    combineReducers({
      form: formReducer,
      appState: (s = {}) => s,
      metadataByType: (s = {}) => s,
    }),
    {
      appState: {
        activeQuestionnaire: { childQuestionnaireRef: [] },
        activeComponentsById: {},
      },
      metadataByType: { externalQuestionnairesLoops: {} },
      ...preloadedState,
    },
  );

  return render(
    <Provider store={store}>
      <FormWrapper>{ui}</FormWrapper>
    </Provider>,
  );
};

describe('responseFormatSingleVariable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with scope select and visHint select', () => {
    const { getByText } = renderWithStore(<ResponseFormatSimpleVariable />);
    expect(getByText(Dictionary.selectLoop)).toBeInTheDocument();
    expect(getByText(Dictionary.radio)).toBeInTheDocument();
    expect(getByText(Dictionary.checkbox)).toBeInTheDocument();
    expect(getByText(Dictionary.dropdown)).toBeInTheDocument();
  });

  it('should pass empty scope when no scope is selected', () => {
    const { getByTestId } = renderWithStore(<ResponseFormatSimpleVariable />);
    expect(getByTestId('variables-list').getAttribute('data-scope')).toBe('');
  });
});
