import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { WIDGET_LIST_WITH_INPUT_PANEL } from '../../../constants/dom-constants';
import { TargetMode } from '../../../constants/pogues-constants';
import { formatDate } from '../../../utils/component/component-utils';
import Dictionary from '../../../utils/dictionary/dictionary';

const { BUTTON_DUPLICATE_CLASS } = WIDGET_LIST_WITH_INPUT_PANEL;
function QuestionnaireListItem({
  id,
  label,
  lastUpdatedDate,
  isHome,
  handleAction,
  actionLabel,
  activeQuestionnaireTargetMode,
  questionnaireTargetMode,
  sameFormulaLanguage,
  sameDynamic,
}) {
  const modesEvolution = mode => {
    if (activeQuestionnaireTargetMode.includes(mode.value)) {
      return questionnaireTargetMode.includes(mode.value) ? '=' : '-';
    }
    return questionnaireTargetMode.includes(mode.value) && '+';
  };

  return (
    <div className="questionnaire-list_item">
      <div className="questionnaire-list-item-header">
        <div className="question-list-item-name-modes">
          {isHome ? (
            <div className="question-list-item-name">
              <span className="glyphicon glyphicon-chevron-right" />
              <Link to={`/questionnaire/${id}`}>{label}</Link>
            </div>
          ) : (
            <>
              <div className="question-list-item-name">
                <span className="glyphicon glyphicon-chevron-right" />
                {label}
              </div>

              <div className="question-list-item-modes">
                {TargetMode.map(mode => (
                  <div key={mode.value} className="question-list-item-mode">
                    {modesEvolution(mode) && (
                      <>
                        {`${modesEvolution(mode)} `}
                        <span className="item-mode">{mode.label}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="check-button">
        {isHome ||
        activeQuestionnaireTargetMode.find(activetargetMode =>
          questionnaireTargetMode.includes(activetargetMode),
        ) ? (
          <button
            type="button"
            className={BUTTON_DUPLICATE_CLASS}
            aria-label={actionLabel}
            onClick={event => {
              if (isHome) event.preventDefault();
              handleAction(id, label);
            }}
          >
            {actionLabel}
          </button>
        ) : (
          <>
            {(!sameDynamic || !sameFormulaLanguage) && (
              <>
                {!sameDynamic && <div>{Dictionary.incompatibleDynamic}</div>}
                {!sameFormulaLanguage && (
                  <div>{Dictionary.incompatibleFormulaLanguage}</div>
                )}
              </>
            )}
            {sameDynamic && sameFormulaLanguage && (
              <div>{Dictionary.noCommonMode}</div>
            )}
          </>
        )}
      </div>
      <div>{lastUpdatedDate && formatDate(lastUpdatedDate)}</div>
    </div>
  );
}

QuestionnaireListItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  lastUpdatedDate: PropTypes.string,
  isHome: PropTypes.bool.isRequired,
  handleAction: PropTypes.func.isRequired,
  actionLabel: PropTypes.string.isRequired,
  activeQuestionnaireTargetMode: PropTypes.arrayOf(PropTypes.string),
  questionnaireTargetMode: PropTypes.arrayOf(PropTypes.string),
};

QuestionnaireListItem.defaultProps = {
  lastUpdatedDate: '',
  activeQuestionnaireTargetMode: [],
  questionnaireTargetMode: [],
};

export default QuestionnaireListItem;
