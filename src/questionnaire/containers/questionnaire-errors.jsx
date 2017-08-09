import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionnaireErrors from 'questionnaire/components/questionnaire-errors';
import { setSelectedComponentId } from 'actions/app-state';

const mapStateToProps = state => {
  return {
    errorsByComponent: state.appState.errorsByComponent,
    components: state.appState.activeComponentsById,
  };
};

function QuestionnaireErrorsContainer({ errorsByComponent, components, setSelectedComponentId }) {
  return <QuestionnaireErrors errorsByComponent={errorsByComponent} components={components} setSelectedComponentId={setSelectedComponentId}/>;
}

const mapDispatchToProps = {
  setSelectedComponentId,
};

QuestionnaireErrorsContainer.propTypes = {
  errorsByComponent: PropTypes.object,
  components: PropTypes.object,
  setSelectedComponentId: PropTypes.func.isRequired,
};

QuestionnaireErrorsContainer.defaultProps = {
  errorsByComponent: {},
  components: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireErrorsContainer);
