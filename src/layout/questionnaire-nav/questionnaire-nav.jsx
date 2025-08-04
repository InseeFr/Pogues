import PropTypes from 'prop-types';

import Dictionary from '../../utils/dictionary/dictionary';
import ArboSimplified from './components/arbo-simplified';
import NavLoop from './components/nav-loop';

// PropTypes and defaultProps

const propTypes = {
  questionnaire: PropTypes.object.isRequired,
  componentsStore: PropTypes.object.isRequired,
  setSelectedComponentId: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired,
};

// Component
const QuestionnaireNav = (props) => {
  const {
    questionnaire,
    componentsStore,
    setSelectedComponentId,
    setEditingComponentId,
    editingComponentId,
    removeComponent,
  } = props;

  return (
    <div className="questionnaire-nav">
      <div className="nav-style">
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
