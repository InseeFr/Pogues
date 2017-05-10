import React from 'react';
import PropTypes from 'prop-types';

import QuestionnaireListItem from './questionnaire-list-item';

function QuestionnaireList({ questionnaires }) {
  const list = questionnaires.map(q => {
    return <QuestionnaireListItem key={q.id} questionnaire={q} />;
  });

  return (
    <div id="questionnaire-list">
      {questionnaires.length > 0 ? list : <div className="list-noresults">Aucun questionnaire</div>}
    </div>
  );
}

QuestionnaireList.propTypes = {
  questionnaires: PropTypes.array,
};

QuestionnaireList.defaultProps = {
  questionnaires: [],
};

export default QuestionnaireList;
