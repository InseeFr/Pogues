import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'forms/controls/input';
import { markdownVtlToString } from 'forms/controls/rich-textarea';
import {
  RichEditorWithVariable,
  InputWithVariableAutoCompletion,
} from 'forms/controls/control-with-suggestions';

import { WIDGET_ASSOCIATED_FIELDS } from 'constants/dom-constants';

const { COMPONENT_CLASS } = WIDGET_ASSOCIATED_FIELDS;

// PropTypes and defaultProps

const propTypes = {
  action: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  onEnter: PropTypes.func,

  formName: PropTypes.string.isRequired,
  currentValueOrigin: PropTypes.string,
  currentValueTarget: PropTypes.string,
  fieldOrigin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  fieldTarget: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  targetIsRichTextarea: PropTypes.bool.isRequired,
  focusOnInit: PropTypes.bool,
};

const defaultProps = {
  currentValueOrigin: '',
  currentValueTarget: '',
  focusOnInit: false,
  onEnter: undefined,
};

// Component

class AssociatedFields extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur() {
    const {
      action,
      change,
      formName,
      fieldTarget: { name: nameTarget },
      currentValueOrigin,
      currentValueTarget,
      targetIsRichTextarea,
    } = this.props;

    let valueOrigin = currentValueOrigin;

    if (targetIsRichTextarea) {
      valueOrigin = markdownVtlToString(currentValueOrigin);
    }

    const newValueTarget = action(valueOrigin, currentValueTarget);
    change(formName, nameTarget, newValueTarget);
  }

  render() {
    const {
      fieldOrigin,
      fieldTarget,
      targetIsRichTextarea,
      targetIsQuestion,
      focusOnInit,
    } = this.props;

    return (
      <div className={COMPONENT_CLASS}>
        {targetIsRichTextarea ? (
          <div onBlur={this.onBlur}>
            <Field
              props={{
                targetIsQuestion,
              }}
              name={fieldOrigin.name}
              component={RichEditorWithVariable}
              label={fieldOrigin.label}
              focusOnInit={focusOnInit}
            />
          </div>
        ) : (
          <Field
            onBlur={this.onBlur}
            name={fieldOrigin.name}
            type="text"
            component={InputWithVariableAutoCompletion}
            label={fieldOrigin.label}
            focusOnInit={focusOnInit}
            onEnter={this.props.onEnter}
          />
        )}

        <Field
          name={fieldTarget.name}
          type="text"
          component={Input}
          label={fieldTarget.label}
          onEnter={this.props.onEnter}
        />
      </div>
    );
  }
}

export default AssociatedFields;
