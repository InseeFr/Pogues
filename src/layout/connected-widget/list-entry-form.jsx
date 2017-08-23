import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFormValues, formValueSelector, actions } from 'redux-form';
import _ from 'lodash';

import ListEntryForm from './components/list-entry-form';
import { removeInvalidItem } from 'actions/app-state';

function getValuesSubset(values, path, invalidItems = {}) {
  const item = _.cloneDeep(_.get(values, path));

  if (Object.keys(invalidItems).indexOf(item.id) !== -1) {
    invalidItems[item.id].invalidFieldsNames.forEach(fieldName => {
      // The invalid values are removed to show validation errors in edition.
      item[fieldName] = '';
    });
  }

  return item;
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

const mapStateToProps = (state, { formName, selectorPath, listName }) => {
  formName = formName || 'component';
  const selector = formValueSelector(formName);
  return {
    values: getFormValues(formName)(state),
    addedItems: selector(state, `${selectorPath}.${listName}`),
    formName,
  };
};

const mapDispatchToProps = {
  initialize: actions.initialize,
  removeInvalidItem,
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
    addedItems: PropTypes.array,
    submitLabel: PropTypes.string.isRequired,
    noValueLabel: PropTypes.string.isRequired,
    invalidItems: PropTypes.object,
    showDuplicateButton: PropTypes.bool,
    rerenderOnEveryChange: PropTypes.bool,
    removeInvalidItem: PropTypes.func.isRequired,
  };

  static defaultProps = {
    initialInputValues: {},
    values: {},
    addedItems: [],
    errors: {},
    validationInput: () => true,
    invalidItems: {},
    showDuplicateButton: true,
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
    const { formName, listName, values, selectorPath, initialize, invalidItems } = this.props;
    const subset = getValuesSubset(values, `${selectorPath}.${listName}.[${index}]`, invalidItems);

    if (invalidItems[subset.id]) {
      this.validate(subset);
    }

    initialize(formName, updateValues(values, selectorPath, subset));
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
    const {
      formName,
      values,
      initialInputValues,
      selectorPath,
      listName,
      initialize,
      invalidItems,
      removeInvalidItem,
    } = this.props;
    const { [listName]: items, ...currentValues } = getValuesSubset(values, selectorPath);

    if (!this.validate(currentValues)) return;

    if (invalidItems[currentValues.id]) {
      removeInvalidItem(currentValues.id);
      this.resetErrors();
    }

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
    const { validationInput, addedItems } = this.props;
    const errors = validationInput(values, addedItems);
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
    const {
      inputView,
      listName,
      submitLabel,
      noValueLabel,
      rerenderOnEveryChange,
      showDuplicateButton,
      invalidItems,
    } = this.props;

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
        showDuplicateButton={showDuplicateButton}
        rerenderOnEveryChange={rerenderOnEveryChange}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEntryFormContainer);
