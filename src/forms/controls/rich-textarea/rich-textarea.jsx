import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import RichTextEditor from 'gillespie59-react-rte/lib/RichTextEditor';
import { getDefaultKeyBinding } from 'draft-js';

import { toolbarConfig, rootStyle } from './rich-textarea-config';
import { getValue, editorValueToMarkdown } from './rich-textarea-utils';

import { getControlId } from 'utils/widget-utils';
import { CONTROL_RICH_TEXTAREA } from 'constants/dom-constants';

const { COMPONENT_CLASS, EDITOR_CLASS } = CONTROL_RICH_TEXTAREA;

// PropTypes and defaultProps

const propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  required: PropTypes.bool,
  focusOnInit: PropTypes.bool,
  onEnter: PropTypes.func,
};

const defaultProps = {
  required: false,
  disabled: false,
  identifier: undefined,
  className: undefined,
  focusOnInit: false,
  onEnter: undefined,
};

// Control

class RichTextarea extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      value: getValue(props.input.value),
      markdownValue: props.input.value,
    };

    this.handleChange = this.handleChange.bind(this);
    this.keyBinding = this.keyBinding.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.input.value !== this.state.markdownValue) {
      this.setState({
        value: getValue(nextProps.input.value),
        markdownValue: nextProps.input.value,
      });
    }
  }

  handleChange(value) {
    const markdownValue = editorValueToMarkdown(value);

    this.setState({ value, markdownValue });

    if (this.props.input.onChange) {
      this.props.input.onChange(markdownValue);
    }
  }

  keyBinding(e) {
    if (e.keyCode === 13 && this.props.onEnter) {
      this.props.onEnter();
      return 'rich-textarea-enter';
    }
    return getDefaultKeyBinding(e);
  }

  render() {
    const { className, label, required, focusOnInit, input, meta: { touched, error } } = this.props;
    const id = getControlId('rich-textarea', input.name);

    return (
      <div className={`${COMPONENT_CLASS} ${className}`}>
        <label htmlFor={id}>
          {label}
          {required && <span className="ctrl-required">*</span>}
        </label>
        <div>
          <RichTextEditor
            className={EDITOR_CLASS}
            placeholder={label}
            value={this.state.value}
            onChange={this.handleChange}
            toolbarConfig={toolbarConfig}
            autoFocus={focusOnInit}
            keyBindingFn={this.keyBinding}
            rootStyle={rootStyle}
          />

          {touched && (error && <span className="form-error">{error}</span>)}
        </div>
      </div>
    );
  }
}

export default RichTextarea;
