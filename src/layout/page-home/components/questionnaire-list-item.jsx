import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { formatDate, getState } from 'utils/component/component-utils';

function QuestionnaireListItem({ id, label, lastUpdatedDate, final }) {
  return (
    <div className="questionnaire-list_item">
      <div>
        <span className="glyphicon glyphicon-chevron-right" />
        <Link to={`/questionnaire/${id}`}>
          {label}
        </Link>
      </div>
      <div>
        {getState(final)}
      </div>
      <div>
        {lastUpdatedDate && formatDate(lastUpdatedDate)}
      </div>
    </div>
  );
}

QuestionnaireListItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  lastUpdatedDate: PropTypes.string,
  final: PropTypes.bool,
};

QuestionnaireListItem.defaultProps = {
  final: false,
  lastUpdatedDate: '',
};

export default QuestionnaireListItem;
