import { shallow } from 'enzyme';
import { describe, expect, test, vi } from 'vitest';

import { noop } from '../../utils/test/test-utils';
import QuestionnaireList from './questionnaire-list';

vi.mock('@/auth/context');

describe('<QuestionnaireList />', () => {
  const wrapperWithoutQuestionnaires = shallow(
    <QuestionnaireList
      loadQuestionnaireList={noop}
      duplicateQuestionnaire={() => {}}
      handleNewChildQuestionnaireRef={() => {}}
      activeQuestionnaire={{}}
    />,
  );

  test('should render without throwing an error', () => {
    expect(wrapperWithoutQuestionnaires.is('.home-questionnaires')).toBe(false);
  });
});
