import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeComponent } from '../../actions/actionComponent';
import { setSelectedComponentId } from '../../actions/app-state';
import {
  createComponent,
  orderComponents,
  updateParentChildren,
} from '../../actions/component';
import { setValidationErrors } from '../../actions/errors';
import ComponentNew from './component-new';

const mapStateToProps = (state) => {
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

ComponentNewContainer.propTypes = {
  parentId: PropTypes.string,
  weight: PropTypes.number,
  type: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

ComponentNewContainer.defaultProps = {
  parentId: undefined,
  weight: undefined,
};

export default ComponentNewContainer;
