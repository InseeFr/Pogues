import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'forms/controls/input';
import { RichTextarea, markdownVtlToString } from 'forms/controls/rich-textarea';

import { WIDGET_ASSOCIATED_FIELDS } from 'constants/dom-constants';

// PropTypes and defaultProps

const propTypes = {
  action: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  currentValueOrigin: PropTypes.string,
  currentValueTarget: PropTypes.string,
  change: PropTypes.func.isRequired,
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
    const { fieldOrigin, fieldTarget, targetIsRichTextarea, focusOnInit } = this.props;
    return (
      <div className={WIDGET_ASSOCIATED_FIELDS}>
        {targetIsRichTextarea ? (
          <div onBlur={this.onBlur}>
            <Field
              name={fieldOrigin.name}
              component={RichTextarea}
              label={fieldOrigin.label}
              focusOnInit={focusOnInit}
            />
          </div>
        ) : (
          <Field
            onBlur={this.onBlur}
            name={fieldOrigin.name}
            type="text"
            component={Input}
            label={fieldOrigin.label}
            focusOnInit={focusOnInit}
          />
        )}

        <Field name={fieldTarget.name} type="text" component={Input} label={fieldTarget.label} />
      </div>
    );
  }
}

export default AssociatedFields;
