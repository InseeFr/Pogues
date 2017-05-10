import React from 'react';
import PropTypes from 'prop-types';

function QuestionnaireListItem({ label }) {
  // @TODO: Remove the mocked data
  return (
    <div className="questionnaire-list_item">
      <div>{label}</div>
      <div>Téléphone</div>
      <div>10/10/2016</div>
    </div>
  );
}

QuestionnaireListItem.propTypes = {
  label: PropTypes.string.isRequired,
};

export default QuestionnaireListItem;
