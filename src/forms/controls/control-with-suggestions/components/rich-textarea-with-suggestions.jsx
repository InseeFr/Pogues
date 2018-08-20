import React from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'gillespie59-react-rte/lib/RichTextEditor';
import { getDefaultKeyBinding } from 'draft-js';

import ControlWithSuggestion from './control-with-suggestions';
import { updateSuggestions, initialize } from './input-with-suggestions-utils';

import {
  getEditorValue,
  contentStateToString,
  formatURL,
  toolbarConfig,
  rootStyle
} from 'forms/controls/rich-textarea';
import { getControlId } from 'utils/widget-utils';
import { CONTROL_RICH_TEXTAREA } from 'constants/dom-constants';

const { COMPONENT_CLASS } = CONTROL_RICH_TEXTAREA;

function myKeyBindingFn(e) {
  if (e.key === 'Tab') {
    return 'myeditor-save';
  }
  return getDefaultKeyBinding(e);
}

// PropTypes and defaultProps

const propTypes = {
  submitOnEnter: PropTypes.bool
};
const defaultProps = {
  submitOnEnter: false
};

// Control

class RichTextareaWithSuggestions extends ControlWithSuggestion {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    const parent = super(props);

    this.state = {
      ...parent.state,
      value: getEditorValue(props.input.value),
      currentValue: props.input.value
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  componentDidMount() {
    if (this.props.focusOnInit) this.input._focus();
  }

  shouldComponentUpdate() {
    // @TODO
    return true;
  }

  componentWillReceiveProps(nextProps) {
    const isReset = nextProps.input.value === '';
    const itemSelected =
      nextProps.input.value.indexOf(this.state.currentValue) < 0 ||
      (this.state.currentValue === '' && nextProps.input.value.length > 1);
    if (isReset || itemSelected) {
      this.setState({
        ...parent.state,
        value: getEditorValue(nextProps.input.value),
        currentValue: nextProps.input.value
      });
    }
  }

  handleChange = value => {
    const editorState = value.getEditorState();
    const contentState = editorState.getCurrentContent();
    const transformedValue = contentStateToString(contentState);
    this.setState({
      ...updateSuggestions(
        transformedValue,
        RichTextareaWithSuggestions.InputRegex,
        this.props.availableSuggestions
      ),
      value,
      currentValue: transformedValue
    });
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

  // OnClick of an item
  handleSuggestionClick = suggestion => {
    const newCurrentValue = this.state.currentValue.replace(
      RichTextareaWithSuggestions.InputRegex,
      `$${suggestion}$`
    );

    // Reinitialize the state with the new value
    this.setState({ ...initialize(), value: getEditorValue(newCurrentValue) });

    // Replaces the $XXXX pattern by the selected suggestion
    this.props.input.onChange(newCurrentValue, `$${suggestion}$`);
  };

  handleKeyCommand(command) {
    if (command === 'myeditor-save') {
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    const {
      label,
      required,
      disabled,
      input,
      meta: { touched, error }
    } = this.props;
    const id = getControlId('rich-textarea', input.name);
    const editorValue = this.state.value;

    return (
      <div className={COMPONENT_CLASS}>
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
            // onTab={this.handleTab}
            onFocus={() => {
              this.handleInputFocus();
            }}
            ref={node => {
              this.input = node;
            }}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={myKeyBindingFn}
          />
          {touched && (error && <span className="form-error">{error}</span>)}
          {super.render()}
        </div>
      </div>
    );
  }
}

export default RichTextareaWithSuggestions;
