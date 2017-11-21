import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createQuestionnaire } from 'actions/questionnaire';
import { setErrors } from 'actions/errors';
import QuestionnaireNew from '../components/questionnaire-new';

// PropTypes and defaultProps

export const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

// Container

const mapStateToProps = state => {
  return {
    user: state.appState.user,
  };
};

const mapDispatchToProps = {
  createQuestionnaire,
  setErrors,
};

const QuestionnaireNewContainer = connect(mapStateToProps, mapDispatchToProps)(QuestionnaireNew);

QuestionnaireNewContainer.propTypes = propTypes;

export default QuestionnaireNewContainer;
