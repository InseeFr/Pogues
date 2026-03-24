import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateComponent } from '../../actions/actionComponent';
import { setValidationErrors } from '../../actions/errors';
import ComponentEdit from './component-edit';

// PropTypes and defaultProps

export const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

// Container

const mapStateToProps = (state) => {
  const componentsStore = state.appState.activeComponentsById;

  return {
    component: componentsStore[state.appState.editingComponentId] || {},
    codesListsStore: state.appState.activeCodeListsById,
    calculatedVariablesStore: state.appState.activeCalculatedVariablesById,
    externalVariablesStore: state.appState.activeExternalVariablesById,
    collectedVariablesStore:
      state.appState.collectedVariableByQuestion[
        state.appState.editingComponentId
      ],
    activeQuestionnaire: state.appState.activeQuestionnaire,
  };
};

const mapDispatchToProps = {
  setValidationErrors,
  updateComponent,
};

const ComponentEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentEdit);

ComponentEditContainer.propTypes = propTypes;

export default ComponentEditContainer;
