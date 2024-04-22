import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateActiveQuestionnaire } from '../../../actions/app-state';
import { updateComponent } from '../../../actions/component';
import QuestionnaireEdit from '../components/questionnaire-edit';

// PropTypes and defaultProps

export const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

// Container

const mapStateToProps = state => {
  return {
    questionnaire: state.appState.activeQuestionnaire,
    componentsStore: state.appState.activeComponentsById,
    activeCalculatedVariablesById: state.appState.activeCalculatedVariablesById,
    activeExternalVariablesById: state.appState.activeExternalVariablesById,
    activeCollectedVariablesById: state.appState.activeCollectedVariablesById,
    activeCodeListsById: state.appState.activeCodeListsById,
  };
};

const mapDispatchToProps = {
  updateActiveQuestionnaire,
  updateComponent,
};

const QuestionnaireEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionnaireEdit);

QuestionnaireEditContainer.propTypes = propTypes;

export default QuestionnaireEditContainer;
