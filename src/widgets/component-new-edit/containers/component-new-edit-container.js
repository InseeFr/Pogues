import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { formPropTypes, getFormSubmitErrors } from 'redux-form';
import { formPropTypes } from 'redux-form';

import ComponentNewEdit from '../components/component-new-edit';

// import { setTabErrors, clearTabErrors } from 'actions/app-state';
import { setErrorsByTab, setErrorsByFormPath } from 'actions/errors';

// Prop types and default props

export const propTypes = {
  ...formPropTypes,
  componentType: PropTypes.string.isRequired,
};

// Container

const mapStateToProps = state => ({
  // errorsValidation: getFormSubmitErrors('component')(state),
  // errorsByQuestionTab: state.appState.errorsByQuestionTab,
  errorsByTab: state.errors.errorsByTab,
  integrityErrors: state.errors.errorsByComponent[state.appState.editingComponentId],
  componentId: state.appState.editingComponentId,
  componentsStore: state.appState.activeComponentsById,
});

const mapDispatchToProps = {
  // setTabErrors,
  // clearTabErrors,
  setErrorsByTab,
  setErrorsByFormPath,
};

const ComponentNewEditContainer = connect(mapStateToProps, mapDispatchToProps)(ComponentNewEdit);

ComponentNewEditContainer.propTypes = propTypes;

export default ComponentNewEditContainer;
