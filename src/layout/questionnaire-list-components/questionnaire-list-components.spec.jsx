import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { COMPONENT_TYPE } from '../../constants/pogues-constants';
import Dictionary from '../../utils/dictionary/dictionary';
import QuestionnaireListComponents from './questionnaire-list-components';

vi.mock('../../hooks/useReadonly', () => ({
  useReadonly: vi.fn(() => false),
}));

vi.mock('react-modal', () => ({
  __esModule: true,
  default: ({ children, isOpen }) =>
    isOpen ? <div data-testid="modal">{children}</div> : null,
}));

vi.mock('../loader', () => ({
  __esModule: true,
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock('../questionnaire-edit', () => ({
  QuestionnaireEdit: ({ onCancel, onSuccess }) => (
    <div data-testid="questionnaire-edit">
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onSuccess}>Save</button>
    </div>
  ),
}));

vi.mock('../component-edit', () => ({
  ComponentEdit: ({ onCancel, onSuccess }) => (
    <div data-testid="component-edit">
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onSuccess}>Save</button>
    </div>
  ),
}));

vi.mock('./questionnaire-component', () => ({
  __esModule: true,
  default: ({ component, children, selected }) => (
    <div
      data-testid={`component-${component.id}`}
      className={selected ? 'selected' : ''}
    >
      {component.label}
      {children}
    </div>
  ),
}));

vi.mock('./components/errors-integrity', () => ({
  ErrorsIntegrity: ({ errorsIntegrity }) => (
    <div data-testid="errors-integrity">
      {Object.keys(errorsIntegrity).length > 0 && <div>Errors found</div>}
    </div>
  ),
}));

const { QUESTION, LOOP, FILTER } = COMPONENT_TYPE;

describe('QuestionnaireListComponents', () => {
  const defaultProps = {
    token: 'test-token',
    isQuestionnaireModified: false,
    questionnaire: {
      id: 'q1',
      label: 'Test Questionnaire',
    },
    componentsStore: {
      q1: {
        id: 'q1',
        label: 'Test Questionnaire',
        type: 'QUESTIONNAIRE',
        children: ['c1', 'c2'],
      },
      c1: {
        id: 'c1',
        label: 'Component 1',
        type: QUESTION,
        parent: 'q1',
        children: [],
      },
      c2: {
        id: 'c2',
        label: 'Component 2',
        type: QUESTION,
        parent: 'q1',
        children: [],
      },
    },
    errorsIntegrity: {},
    selectedComponentId: '',
    editingComponentId: '',
    setSelectedComponentId: vi.fn(),
    setEditingComponentId: vi.fn(),
    removeComponent: vi.fn(),
    removeQuestionnaireRef: vi.fn(),
    dragComponent: vi.fn(),
    duplicateComponentAndVariables: vi.fn(),
    duplicateQuestionnaire: vi.fn().mockResolvedValue(),
    removeQuestionnaire: vi.fn().mockResolvedValue(),
    navigate: vi.fn(),
    activeCalculatedVariables: {},
    calculatedVariables: {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('QuestionnaireListComponents', () => {
    it('should display loader when questionnaire has no id', () => {
      const props = {
        ...defaultProps,
        questionnaire: {},
      };

      render(<QuestionnaireListComponents {...props} />);

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('should display questionnaire header with title and buttons', () => {
      render(<QuestionnaireListComponents {...defaultProps} />);

      expect(screen.getByText('Test Questionnaire')).toBeInTheDocument();
      expect(screen.getByText(Dictionary.showDetail)).toBeInTheDocument();
      expect(screen.getByText(Dictionary.duplicate)).toBeInTheDocument();
      expect(screen.getByText(Dictionary.remove)).toBeInTheDocument();
    });

    it('should render questionnaire components', () => {
      render(<QuestionnaireListComponents {...defaultProps} />);

      expect(screen.getByTestId('component-c1')).toBeInTheDocument();
      expect(screen.getByTestId('component-c2')).toBeInTheDocument();
    });

    it('should disable duplicate button when questionnaire is modified', () => {
      const props = {
        ...defaultProps,
        isQuestionnaireModified: true,
      };

      render(<QuestionnaireListComponents {...props} />);

      const duplicateButton = screen.getByText(Dictionary.duplicate);
      expect(duplicateButton).toBeDisabled();
    });

    it('should enable duplicate button when questionnaire is not modified', () => {
      render(<QuestionnaireListComponents {...defaultProps} />);

      const duplicateButton = screen.getByText(Dictionary.duplicate);
      expect(duplicateButton).not.toBeDisabled();
    });
  });

  it('should open questionnaire detail modal when show detail button is clicked', () => {
    render(<QuestionnaireListComponents {...defaultProps} />);

    fireEvent.click(screen.getByText(Dictionary.showDetail));

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('questionnaire-edit')).toBeInTheDocument();
  });

  it('should close questionnaire modal when cancel is clicked', () => {
    render(<QuestionnaireListComponents {...defaultProps} />);

    fireEvent.click(screen.getByText(Dictionary.showDetail));
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText(Dictionary.cancel));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should call duplicateQuestionnaire when duplicate is confirmed', async () => {
    render(<QuestionnaireListComponents {...defaultProps} />);

    fireEvent.click(screen.getByText(Dictionary.duplicate));
    fireEvent.click(screen.getByText(Dictionary.validate));

    await waitFor(() => {
      expect(defaultProps.duplicateQuestionnaire).toHaveBeenCalledWith(
        'q1',
        'test-token',
      );
    });
  });

  it('should call removeQuestionnaire and navigate when removal is confirmed', async () => {
    render(<QuestionnaireListComponents {...defaultProps} />);

    fireEvent.click(screen.getByText(Dictionary.remove));
    fireEvent.click(screen.getByText(Dictionary.validate));

    await waitFor(() => {
      expect(defaultProps.removeQuestionnaire).toHaveBeenCalledWith(
        'q1',
        'test-token',
      );
    });

    await waitFor(() => {
      expect(defaultProps.navigate).toHaveBeenCalledWith('/');
    });
  });

  it('should not render LOOP components in the tree', () => {
    const props = {
      ...defaultProps,
      componentsStore: {
        ...defaultProps.componentsStore,
        c3: {
          id: 'c3',
          label: 'Loop Component',
          type: LOOP,
          parent: 'q1',
          children: [],
        },
        q1: {
          ...defaultProps.componentsStore.q1,
          children: ['c1', 'c2', 'c3'],
        },
      },
    };

    render(<QuestionnaireListComponents {...props} />);

    expect(screen.getByTestId('component-c1')).toBeInTheDocument();
    expect(screen.getByTestId('component-c2')).toBeInTheDocument();
    expect(screen.queryByTestId('component-c3')).not.toBeInTheDocument();
  });

  it('should not render FILTER components in the tree', () => {
    const props = {
      ...defaultProps,
      componentsStore: {
        ...defaultProps.componentsStore,
        c3: {
          id: 'c3',
          label: 'Filter Component',
          type: FILTER,
          parent: 'q1',
          children: [],
        },
        q1: {
          ...defaultProps.componentsStore.q1,
          children: ['c1', 'c2', 'c3'],
        },
      },
    };

    render(<QuestionnaireListComponents {...props} />);

    expect(screen.getByTestId('component-c1')).toBeInTheDocument();
    expect(screen.getByTestId('component-c2')).toBeInTheDocument();
    expect(screen.queryByTestId('component-c3')).not.toBeInTheDocument();
  });
});
