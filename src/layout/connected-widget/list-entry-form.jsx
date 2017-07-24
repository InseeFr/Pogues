import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFormValues, getFormSyncErrors, actions } from 'redux-form';
import _ from 'lodash';

import ListEntryForm from './components/list-entry-form';

function validate(errors, values, selectorPath, touch) {
  // const currentErrors = getDeepObjectReference(errors, selectorPath.split('.'));
  // const currentValues = getDeepObjectReference(values, selectorPath.split('.'));
  // touch('question', `${this.selectorPathComposed}.label`);
}

function getValuesSubset(values, path) {
  return _.cloneDeep(_.get(values, path));
}

function updateValues(values, path, item) {
  const newValues = _.cloneDeep(values);
  return _.update(newValues, path, currentValue => {
    return {
      ...currentValue,
      ...item,
    };
  });
}

const mapStateToProps = state => {
  return {
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
    this.select = this.select.bind(this);
    this.remove = this.remove.bind(this);
    this.duplicate = this.duplicate.bind(this);
  }
  select(index) {
    const { listName, values, selectorPath, initialize } = this.props;
    const subset = getValuesSubset(values, `${selectorPath}.${listName}.[${index}]`);
    const newValues = updateValues(values, selectorPath, subset);
    initialize('question', newValues);
  }
  remove(index) {
    const { selectorPath, listName, values, initialInputValues, initialize } = this.props;
    const items = getValuesSubset(values, `${selectorPath}.${listName}`);
    items.splice(index, 1);
    const subset = {
      ..._.cloneDeep(initialInputValues),
      [listName]: items,
    };
    const newValues = updateValues(values, selectorPath, subset);
    initialize('question', newValues);
  }
  reset() {
    const { listName, values, initialInputValues, selectorPath, initialize } = this.props;
    const subset = {
      ..._.cloneDeep(initialInputValues),
      [listName]: [...getValuesSubset(values, `${selectorPath}.${listName}`)],
    };
    const newValues = updateValues(values, selectorPath, subset);
    initialize('question', newValues);
  }
  duplicate() {
    this.submit();
  }
  submit(index) {
    const { errors, values, initialInputValues, touch, selectorPath, listName, initialize } = this.props;
    const { [listName]: items, ...currentValues } = getValuesSubset(values, selectorPath);

    if (index) {
      items[index] = currentValues;
    } else {
      items.push(currentValues);
    }
    const subset = {
      ..._.cloneDeep(initialInputValues),
      [listName]: items,
    };
    const newValues = updateValues(values, selectorPath, subset);
    initialize('question', newValues);
  }
  render() {
    const { inputView, listName, submitLabel, noValueLabel } = this.props;
    return (
      <ListEntryForm
        submitLabel={submitLabel}
        noValueLabel={noValueLabel}
        reset={this.reset}
        submit={this.submit}
        select={this.select}
        remove={this.remove}
        duplicate={this.duplicate}
        inputView={inputView}
        listName={listName}
      />
    );
  }
}

ListEntryFormContainer.propTypes = {
  inputView: PropTypes.object.isRequired,
  initialInputValues: PropTypes.object,
  selectorPath: PropTypes.string.isRequired,
  listName: PropTypes.string.isRequired,
  touch: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  submitLabel: PropTypes.string.isRequired,
  noValueLabel: PropTypes.string.isRequired,
};

ListEntryFormContainer.defaultProps = {
  initialInputValues: {},
  values: {},
  errors: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ListEntryFormContainer);
