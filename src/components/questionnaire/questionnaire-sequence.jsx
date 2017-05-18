import React from 'react';
import PropTypes from 'prop-types';
import classSet from 'react-classset';

import QuestionnaireElement from 'components/questionnaire/questionnaire-element';

function QuestionnaireSequence({ childCmpnts, id, label, name, getSelected, toggleSelect }) {
  const childsRendered = childCmpnts.map(elementParams => {
    return (
      <QuestionnaireElement
        key={elementParams.id}
        elementParams={elementParams}
        getSelected={getSelected}
        toggleSelect={toggleSelect}
      />
    );
  });

  return (
    <div className="questionnaire-sequence">
      <div
        className={classSet({
          'questionnaire-element-info': true,
          selected: id === getSelected(),
        })}
        role="button"
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
      {childsRendered}
    </div>
  );
}

QuestionnaireSequence.propTypes = {
  childCmpnts: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  getSelected: PropTypes.func.isRequired,
  toggleSelect: PropTypes.func.isRequired,
};

export default QuestionnaireSequence;
