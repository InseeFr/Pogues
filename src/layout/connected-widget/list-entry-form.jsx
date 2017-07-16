import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFormValues, getFormInitialValues, getFormSyncErrors, actions } from 'redux-form';

import ListEntryForm from './components/list-entry-form';

function getPartialInitialValues(values, initialValues, ids, listName) {
  let currentId;
  let valuesRef = values;
  let initialValuesRef = initialValues;
  if (ids.length === 0) return initialValues;

  while (ids.length > 0) {
    currentId = ids.shift();
    if (ids.length === 0) {
      initialValuesRef[currentId][listName] = [...valuesRef[currentId][listName]];
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
  arrayPush: actions.arrayPush,
};

class ListEntryFormContainer extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset(event) {
    event.preventDefault();
    const { listName, initialValues, values, selectorPath, initialize } = this.props;
    const partialInitialValues = getPartialInitialValues(values, initialValues, selectorPath.split('.'), listName);
    initialize('question', partialInitialValues);
  }
  submit(event) {
    event.preventDefault();
    const { errors, values, touch, arrayPush, selectorPath, listName, initialValues, initialize } = this.props;
    const { [listName]: list, ...currentValues } = getDeepObjectReference(values, selectorPath.split('.'));

    // if (validate(errors, values, selectorPath, touch)) {
    arrayPush('question', `${selectorPath}.${listName}`, currentValues);
    // const partialInitialValues = getPartialInitialValues(values, initialValues, selectorPath.split('.'));
    // initialize('question', partialInitialValues);
    // }
  }
  render() {
    const { inputView, listName, submitLabel, noValueLabel } = this.props;
    return (
      <ListEntryForm
        submitLabel={submitLabel}
        noValueLabel={noValueLabel}
        reset={this.reset}
        submit={this.submit}
        inputView={inputView}
        listName={listName}
      />
    );
  }
}

ListEntryFormContainer.propTypes = {
  inputView: PropTypes.object.isRequired,
  selectorPath: PropTypes.string.isRequired,
  listName: PropTypes.string.isRequired,
  touch: PropTypes.func.isRequired,
  arrayPush: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  submitLabel: PropTypes.string.isRequired,
  noValueLabel: PropTypes.string.isRequired,
};

ListEntryFormContainer.defaultProps = {
  initialValues: {},
  values: {},
  errors: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ListEntryFormContainer);
