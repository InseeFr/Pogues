import React from 'react';
import { shallow } from 'enzyme';
import { vi } from 'vitest';
import QuestionnaireNav from './questionnaire-nav';

import { QUESTIONNAIRE_NAV } from '../../../constants/dom-constants';
import { noop } from '../../../utils/test/test-utils';

const { COMPONENT_CLASS } = QUESTIONNAIRE_NAV;

// We need to mock this import, otherwise the import of VTL-Editor crashes the test

vi.mock('../component-edit', () => {
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
  const props = {
    questionnaire: {},
    componentsStore: {},
    setSelectedComponentId: noop,
    removeComponent: () => {},
  };

  const wrapper = shallow(<QuestionnaireNav {...props} />);

  test('should render without throwing an error', () => {
    expect(wrapper.is(`.${COMPONENT_CLASS}`)).toBe(true);
  });
});
