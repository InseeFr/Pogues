import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Dictionary from 'utils/dictionary/dictionary';

import { WIDGET_LIST_WITH_INPUT_PANEL } from 'constants/dom-constants';
import { formatDate, getState } from 'utils/component/component-utils';

const {
  BUTTON_DUPLICATE_CLASS,
} = WIDGET_LIST_WITH_INPUT_PANEL;

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

function QuestionnaireListItem({ id, label, lastUpdatedDate, final, duplicateQuestionnaire }) {
  return (
    <div className="questionnaire-list_item">
      <div>
          <span className="glyphicon glyphicon-chevron-right" />
          <Link to={`/questionnaire/${id}`}>{label}</Link>
          <button
            type="button"
            style={{float:"right"}}
            className={BUTTON_DUPLICATE_CLASS}
            onClick={event => {
              event.preventDefault();
              duplicateQuestionnaire(id);
            }}
          >
            {Dictionary.duplicate}
          </button>
        
        </div>
      <div>{getState(final)}</div>
      <div>{lastUpdatedDate && formatDate(lastUpdatedDate)}</div>
    </div>
  );
}

QuestionnaireListItem.propTypes = propTypes;

QuestionnaireListItem.defaultProps = defaultProps;
export default QuestionnaireListItem;
