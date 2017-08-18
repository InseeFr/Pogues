import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFormValues, actions } from 'redux-form';
import _ from 'lodash';

import ListEntryForm from './components/list-entry-form';

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

const mapStateToProps = (state, { formName }) => {
  formName = formName || 'component';
  return {
    values: getFormValues(formName)(state),
    formName,
  };
};

const mapDispatchToProps = {
  initialize: actions.initialize,
};

class ListEntryFormContainer extends Component {
  static propTypes = {
    formName: PropTypes.string.isRequired,
    inputView: PropTypes.object.isRequired,
    initialInputValues: PropTypes.object,
    selectorPath: PropTypes.string.isRequired,
    listName: PropTypes.string.isRequired,
    initialize: PropTypes.func.isRequired,
    validationInput: PropTypes.func,
    values: PropTypes.object,
    submitLabel: PropTypes.string.isRequired,
    noValueLabel: PropTypes.string.isRequired,
    invalidItems: PropTypes.array,
    rerenderOnEveryChange: PropTypes.bool,
  };

  static defaultProps = {
    initialInputValues: {},
    values: {},
    errors: {},
    validationInput: () => true,
    invalidItems: [],
    rerenderOnEveryChange: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
    this.select = this.select.bind(this);
    this.remove = this.remove.bind(this);
    this.duplicate = this.duplicate.bind(this);
    this.validate = this.validate.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
  }
  resetErrors() {
    this.setState({
      errors: [],
    });
  }
  select(index) {
    const { formName, listName, values, selectorPath, initialize } = this.props;
    const subset = getValuesSubset(values, `${selectorPath}.${listName}.[${index}]`);
    const newValues = updateValues(values, selectorPath, subset);
    this.resetErrors();
    initialize(formName, newValues);
  }
  remove(index) {
    const { formName, selectorPath, listName, values, initialInputValues, initialize } = this.props;
    const items = getValuesSubset(values, `${selectorPath}.${listName}`);
    items.splice(index, 1);
    const subset = {
      ..._.cloneDeep(initialInputValues),
      [listName]: items,
    };
    const newValues = updateValues(values, selectorPath, subset);
    this.resetErrors();
    initialize(formName, newValues);
  }
  reset() {
    const { formName, listName, values, initialInputValues, selectorPath, initialize } = this.props;
    const subset = {
      ..._.cloneDeep(initialInputValues),
      [listName]: [...getValuesSubset(values, `${selectorPath}.${listName}`)],
    };
    const newValues = updateValues(values, selectorPath, subset);
    this.resetErrors();
    initialize(formName, newValues);
  }
  duplicate() {
    this.submit();
  }
  submit(index) {
    const { formName, values, initialInputValues, selectorPath, listName, initialize } = this.props;
    const { [listName]: items, ...currentValues } = getValuesSubset(values, selectorPath);

    if (!this.validate(currentValues)) return;
    if (index !== undefined && index !== '') {
      items[index] = currentValues;
    } else {
      items.push(currentValues);
    }
    const subset = {
      ..._.cloneDeep(initialInputValues),
      [listName]: items,
    };
    const newValues = updateValues(values, selectorPath, subset);
    initialize(formName, newValues);
  }
  validate(values) {
    const { validationInput } = this.props;
    const errors = validationInput(values);
    let isValid = true;

    if (errors.length > 0) {
      isValid = false;
      this.setState({
        errors,
      });
    } else {
      this.setState({
        errors: [],
      });
    }
    return isValid;
  }
  render() {
    const { inputView, listName, submitLabel, noValueLabel, invalidItems, rerenderOnEveryChange } = this.props;
    return (
      <ListEntryForm
        submitLabel={submitLabel}
        noValueLabel={noValueLabel}
        reset={this.reset}
        submit={this.submit}
        select={this.select}
        remove={this.remove}
        duplicate={this.duplicate}
        errors={this.state.errors}
        inputView={inputView}
        listName={listName}
        invalidItems={invalidItems}
        rerenderOnEveryChange={rerenderOnEveryChange}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEntryFormContainer);
