import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import RichTextEditor from 'gillespie59-react-rte/lib/RichTextEditor';

import { getValue, editorValueToMarkdown, formatURL } from './rich-textarea-utils';
import { toolbarConfig, rootStyle } from './rich-textarea-config';

import { getControlId } from 'utils/widget-utils';
import { CONTROL_RICH_TEXTAREA } from 'constants/dom-constants';

const { COMPONENT_CLASS } = CONTROL_RICH_TEXTAREA;

// PropTypes and defaultProps

const propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  label: PropTypes.string.isRequired,
  identifier: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  focusOnInit: PropTypes.bool,
  submitOnEnter: PropTypes.bool,
};
const defaultProps = {
  required: false,
  disabled: false,
  identifier: undefined,
  className: undefined,
  focusOnInit: false,
  submitOnEnter: false,
};

// Control

class RichTextarea extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      value: getValue(props.input.value),
      currentValue: props.input.value,
    };
  }

  // @TODO
  componentDidMount() {
    if (this.props.focusOnInit) this.input._focus();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.identifier === undefined) {
      return;
    }
    if (nextProps.input.value === '' || nextProps.identifier !== this.props.identifier) {
      this.setState({ value: getValue(nextProps.input.value) });
    }
  }

  handleChange = value => {
    const transformedValue = editorValueToMarkdown(value);
    this.setState({ value, currentValue: transformedValue });
    this.props.input.onChange(transformedValue);
  };

  handleReturn = e => {
    if (this.props.submitOnEnter) {
      e.preventDefault();
      e.target
        .closest('form')
        .querySelector('button[type=submit]')
        .click();
    }
  };

  render() {
    const { className, label, required, disabled, input, meta: { touched, error } } = this.props;
    const id = getControlId('rich-textarea', input.name);
    const editorValue = this.state.value;

    return (
      <div className={`${COMPONENT_CLASS} ${className}`}>
        <label htmlFor={id}>
          {label}
          {required && <span className="ctrl-required">*</span>}
        </label>
        <div>
          <RichTextEditor
            blockStyleFn={() => 'singleline'}
            value={editorValue}
            onChange={this.handleChange}
            toolbarConfig={toolbarConfig}
            handleReturn={this.handleReturn}
            rootStyle={rootStyle}
            formatURL={formatURL}
            disabled={disabled}
            ref={node => {
              this.input = node;
            }}
          />

          {touched && (error && <span className="form-error">{error}</span>)}
        </div>
      </div>
    );
  }
}

export default RichTextarea;
