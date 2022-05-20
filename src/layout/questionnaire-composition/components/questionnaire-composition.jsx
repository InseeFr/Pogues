import React from 'react';

import { QuestionnaireNav } from 'layout/questionnaire-nav';
import { QuestionnaireList } from 'layout/questionnaire-list';

// Prop types and default props

const QuestionnaireComposition = () => {
  return (
    <div id="questionnaire-composition">
      <QuestionnaireNav />
      <div id="composition">
        <QuestionnaireList isComposition />
      </div>
    </div>
  );
};

export default QuestionnaireComposition;
