import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ComponentEdit from '../components/component-edit';

import { setErrors } from 'actions/errors';
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
  };
};

const mapDispatchToProps = {
  setErrors,
  updateComponent,
};

const ComponentEditContainer = connect(mapStateToProps, mapDispatchToProps)(ComponentEdit);

ComponentEditContainer.propTypes = propTypes;

export default ComponentEditContainer;
