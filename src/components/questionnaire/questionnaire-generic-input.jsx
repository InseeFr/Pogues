import React from 'react';
import PropTypes from 'prop-types';

function QuestionnaireGenericInput({ locale, newQuestionPlaceholder }) {
  return (
    <div id="questionnaire-generic-input">
      <span>{locale.addObject}</span>
      <button id="add-question" disabled={!newQuestionPlaceholder ? 'disabled' : false} className="btn-white">
        <span className="glyphicon glyphicon-plus" />Question
      </button>
      <button className="btn-white"><span className="glyphicon glyphicon-plus" />Séquence</button>
      <button className="btn-white"><span className="glyphicon glyphicon-plus" />Sous-séquence</button>
      <button className="btn-white"><span className="glyphicon glyphicon-plus" />Saut de page</button>
      <button className="btn-yellow">Enregistrer<span className="glyphicon glyphicon-floppy-disk" /></button>
      <button className="btn-yellow">Visualizer<span className="glyphicon glyphicon-eye-open" /></button>
      <button className="btn-yellow">Publier<span className="glyphicon glyphicon-share-alt" /></button>
      <button className="btn-yellow">Dupliquer<span className="glyphicon glyphicon-duplicate" /></button>
      <button className="btn-yellow">Supprimer<span className="glyphicon glyphicon-trash" /></button>
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
