import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formPropTypes, getFormSubmitErrors } from 'redux-form';

import ComponentNewEditForm from './component-new-edit-form';

import { setTabErrors, clearTabErrors } from 'actions/app-state';

// Prop types and default props

export const propTypes = {
  ...formPropTypes,
  type: PropTypes.string.isRequired,
  componentId: PropTypes.string,
};

export const defaultProps = {
  componentId: '',
};

// Container

const mapStateToProps = state => ({
  errorsValidation: getFormSubmitErrors('component')(state),
  errorsByQuestionTab: state.appState.errorsByQuestionTab,
});

const mapDispatchToProps = {
  setTabErrors,
  clearTabErrors,
};

const ComponentNewEditContainer = connect(mapStateToProps, mapDispatchToProps)(ComponentNewEditForm);

ComponentNewEditContainer.propTypes = propTypes;
ComponentNewEditContainer.defaultProps = defaultProps;
