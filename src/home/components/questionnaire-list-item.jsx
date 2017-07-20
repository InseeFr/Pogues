import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

function QuestionnaireListItem({ id, label, lastUpdatedDate, collectMode }) {
  if(!lastUpdatedDate){
    lastUpdatedDate = '01/01/2016';
  }
  if(!collectMode){
    collectMode = 'Téléphone';
  }
  // @TODO: Remove the mocked data
  return (
    <div className="questionnaire-list_item">
      <div>
        <span className="glyphicon glyphicon-chevron-right" />
        <Link to={`/questionnaire/${id}`}>{label}</Link>
      </div>
      <div>{collectMode}</div>
      <div>{lastUpdatedDate}</div>
    </div>
  );
}

QuestionnaireListItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  lastUpdatedDate: PropTypes.string,
  collectMode: PropTypes.string,
};

export default QuestionnaireListItem;
