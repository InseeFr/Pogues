import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import QuestionnaireNav from './questionnaire-nav';
import { QUESTIONNAIRE_NAV } from '../../../constants/dom-constants';
import { noop } from '../../../utils/test/test-utils';

const { COMPONENT_CLASS } = QUESTIONNAIRE_NAV;

// We need to mock this import, otherwise the import of VTL-Editor crashes the test

vi.mock('../../component-edit', () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
    ComponentEdit: () => {
      return <div />;
    },
  };
});

describe('<QuestionnaireNav />', () => {
  test('should render without throwing an error', () => {
    const props = {
      questionnaire: {},
      componentsStore: {},
      setSelectedComponentId: noop,
      removeComponent: () => {},
    };

    render(
      <Router>
        <QuestionnaireNav {...props} />
      </Router>,
    );

    const questionnaireNav = document.querySelector(`.${COMPONENT_CLASS}`);
    expect(questionnaireNav).not.toBeNull();
  });
});
