import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ComponentNew from '../components/component-new';

import { setErrorsByFormPath } from 'actions/errors';
import { createComponent, orderComponents, updateParentChildren } from 'actions/components';
import { setSelectedComponentId } from 'actions/app-state';

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
  };
};

const mapDispatchToProps = {
  setErrors: setErrorsByFormPath,
  createComponent,
  orderComponents,
  updateParentChildren,
  setSelectedComponentId,
};

const ComponentNewContainer = connect(mapStateToProps, mapDispatchToProps)(ComponentNew);

ComponentNewContainer.propTypes = propTypes;

export default ComponentNewContainer;