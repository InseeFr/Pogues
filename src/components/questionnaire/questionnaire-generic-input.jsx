import React from 'react';
import PropTypes from 'prop-types';

function QuestionnaireGenericInput({ locale, newQuestionPlaceholder }) {
  return (
    <div id="questionnaire-generic-input">
      <span>{locale.addObject}</span>
      <button id="add-question" disabled={!newQuestionPlaceholder ? 'disabled' : false} className="btn-white">
        <span className="glyphicon glyphicon-plus" />{locale.question}
      </button>
      <button className="btn-white"><span className="glyphicon glyphicon-plus" />{locale.sequence}</button>
      <button className="btn-white"><span className="glyphicon glyphicon-plus" />{locale.subSequence}</button>
      <button className="btn-white"><span className="glyphicon glyphicon-plus" />{locale.pageBreak}</button>
      <button className="btn-yellow">{locale.save}<span className="glyphicon glyphicon-floppy-disk" /></button>
      <button className="btn-yellow">{locale.visualise}<span className="glyphicon glyphicon-eye-open" /></button>
      <button className="btn-yellow">{locale.publishQuestionnaire}<span className="glyphicon glyphicon-share-alt" /></button>
      <button className="btn-yellow">{locale.duplicate}<span className="glyphicon glyphicon-duplicate" /></button>
      <button className="btn-yellow">{locale.remove}<span className="glyphicon glyphicon-trash" /></button>
    </div>
  );
}

QuestionnaireGenericInput.propTypes = {
  locale: PropTypes.object.isRequired,
  newQuestionPlaceholder: PropTypes.string,
};

QuestionnaireGenericInput.defaultProps = {
  newQuestionPlaceholder: undefined,
};

export default QuestionnaireGenericInput;
