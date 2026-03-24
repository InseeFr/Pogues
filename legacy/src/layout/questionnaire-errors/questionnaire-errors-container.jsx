import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setSelectedComponentId } from '../../actions/app-state';
import QuestionnaireErrors from './questionnaire-errors';

// Prop types and default props

const propTypes = {
  errorsByComponent: PropTypes.object,
};

const defaultProps = {
  errorsByComponent: {},
};

// Container

const mapStateToProps = (state) => ({
  components: state.appState.activeComponentsById,
});

const mapDispatchToProps = {
  setSelectedComponentId,
};

const QuestionnaireErrorsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionnaireErrors);

QuestionnaireErrorsContainer.propTypes = propTypes;
QuestionnaireErrorsContainer.defaultProps = defaultProps;
