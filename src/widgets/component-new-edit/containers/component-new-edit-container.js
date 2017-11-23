import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formPropTypes, getFormSubmitErrors } from 'redux-form';

import ComponentNewEdit from '../components/component-new-edit';

import { setTabErrors, clearTabErrors } from 'actions/app-state';

// Prop types and default props

export const propTypes = {
  ...formPropTypes,
  componentType: PropTypes.string.isRequired,
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

const ComponentNewEditContainer = connect(mapStateToProps, mapDispatchToProps)(ComponentNewEdit);

ComponentNewEditContainer.propTypes = propTypes;
ComponentNewEditContainer.defaultProps = defaultProps;

export default ComponentNewEditContainer;
