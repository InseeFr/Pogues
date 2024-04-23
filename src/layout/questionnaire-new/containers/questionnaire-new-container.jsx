import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setValidationErrors } from '../../../actions/errors';
import { createQuestionnaire } from '../../../actions/questionnaire';
import QuestionnaireNew from '../components/questionnaire-new';
import { useAuth } from '../../../utils/oidc/useAuth';

// PropTypes and defaultProps

export const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

// Container

const mapStateToProps = state => {
  const { oidc } = useAuth(state.authType);
  const token = oidc.getTokens().accessToken;
  return {
    activeQuestionnaire: state.appState.activeQuestionnaire,
    token: token,
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
