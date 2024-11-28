import React from 'react';

import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';

import { QUESTIONNAIRE_NAV } from '../../../constants/dom-constants';
import { noop } from '../../../utils/test/test-utils';
import QuestionnaireNav from './questionnaire-nav';

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
