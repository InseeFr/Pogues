import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import isEqual from 'lodash.isequal';

import ListWithInputPanelList from './list-with-input-panel-list';

import { ErrorsPanel } from 'widgets/errors-panel';
import { WIDGET_LIST_WITH_INPUT_PANEL } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { getCurrentSelectorPath } from 'utils/widget-utils';

const {
  COMPONENT_CLASS,
  BUTTON_SUBMIT_CLASS,
  BUTTON_REMOVE_CLASS,
  BUTTON_DUPLICATE_CLASS,
  BUTTON_RESET_CLASS,
  BUTTON_NEW_CLASS,
} = WIDGET_LIST_WITH_INPUT_PANEL;

// PropTypes and defaultProps

export const propTypes = {
  errors: PropTypes.array,
  children: PropTypes.array.isRequired,

  formName: PropTypes.string.isRequired,
  selectorPath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  canSubmit: PropTypes.bool,
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
  clearErrors: PropTypes.func.isRequired,
};

export const defaultProps = {
  errors: [],
  canSubmit: true,
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
  }

  componentWillReceiveProps(nextProps) {
    const { [this.props.name]: list, id, ...values } = nextProps.currentValues;

    if (!isEqual(values, this.props.resetObject) && !isEqual(nextProps.currentValues, this.props.currentValues)) {
      this.validate(nextProps.formValues);
    }
  }

  validate(values) {
    this.clearAllErrors();
    return this.props.validateForm(values);
  }

  submit() {
    const { formValues, currentValues, arrayPush, arrayRemove, arrayInsert, formName, selectorPath, name } = this.props;
    const { [name]: items, ...values } = currentValues;
    const path = getCurrentSelectorPath(selectorPath);

    if (this.validate(formValues)) {
      if (this.state.selectedItemIndex !== undefined) {
        arrayRemove(formName, `${path}${name}`, this.state.selectedItemIndex);
        arrayInsert(formName, `${path}${name}`, this.state.selectedItemIndex, values);
      } else {
        arrayPush(formName, `${path}${name}`, values);
      }

      this.reset();
    }
  }

  remove() {
    const { arrayRemove, formName, selectorPath, name } = this.props;
    const path = getCurrentSelectorPath(selectorPath);

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
    const { currentValues, name, change, formName, selectorPath } = this.props;
    const path = getCurrentSelectorPath(selectorPath);
    this.setState({ selectedItemIndex: index }, () => {
      const item = currentValues[name][index];
      Object.keys(item).forEach(key => change(formName, `${path}${key}`, item[key]));
    });
  }

  clearAllErrors() {
    const { clearErrors, selectorPath, resetObject } = this.props;
    const paths = [...Object.keys(resetObject).map(i => `${selectorPath}.${i}`), selectorPath];
    clearErrors(paths);
  }

  render() {
    const { children, errors, name, canSubmit, canRemove, canDuplicate, selectorPath } = this.props;

    return (
      <div className={COMPONENT_CLASS}>
        {canSubmit && (
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

        <ErrorsPanel path={selectorPath} includeSubPaths />

        {children}

        <FieldArray
          name={name}
          rerenderOnEveryChange
          component={ListWithInputPanelList}
          errors={errors}
          select={this.select}
        />

        {canSubmit && (
          <button
            className={BUTTON_SUBMIT_CLASS}
            onClick={event => {
              event.preventDefault();
              this.submit();
            }}
          >
            {Dictionary.validate}
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
            {Dictionary.remove}
          </button>
        )}
        {canDuplicate && (
          <button
            disabled={this.state.selectedItemIndex === undefined}
            className={BUTTON_DUPLICATE_CLASS}
            onClick={event => {
              event.preventDefault();
              this.duplicate();
            }}
          >
            {Dictionary.duplicate}
          </button>
        )}
        <button
          className={BUTTON_RESET_CLASS}
          onClick={event => {
            event.preventDefault();
            this.reset();
          }}
        >
          {Dictionary.cancel}
        </button>
      </div>
    );
  }
}

export default ListWithInputPanel;
