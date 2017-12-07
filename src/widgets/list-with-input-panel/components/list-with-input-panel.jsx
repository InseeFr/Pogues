import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import isEqual from 'lodash.isequal';
import cloneDeep from 'lodash.clonedeep';

import ListWithInputPanelList from './list-with-input-panel-list';

import { ErrorsPanel } from 'widgets/errors-panel';
import { WIDGET_LIST_WITH_INPUT_PANEL } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { getCurrentSelectorPath } from 'utils/widget-utils';

const {
  WRAPPER_CLASS,
  COMPONENT_CLASS,
  PANEL_CLASS,
  LIST_CLASS,
  ACTIONS_CLASS,
  BUTTON_SUBMIT_CLASS,
  BUTTON_REMOVE_CLASS,
  BUTTON_DUPLICATE_CLASS,
  BUTTON_RESET_CLASS,
  BUTTON_NEW_CLASS,
} = WIDGET_LIST_WITH_INPUT_PANEL;

// Utils

function getFormValuesToValidate(formValues, item, selectorPath, name) {
  const formValuesToValidate = cloneDeep(formValues);
  let pointer = formValuesToValidate;

  const pathStack = selectorPath.split('.');

  while (pathStack.length > 1) {
    pointer = pointer[pathStack.shift()];
  }

  const deeperkey = pathStack.shift();

  pointer[deeperkey] = { ...item, [name]: pointer[deeperkey][name] };

  return formValuesToValidate;
}

// PropTypes and defaultProps

export const propTypes = {
  errors: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,

  formName: PropTypes.string.isRequired,
  selectorPath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  componentId: PropTypes.string.isRequired,

  canAddNew: PropTypes.bool,
  canRemove: PropTypes.bool,
  canDuplicate: PropTypes.bool,

  formValues: PropTypes.object.isRequired,
  currentValues: PropTypes.object.isRequired,
  resetObject: PropTypes.object.isRequired,

  change: PropTypes.func.isRequired,
  arrayRemove: PropTypes.func.isRequired,
  arrayPush: PropTypes.func.isRequired,
  arrayInsert: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  clearSubformValidationErrors: PropTypes.func.isRequired,
  removeIntegrityError: PropTypes.func.isRequired,
};

export const defaultProps = {
  errors: [],
  canAddNew: true,
  canRemove: true,
  canDuplicate: true,
  componentsStore: {},
};

// Component

