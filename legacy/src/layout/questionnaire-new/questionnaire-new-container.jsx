import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setValidationErrors } from '../../actions/errors';
import { createQuestionnaire } from '../../actions/questionnaire';
import QuestionnaireNew from './questionnaire-new';

// PropTypes and defaultProps

export const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

// Container

const mapStateToProps = (state) => {
  return {
    activeQuestionnaire: state.appState.activeQuestionnaire,
  };
};

const mapDispatchToProps = {
  createQuestionnaire,
  setErrors: setValidationErrors,
};

const QuestionnaireNewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionnaireNew);

QuestionnaireNewContainer.propTypes = propTypes;

export default QuestionnaireNewContainer;
