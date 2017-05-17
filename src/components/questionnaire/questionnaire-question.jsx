import React from 'react';
import PropTypes from 'prop-types';

function QuestionnaireQuestion({ id, label, name, getSelected, toggleSelect }) {
  return (
    <div
      className="question questionnaire-element-info"
      onClick={() => toggleSelect(id)}
    >
      <div className="questionnaire-element-name">
        {name}
      </div>
      <div className="questionnaire-element-label">
        {label}
      </div>
      {getSelected() === id
        ? <div className="questionnaire-element-actions">
            <button className="btn-yellow">Voir le détail</button>
            <button className="btn-yellow">Dupliquer</button>
            <button className="btn-yellow">Supprimer</button>
          </div>
        : ''}
    </div>
  );
}

QuestionnaireQuestion.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  getSelected: PropTypes.func.isRequired,
  toggleSelect: PropTypes.func.isRequired,
};

export default QuestionnaireQuestion;
