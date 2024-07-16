import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import QuestionnaireErrors from '../components/questionnaire-errors';

import { setSelectedComponentId } from '../../../actions/app-state';

// Prop types and default props

const propTypes = {
  errorsByComponent: PropTypes.object,
};

const defaultProps = {
  errorsByComponent: {},
};

// Container

const mapStateToProps = state => ({
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
