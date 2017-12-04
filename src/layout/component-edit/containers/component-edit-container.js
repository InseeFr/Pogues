import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ComponentEdit from '../components/component-edit';

import { setErrorsByFormPath } from 'actions/errors';
import { updateComponent } from 'actions/component';

// PropTypes and defaultProps

export const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

// Container

const mapStateToProps = state => {
  const componentsStore = state.appState.activeComponentsById;

  return {
    component: componentsStore[state.appState.editingComponentId] || {},
    codesListsStore: state.appState.activeCodeListsById,
    calculatedVariablesStore: state.appState.activeCalculatedVariablesById,
    externalVariablesStore: state.appState.activeExternalVariablesById,
    collectedVariablesStore: state.appState.collectedVariableByQuestion[state.appState.editingComponentId],
  };
};

const mapDispatchToProps = {
  setErrors: setErrorsByFormPath,
  updateComponent,
};

const ComponentEditContainer = connect(mapStateToProps, mapDispatchToProps)(ComponentEdit);

ComponentEditContainer.propTypes = propTypes;

export default ComponentEditContainer;