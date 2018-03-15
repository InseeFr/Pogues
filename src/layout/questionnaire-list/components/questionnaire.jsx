import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { formatDate, getState } from 'utils/component/component-utils';

// Prop types and default props

const propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  lastUpdatedDate: PropTypes.string,
  final: PropTypes.bool
};

const defaultProps = {
  final: false,
  lastUpdatedDate: ''
};

// Component

function QuestionnaireListItem({ id, label, lastUpdatedDate, final }) {
  return (
    <div className="questionnaire-list_item">
      <div>
        <span className="glyphicon glyphicon-chevron-right" />
        <Link to={`/questionnaire/${id}`}>{label}</Link>
      </div>
      <div>{getState(final)}</div>
      <div>{lastUpdatedDate && formatDate(lastUpdatedDate)}</div>
    </div>
  );
}

QuestionnaireListItem.propTypes = propTypes;

QuestionnaireListItem.defaultProps = defaultProps;
export default QuestionnaireListItem;
