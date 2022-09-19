import React from 'react';
import { useHistory } from 'react-router-dom';

import { QuestionnaireNav } from 'layout/questionnaire-nav';
import { QuestionnaireList } from 'layout/questionnaire-list';

// Prop types and default props

const QuestionnaireComposition = props => {
  const { questionnaire } = props;
  const history = useHistory();

  const routeBackToQuestionnaire = () => {
    const path = `/questionnaire/${questionnaire.id}`;
    history.push(path);
  };
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
