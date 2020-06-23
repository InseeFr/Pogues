import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ArboSimplified from './arbo-simplifield';

import { QUESTIONNAIRE_NAV } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';

const { COMPONENT_CLASS } = QUESTIONNAIRE_NAV;

// PropTypes and defaultProps

const propTypes = {
  questionnaire: PropTypes.object.isRequired,
  componentsStore: PropTypes.object.isRequired,
  setSelectedComponentId: PropTypes.func.isRequired,
};

// Component
function QuestionnaireNav({
  questionnaire,
  componentsStore,
  setSelectedComponentId,
}) {
  return (
    <div className={COMPONENT_CLASS}>
      <ul>
        <li>
          <span className="glyphicon glyphicon-home" />
           <Link to="/">
              {Dictionary.backToHomePage}
           </Link>
        </li>
      </ul>
      <ArboSimplified
        components={componentsStore}
        questionnaire={questionnaire}
        setSelectedComponentId={setSelectedComponentId}
      />
    </div>
  );
}

QuestionnaireNav.propTypes = propTypes;

export default QuestionnaireNav;
