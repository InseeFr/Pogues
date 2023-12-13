import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { QuestionnaireNav } from '../../questionnaire-nav';
import { QuestionnaireList } from '../../questionnaire-list';

// Prop types and default props

const QuestionnaireTcmComposition = props => {
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
          isTcm
          handleCloseNewQuestionnaire={routeBackToQuestionnaire}
        />
      </div>
    </div>
  );
};

export default QuestionnaireTcmComposition;
