import { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { QuestionnaireList } from '../questionnaire-list';
import { QuestionnaireNav } from '../questionnaire-nav';

// Prop types and default props

const QuestionnaireMerge = ({ id }) => {
  const history = useHistory();

  const routeBackToQuestionnaire = useCallback(() => {
    const path = `/questionnaire/${id}`;
    history.push(path);
  }, [history, id]);

  return (
    <div id="questionnaire-composition">
      <QuestionnaireNav />
      <div id="composition">
        <QuestionnaireList
          isFusion
          handleCloseNewQuestionnaire={routeBackToQuestionnaire}
        />
      </div>
    </div>
  );
};

export default QuestionnaireMerge;
