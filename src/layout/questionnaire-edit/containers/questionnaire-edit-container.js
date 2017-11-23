import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateActiveQuestionnaire } from 'actions/app-state';
import { setErrors } from 'actions/errors';
import { updateComponent } from 'actions/component';
import QuestionnaireEdit from '../components/questionnaire-edit';

// PropTypes and defaultProps

export const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

// Container

const mapStateToProps = state => {
  console.log(state.appState.activeQuestionnaire)
  return {
    questionnaire: state.appState.activeQuestionnaire,
    componentsStore: state.appState.activeComponentsById,
  };
};

const mapDispatchToProps = {
  updateActiveQuestionnaire,
  updateComponent,
  setErrors,
};

const QuestionnaireEditContainer = connect(mapStateToProps, mapDispatchToProps)(QuestionnaireEdit);

QuestionnaireEditContainer.propTypes = propTypes;

export default QuestionnaireEditContainer;
