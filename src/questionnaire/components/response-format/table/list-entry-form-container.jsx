import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getFormValues,
  getFormInitialValues,
  getFormSyncErrors,
  getFormMeta,
  getFormAsyncErrors,
  getFormSyncWarnings,
  getFormSubmitErrors,
  getFormNames,
  isDirty,
  isPristine,
  isValid,
  isInvalid,
  isSubmitting,
  hasSubmitSucceeded,
  hasSubmitFailed,
  actions,
} from 'redux-form';

import ListEntryForm from './list-entry-form';

function getPartialInitialValues(values, initialValues, ids) {
  let currentId;
  let valuesRef = values;
  let initialValuesRef = initialValues;
  if (ids.length === 0) return initialValues;

  while (ids.length > 0) {
    currentId = ids.shift();
    if (ids.length === 0) {
      valuesRef[currentId] = initialValuesRef[currentId];
    }
    valuesRef = valuesRef[currentId];
    initialValuesRef = initialValuesRef[currentId];
  }

  return values;
}

function getDeepObjectReference(object, ids) {
  if (!object) return object;

  let result = object;
  let currentId;
  while (ids.length > 0) {
    currentId = ids.shift();
    result = result[currentId];
  }
  return result;
}

function validate(errors, values, selectorPath, touch) {
  const currentErrors = getDeepObjectReference(errors, selectorPath.split('.'));
  const currentValues = getDeepObjectReference(values, selectorPath.split('.'));
  // touch('question', `${this.selectorPathComposed}.label`);
}

const mapStateToProps = state => {
  return {
    initialValues: getFormInitialValues('question')(state),
    values: getFormValues('question')(state),
    errors: getFormSyncErrors('question')(state),
  };
};

const mapDispatchToProps = {
  touch: actions.touch,
  initialize: actions.initialize,
};

class ListEntryFormContainer extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset(event) {
    event.preventDefault();
    const { initialValues, values, selectorPath, initialize } = this.props;
    const partialInitialValues = getPartialInitialValues(values, initialValues, selectorPath.split('.'));
    initialize('question', partialInitialValues);
  }
  submit(event) {
    event.preventDefault();
    const { submit, errors, values, touch, selectorPath } = this.props;
    submit();
    // if (validate(errors, values, selectorPath, touch)) {
    //   submit();
    // }
  }
  render() {
    const { inputView } = this.props;
    return <ListEntryForm reset={this.reset} submit={this.submit} inputView={inputView} />;
  }
}

ListEntryFormContainer.propTypes = {
  inputView: PropTypes.object.isRequired,
  selectorPath: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  touch: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
};

ListEntryFormContainer.defaultProps = {
  initialValues: {},
  values: {},
  errors: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ListEntryFormContainer);
