import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';

import { APP } from '../../../constants/dom-constants';
import { noop } from '../../../utils/test/test-utils';
import QuestionnaireNav from './questionnaire-nav';

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
      <div id={APP.COMPONENT_ID}>
        <Router>
          <QuestionnaireNav {...props} />
        </Router>
      </div>,
    );

    const questionnaireNav = document.querySelector('.questionnaire-nav');
    expect(questionnaireNav).not.toBeNull();
  });
});
