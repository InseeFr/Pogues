import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { QuestionnaireNav } from 'layout/questionnaire-nav';
import { QuestionnaireList } from 'layout/questionnaire-list';

// Prop types and default props

const QuestionnaireMerge = () => {
  const history = useHistory();
  const { id } = useParams();

  const routeBackToQuestionnaire = () => {
    const path = `/questionnaire/${id}`;
    history.push(path);
  };
  return (
    <div id="questionnaire-composition">
      <QuestionnaireNav />
      <div id="composition">
        <QuestionnaireList
          fusion
          handleCloseNewQuestionnaire={routeBackToQuestionnaire}
        />
      </div>
    </div>
  );
};

export default QuestionnaireMerge;
