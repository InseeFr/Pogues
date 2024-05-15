import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ComponentNew from '../components/component-new';

import { removeComponent } from 'actions/actionComponent';
import { setSelectedComponentId } from 'actions/app-state';
import {
  createComponent,
  orderComponents,
  updateParentChildren,
} from 'actions/component';
import { setValidationErrors } from 'actions/errors';
// PropTypes and defaultProps

export const propTypes = {
  parentId: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

// Container

const mapStateToProps = state => {
  return {
    codesListsStore: state.appState.activeCodeListsById,
    calculatedVariablesStore: state.appState.activeCalculatedVariablesById,
    externalVariablesStore: state.appState.activeExternalVariablesById,
    activeQuestionnaire: state.appState.activeQuestionnaire,
  };
};

const mapDispatchToProps = {
  setValidationErrors,
  createComponent,
  orderComponents,
  updateParentChildren,
  setSelectedComponentId,
  removeComponent,
};

const ComponentNewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentNew);

ComponentNewContainer.propTypes = propTypes;

export default ComponentNewContainer;
