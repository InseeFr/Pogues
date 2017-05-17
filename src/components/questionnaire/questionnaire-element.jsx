import React from 'react';
import PropTypes from 'prop-types';

import QuestionnaireSequence from 'components/questionnaire/questionnaire-sequence';
import QuestionnaireQuestion from 'components/questionnaire/questionnaire-question';

function QuestionnaireElement({ elementParams, getSelected, toggleSelect }) {
  let element;
  const { id, type, label, name, childCmpnts } = elementParams;
  switch (type) {
    case 'SEQUENCE':
      element = (
        <QuestionnaireSequence
          getSelected={getSelected}
          toggleSelect={toggleSelect}
          id={id}
          name={name}
          label={label}
          childCmpnts={childCmpnts}
        />
      );
      break;
    case 'QUESTION':
      element = (
        <QuestionnaireQuestion
          getSelected={getSelected}
          toggleSelect={toggleSelect}
          id={id}
          name={name}
          label={label}
        />
      );
      break;
    default:
  }

  return <div className="questionnaire-element">{element}</div>;
}

QuestionnaireElement.propTypes = {
  elementParams: PropTypes.object.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  getSelected: PropTypes.func.isRequired,
};

export default QuestionnaireElement;
