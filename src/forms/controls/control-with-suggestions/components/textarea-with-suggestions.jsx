import React from 'react';

import ControlWithSuggestion from './control-with-suggestions';

import { getControlId } from '../../../../utils/widget-utils';
import { CONTROL_TEXTAREA } from '../../../../constants/dom-constants';

const { COMPONENT_CLASS } = CONTROL_TEXTAREA;

// Component

class TextareaWithSuggestions extends ControlWithSuggestion {
  render() {
    const {
      label,
      required,
      disabled,
      input,
      meta: { touched, error },
    } = this.props;
    const id = getControlId('textarea', input.name);

    return (
      <div className={COMPONENT_CLASS}>
        <label htmlFor={id}>
          {label}
          {required && <span className="ctrl-required">*</span>}
        </label>
        <div>
          <textarea
            {...input}
            id={id}
            placeholder={label}
            disabled={disabled}
            onChange={() => {
              this.handleInputChange(this.input.value);
            }}
            onKeyDown={this.handleInputKeyDown}
            onFocus={() => {
              this.handleInputFocus();
              input.onFocus();
            }}
            ref={node => {
              this.input = node;
            }}
          />
          {touched && error && <span className="form-error">{error}</span>}
          {super.render()}
        </div>
      </div>
    );
  }
}

export default TextareaWithSuggestions;
