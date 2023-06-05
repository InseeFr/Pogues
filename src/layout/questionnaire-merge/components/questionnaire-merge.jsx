import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { QuestionnaireNav } from 'layout/questionnaire-nav';
import { QuestionnaireList } from 'layout/questionnaire-list';

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