class ListWithInputPanel extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      selectedItemIndex: undefined,
    };

    this.validate = this.validate.bind(this);
    this.submit = this.submit.bind(this);
    this.remove = this.remove.bind(this);
    this.duplicate = this.duplicate.bind(this);
    this.reset = this.reset.bind(this);
    this.select = this.select.bind(this);
    this.clearAllErrors = this.clearAllErrors.bind(this);
    this.removeErrorIntegrityIfExists = this.removeErrorIntegrityIfExists.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { [this.props.name]: list, id, ...values } = nextProps.currentValues;

    if (!this.props.canAddNew && this.state.selectedItemIndex === undefined) return;

    // Generation items when another item is selected
    if (this.state.selectedItemIndex !== undefined && !isEqual(list, this.props.currentValues[this.props.name])) {
      this.reset();
    }
  }

  validate(values) {
    this.clearAllErrors();
    return this.props.validateForm(values, this.state);
  }

  submit() {
    const {
      formValues,
      currentValues,
      arrayPush,
      arrayRemove,
      arrayInsert,
      formName,
      selectorPath,
      name,
      canAddNew,
    } = this.props;
    const { [name]: items, ...values } = currentValues;
    const path = getCurrentSelectorPath(selectorPath);

    if (canAddNew && this.validate(formValues)) {
      if (this.state.selectedItemIndex !== undefined) {
        arrayRemove(formName, `${path}${name}`, this.state.selectedItemIndex);
        arrayInsert(formName, `${path}${name}`, this.state.selectedItemIndex, values);
      } else if (canAddNew) {
        arrayPush(formName, `${path}${name}`, values);
      }

      this.removeErrorIntegrityIfExists(values);

      this.reset();
    }
  }

  remove() {
    const { arrayRemove, formName, selectorPath, name, currentValues } = this.props;
    const { [name]: items, ...values } = currentValues;
    const path = getCurrentSelectorPath(selectorPath);

    this.removeErrorIntegrityIfExists(items[this.state.selectedItemIndex]);

    arrayRemove(formName, `${path}${name}`, this.state.selectedItemIndex);

    this.reset();
  }

  duplicate() {
    const { formValues, currentValues, arrayPush, formName, selectorPath, name } = this.props;
    const { [name]: items, ...values } = currentValues;
    const path = getCurrentSelectorPath(selectorPath);

    if (this.validate(formValues)) {
      arrayPush(formName, `${path}${name}`, values);
      this.reset();
    }
  }

  reset() {
    const { resetObject, change, formName, selectorPath } = this.props;
    const path = getCurrentSelectorPath(selectorPath);
    this.setState({ selectedItemIndex: undefined }, () => {
      this.clearAllErrors();
      Object.keys(resetObject).forEach(key => change(formName, `${path}${key}`, resetObject[key]));
    });
  }

  select(index) {
    const { currentValues, name, change, formName, selectorPath, formValues } = this.props;
    const path = getCurrentSelectorPath(selectorPath);
    this.setState({ selectedItemIndex: index }, () => {
      const item = currentValues[name][index];
      const formValuesToValidate = getFormValuesToValidate(formValues, item, selectorPath, name);
      this.validate(formValuesToValidate);
      Object.keys(item).forEach(key => change(formName, `${path}${key}`, item[key]));
    });
  }

  clearAllErrors() {
    this.props.clearSubformValidationErrors();
  }

  removeErrorIntegrityIfExists(values) {
    const { errors, componentId, removeIntegrityError } = this.props;

    const error = errors.filter(e => e.itemListId === values.id);

    if (error.length > 0) {
      removeIntegrityError(componentId, error[0].type, error[0].itemListId);
    }
  }

  render() {
    const { children, errors, name, canAddNew, canRemove, canDuplicate, selectorPath } = this.props;
    const childrenWithDisabledProp = Children.map(children, child => {
      return child
        ? cloneElement(child, { ...child.props, disabled: !canAddNew && this.state.selectedItemIndex === undefined })
        : child;
    }).filter(child => child);

    return (
      <div className={COMPONENT_CLASS}>
        <ErrorsPanel path={selectorPath} includeSubPaths />

        <div className={WRAPPER_CLASS}>
          <div className={LIST_CLASS}>
            <FieldArray
              name={name}
              rerenderOnEveryChange
              component={ListWithInputPanelList}
              errors={errors}
              select={this.select}
            />
          </div>

          <div className={PANEL_CLASS}>
            <div className={ACTIONS_CLASS}>
              {canAddNew && (
                <button
                  className={BUTTON_NEW_CLASS}
                  onClick={event => {
                    event.preventDefault();
                    this.reset();
                  }}
                >
                  <span className="glyphicon glyphicon-plus" aria-hidden="true" />
                  {Dictionary.reset}
                </button>
              )}
            </div>

            {childrenWithDisabledProp}

            <div className={ACTIONS_CLASS}>
              <button
                className={BUTTON_RESET_CLASS}
                onClick={event => {
                  event.preventDefault();
                  this.reset();
                }}
              >
                {Dictionary.cancel}
              </button>

              <button
                className={BUTTON_SUBMIT_CLASS}
                onClick={event => {
                  event.preventDefault();
                  this.submit();
                }}
              >
                {Dictionary.validate}
              </button>

              {canDuplicate && (
                <button
                  disabled={this.state.selectedItemIndex === undefined}
                  className={BUTTON_DUPLICATE_CLASS}
                  onClick={event => {
                    event.preventDefault();
                    this.duplicate();
                  }}
                >
                  <span className="glyphicon glyphicon-file" aria-hidden="true" />
                  {Dictionary.duplicate}
                </button>
              )}

              {canRemove && (
                <button
                  disabled={this.state.selectedItemIndex === undefined}
                  className={BUTTON_REMOVE_CLASS}
                  onClick={event => {
                    event.preventDefault();
                    this.remove();
                  }}
                >
                  <span className="glyphicon glyphicon-trash" aria-hidden="true" />
                  {Dictionary.remove}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListWithInputPanel;
