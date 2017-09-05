import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFormValues, formValueSelector, actions } from 'redux-form';
import _ from 'lodash';

import ListEntryForm from './components/list-entry-form';
import { removeInvalidItem } from 'actions/app-state';
import Dictionary from 'utils/dictionary/dictionary';

function getValuesSubset(values, path, invalidItems = {}) {
  const item = _.cloneDeep(_.get(values, path));

  // @TODO: Only useful with redirections.
  if (Object.keys(invalidItems).indexOf(item.id) !== -1) {
    invalidItems[item.id].invalidFieldsNames.forEach(fieldName => {
      // The invalid values are removed to show validation errors in edition.
      item[fieldName] = '';
    });
  }

  return item;
}

function updateValues(values, path, item, ref = 0) {
  const newValues = _.cloneDeep(values);
  return _.update(newValues, path, currentValue => {
    return {
      ...currentValue,
      ...item,
      ref,
    };
  });
}

const mapStateToProps = (state, { formName, selectorPath, listName }) => {
  formName = formName || 'component';
  const selector = formValueSelector(formName);
  return {
    selectedItemIndex: selector(state, `${selectorPath}.ref`),
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
    showAddButton: PropTypes.bool,
    showRemoveButton: PropTypes.bool,
    avoidNewAddition: PropTypes.bool,
    rerenderOnEveryChange: PropTypes.bool,
    removeInvalidItem: PropTypes.func.isRequired,
    selectedItemIndex: PropTypes.number,
  };

  static defaultProps = {
    initialInputValues: {},
    values: {},
    addedItems: [],
    errors: {},
    validationInput: () => true,
    invalidItems: {},
    showDuplicateButton: true,
    showAddButton: true,
    showRemoveButton: true,
    avoidNewAddition: false,
    rerenderOnEveryChange: false,
    selectedItemIndex: 0,
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

  setValidationErrors(errors) {
    this.setState({
      ...this.state,
      errors,
    });
  }

  select(index) {
    const { formName, listName, values, selectorPath, initialize, invalidItems } = this.props;
    const subset = getValuesSubset(values, `${selectorPath}.${listName}.[${index}]`, invalidItems);

    if (invalidItems[subset.id]) {
      const validationErrors = this.validate(subset);
      this.setValidationErrors(validationErrors);
    }

    this.resetErrors();
    initialize(formName, updateValues(values, selectorPath, subset, index + 1));
  }

  remove() {
    const {
      formName,
      selectorPath,
      listName,
      values,
      initialInputValues,
      initialize,
      removeInvalidItem,
      invalidItems,
    } = this.props;
    const currentValues = getValuesSubset(values, selectorPath);
    const removedItemId = currentValues[listName][currentValues.ref - 1];

    currentValues[listName].splice(currentValues.ref - 1, 1);

    if (invalidItems[removedItemId]) {
      removeInvalidItem(removedItemId);
      this.resetErrors();
    }

    const subset = {
      ..._.cloneDeep(initialInputValues),
      [listName]: currentValues[listName],
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

  submit() {
    const {
      formName,
      values,
      initialInputValues,
      selectorPath,
      listName,
      initialize,
      invalidItems,
      removeInvalidItem,
      avoidNewAddition,
    } = this.props;
    const { [listName]: items, ...currentValues } = getValuesSubset(values, selectorPath);

    // If new additions are forbidden and there isn't an item selected
    if (avoidNewAddition && !currentValues.ref) {
      this.setValidationErrors([Dictionary.validation_collectedvariable_no_new]);
      return;
    }

    const validationErrors = this.validate(currentValues);

    if (validationErrors.length > 0) {
      this.setValidationErrors(validationErrors);
      return;
    }

    if (invalidItems[currentValues.id]) {
      removeInvalidItem(currentValues.id);
    }
    if (currentValues.ref) {
      items[currentValues.ref - 1] = currentValues;
    } else {
      items.push(currentValues);
    }

    const subset = {
      ..._.cloneDeep(initialInputValues),
      [listName]: items,
    };
    const newValues = updateValues(values, selectorPath, subset);
    this.resetErrors();
    initialize(formName, newValues);
  }

  validate(values) {
    const { validationInput, addedItems } = this.props;
    return validationInput(values, addedItems);
  }

  resetErrors() {
    this.setValidationErrors([]);
  }

  render() {
    const {
      inputView,
      listName,
      submitLabel,
      noValueLabel,
      rerenderOnEveryChange,
      showDuplicateButton,
      showAddButton,
      showRemoveButton,
      avoidNewAddition,
      invalidItems,
      selectedItemIndex,
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
        avoidNewAddition={avoidNewAddition}
        showAddButton={showAddButton}
        showRemoveButton={showRemoveButton}
        rerenderOnEveryChange={rerenderOnEveryChange}
        selectedItemIndex={selectedItemIndex}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEntryFormContainer);
