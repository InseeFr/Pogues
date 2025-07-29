import { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { QuestionnaireList } from '../questionnaire-list';
import { QuestionnaireNav } from '../questionnaire-nav';

// Prop types and default props

const QuestionnaireComposition = (props) => {
  const { questionnaire } = props;
  const history = useHistory();

  const routeBackToQuestionnaire = useCallback(() => {
    const path = `/questionnaire/${questionnaire.id}`;
    history.push(path);
  }, [history, questionnaire.id]);

  return (
    <div id="questionnaire-composition">
      <QuestionnaireNav />
      <div id="composition">
        <QuestionnaireList
          isComposition
          handleCloseNewQuestionnaire={routeBackToQuestionnaire}
        />
      </div>
    </div>
  );
};

export default QuestionnaireComposition;
