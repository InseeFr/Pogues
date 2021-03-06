import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dictionary from 'utils/dictionary/dictionary';

import { WIDGET_LIST_WITH_INPUT_PANEL } from 'constants/dom-constants';
import { formatDate, getState } from 'utils/component/component-utils';

const { BUTTON_DUPLICATE_CLASS } = WIDGET_LIST_WITH_INPUT_PANEL;
// Prop types and default props

const propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  lastUpdatedDate: PropTypes.string,
  final: PropTypes.bool,
};

const defaultProps = {
  final: false,
  lastUpdatedDate: '',
};

// Component

function QuestionnaireListItem({
  id,
  label,
  lastUpdatedDate,
  final,
  handleOpenPopup,
  handelCheck,
  fusion,
}) {
  return (
    <div className="questionnaire-list_item">
      <div className="question-list-item-name">
        <span className="glyphicon glyphicon-chevron-right" />
        <Link to={`/questionnaire/${id}`}>{label}</Link>
        <div className="check-button">
          {fusion ? (
            <input
              type="radio"
              name="questionId"
              onChange={event => handelCheck(event.target.value)}
              value={id}
              style={{ height: '20px', width: '20px', marginRight: '30px' }}
            />
          ) : (
            <button
              type="button"
              style={{ float: 'right' }}
              className={BUTTON_DUPLICATE_CLASS}
              aria-label={Dictionary.duplicate}
              onClick={event => {
                event.preventDefault();
                handleOpenPopup(id, label);
              }}
            >
              {Dictionary.duplicate}
            </button>
          )}
        </div>
      </div>
      <div>{getState(final)}</div>
      <div>{lastUpdatedDate && formatDate(lastUpdatedDate)}</div>
    </div>
  );
}

QuestionnaireListItem.propTypes = propTypes;

QuestionnaireListItem.defaultProps = defaultProps;
export default QuestionnaireListItem;
