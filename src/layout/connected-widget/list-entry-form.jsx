import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValueSelector, actions } from 'redux-form';

import ListEntryForm from './components/list-entry-form';
import { removeInvalidItem } from 'actions/app-state';
import Dictionary from 'utils/dictionary/dictionary';

const mapStateToProps = (state, { formName, selectorPath }) => {
  formName = formName || 'component';
  const selector = formValueSelector(formName);
  return {
    formName,
    currentValues: selector(state, `${selectorPath}`),
  };
};

const mapDispatchToProps = {
  change: actions.change,
  arrayRemove: actions.arrayRemove,
  arrayPush: actions.arrayPush,
  arrayInsert: actions.arrayInsert,
  removeInvalidItem,
};

class ListEntryFormContainer extends Component {
  static propTypes = {
    formName: PropTypes.string.isRequired,
    selectorPath: PropTypes.string.isRequired,
    listName: PropTypes.string.isRequired,

    initialInputValues: PropTypes.object.isRequired,
    currentValues: PropTypes.object.isRequired,
    invalidItems: PropTypes.object,
    inputView: PropTypes.object.isRequired,

    change: PropTypes.func.isRequired,
    arrayRemove: PropTypes.func.isRequired,
    arrayPush: PropTypes.func.isRequired,
    arrayInsert: PropTypes.func.isRequired,
    removeInvalidItem: PropTypes.func.isRequired,
    validationInput: PropTypes.func,

    submitLabel: PropTypes.string.isRequired,
    noValueLabel: PropTypes.string.isRequired,

    showDuplicateButton: PropTypes.bool,
    showRemoveButton: PropTypes.bool,
    rerenderOnEveryChange: PropTypes.bool,
    avoidNewAddition: PropTypes.bool,
    showAddButton: PropTypes.bool,

  };

  static defaultProps = {
    showDuplicateButton: true,
    showRemoveButton: true,
    rerenderOnEveryChange: true,
    avoidNewAddition: false,
    showAddButton: true,
    validationInput: () => true,
    invalidItems: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
    this.select = this.select.bind(this);
    this.remove = this.remove.bind(this);
    this.reset = this.reset.bind(this);
    this.duplicate = this.duplicate.bind(this);
    this.submit = this.submit.bind(this);
  }

  setValidationErrors(errors = []) {
    this.setState({
      ...this.state,
      errors,
    });
  }

  initializeValues(values) {
    const { formName, selectorPath, change } = this.props;
    Object.keys(values).forEach(key => {
      change(formName, `${selectorPath}.${key}`, values[key]);
    });
  }

  validate() {
    const { validationInput, currentValues, avoidNewAddition } = this.props;
    let validationErrors = [];

    if (avoidNewAddition && !currentValues.ref) {
      validationErrors = [Dictionary.validation_collectedvariable_no_new];
    } else {
      validationErrors = validationInput(currentValues);
    }

    this.setValidationErrors(validationErrors);

    return validationErrors.length === 0;
  }

  updateIntegrityErrors({ id }) {
    const { invalidItems: { [id]: invalidItemParams } } = this.props;

    if (invalidItemParams && invalidItemParams.messageKey) {
      this.setValidationErrors([Dictionary[invalidItemParams.messageKey]]);
    }
  }

  select(index) {
    const { currentValues, listName } = this.props;
    const selectedItem = currentValues[listName][index];
    this.initializeValues({ ...selectedItem, ref: index + 1 });
    this.setValidationErrors();
    this.updateIntegrityErrors(selectedItem);
  }

  remove() {
    const {
      currentValues,
      selectorPath,
      formName,
      listName,
      arrayRemove,
      invalidItems,
      removeInvalidItem,
    } = this.props;
    arrayRemove(formName, `${selectorPath}.${listName}`, currentValues.ref - 1);
    if (invalidItems[currentValues.id]) removeInvalidItem(currentValues.id);
    this.reset();
    this.setValidationErrors();
  }

  reset() {
    const { initialInputValues, listName } = this.props;
    const { [listName]: list, ...inputValues } = initialInputValues;
    this.initializeValues({ ...inputValues, ref: 0 });
    this.setValidationErrors();
  }

  duplicate() {
    const { currentValues, listName, formName, selectorPath, arrayPush } = this.props;
    const { [listName]: listItems, ref, id, ...inputValues } = currentValues;
    if (!this.validate()) return;
    arrayPush(formName, `${selectorPath}.${listName}`, inputValues);
    this.reset();
    this.setValidationErrors();
  }

  submit() {
    const {
      currentValues,
      listName,
      formName,
      selectorPath,
      arrayInsert,
      arrayPush,
      arrayRemove,
      invalidItems,
      removeInvalidItem,
    } = this.props;
    const { [listName]: listItems, ref, ...inputValues } = currentValues;

    if (!this.validate()) return;

    if (invalidItems[currentValues.id]) removeInvalidItem(currentValues.id);

    // If ref is undefined or 0 we are inserting a new item
    if (ref) {
      arrayRemove(formName, `${selectorPath}.${listName}`, ref - 1);
      arrayInsert(formName, `${selectorPath}.${listName}`, ref - 1, inputValues);
    } else {
      arrayPush(formName, `${selectorPath}.${listName}`, inputValues);
    }

    this.reset();
  }

  render() {
    const {
      currentValues,
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
        disableRemove={!currentValues.ref}
        disableDuplicate={!currentValues.ref || (currentValues.id && invalidItems[currentValues.id])}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEntryFormContainer);
