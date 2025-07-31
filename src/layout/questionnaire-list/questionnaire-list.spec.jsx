import { shallow } from 'enzyme';
import { describe, expect, test } from 'vitest';

import { OidcProvider } from '../../utils/oidc';
import { noop } from '../../utils/test/test-utils';
import QuestionnaireList from './questionnaire-list';

describe('<QuestionnaireList />', () => {
  const wrapperWithoutQuestionnaires = shallow(
    <OidcProvider>
      <QuestionnaireList
        loadQuestionnaireList={noop}
        duplicateQuestionnaire={() => {}}
        handleNewChildQuestionnaireRef={() => {}}
        activeQuestionnaire={{}}
      />
    </OidcProvider>,
  );

  test('should render without throwing an error', () => {
    expect(wrapperWithoutQuestionnaires.is('.home-questionnaires')).toBe(false);
  });
});
