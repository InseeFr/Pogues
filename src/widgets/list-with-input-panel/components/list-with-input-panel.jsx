import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldArray, Field } from 'redux-form';

import ListWithInputPanelList from './list-with-input-panel-list';

import { WIDGET_LIST_WITH_INPUT_PANEL } from 'constants/dom-constants';

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
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  canSubmit: PropTypes.bool,
  canRemove: PropTypes.bool,
  canDuplicate: PropTypes.bool,
  edit: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  duplicate: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export const defaultProps = {
  canSubmit: true,
  canRemove: true,
  canDuplicate: true,
  edit: false,
};

// Component

class ListWithInputPanel extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    const { children, name, canSubmit, canRemove, canDuplicate, edit, submit, remove, duplicate, reset } = this.props;
    return (
      <div className={COMPONENT_CLASS}>
        {/* @TODO: Maybe we should try another solution more clear */}
        <Field component="input" type="hidden" name="ref" />

        {canSubmit && (
          <button className={BUTTON_NEW_CLASS} onClick={reset}>
            New
          </button>
        )}

        {children}

        <FieldArray name={name} component={ListWithInputPanelList} />

        {canSubmit && (
          <button className={BUTTON_SUBMIT_CLASS} onClick={submit}>
            Submit
          </button>
        )}
        {canRemove && (
          <button disabled={!edit} className={BUTTON_REMOVE_CLASS} onClick={remove}>
            Remove
          </button>
        )}
        {canDuplicate && (
          <button disabled={!edit} className={BUTTON_DUPLICATE_CLASS} onClick={duplicate}>
            Duplicate
          </button>
        )}
        <button className={BUTTON_RESET_CLASS} onClick={reset}>
          Reset
        </button>
      </div>
    );
  }
}

export default ListWithInputPanel;
