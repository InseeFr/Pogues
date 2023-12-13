import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ArboSimplified from './arbo-simplifield';
import NavLoop from './nav-loop';

import { QUESTIONNAIRE_NAV } from '../../../constants/dom-constants';
import Dictionary from '../../../utils/dictionary/dictionary';

const { COMPONENT_CLASS } = QUESTIONNAIRE_NAV;

// PropTypes and defaultProps

const propTypes = {
  questionnaire: PropTypes.object.isRequired,
  componentsStore: PropTypes.object.isRequired,
  setSelectedComponentId: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired,
};

// Component
const QuestionnaireNav = props => {
  const {
    questionnaire,
    componentsStore,
    setSelectedComponentId,
    setEditingComponentId,
    editingComponentId,
    removeComponent,
  } = props;

  return (
    <div className={COMPONENT_CLASS}>
      <div className="nav-style">
        <ul>
          <li>
            <span className="glyphicon glyphicon-home" />
            <Link to="/">{Dictionary.backToHomePage}</Link>
          </li>
        </ul>

        <ArboSimplified
          components={componentsStore}
          questionnaire={questionnaire}
          setSelectedComponentId={setSelectedComponentId}
        />
      </div>
      <div className="nav-style">
        <span className="nav-title">{Dictionary.loop}</span>
        <NavLoop
          componentsStore={componentsStore}
          questionnaire={questionnaire}
          setSelectedComponentId={setSelectedComponentId}
          setEditingComponentId={setEditingComponentId}
          editingComponentId={editingComponentId}
          removeComponent={removeComponent}
        />
      </div>
    </div>
  );
};

QuestionnaireNav.propTypes = propTypes;

export default QuestionnaireNav;
