// import { EditorState, Modifier, getDefaultKeyBinding } from 'draft-js';
import PropTypes from 'prop-types';
import React from 'react';

import ControlWithSuggestion from './control-with-suggestions';
import { updateSuggestions } from './input-with-suggestions-utils';
import { getPattern, getStartValueWithSuggestion } from './utils';

import {
  contentStateToString,
  getEditorValue,
  toolbarConfig,
} from '../../rich-textarea';

import { CONTROL_RICH_TEXTAREA } from '../../../../constants/dom-constants';
import { getControlId } from '../../../../utils/widget-utils';

const { COMPONENT_CLASS } = CONTROL_RICH_TEXTAREA;

function myKeyBindingFn(e) {
  if (e.key === 'Tab') {
    return 'myeditor-save';
  }
  return getDefaultKeyBinding(e);
}

// PropTypes and defaultProps

const propTypes = {
  submitOnEnter: PropTypes.bool,
  toolbar: PropTypes.object,
};
const defaultProps = {
  submitOnEnter: false,
  toolbar: toolbarConfig,
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
      currentValue: props.input.value,
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.textChange = this.textChange.bind(this);
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
        currentValue: nextProps.input.value,
      });
    }
  }

  handleChange = value => {
    const editorState = value.getEditorState();
    const contentState = editorState.getCurrentContent();
    const transformedValue = contentStateToString(contentState);

    const caretCursor = this.state.value
      .getEditorState()
      .getSelection()
      .getStartOffset();

    const filteredValue = getPattern(transformedValue, caretCursor, true);

    let newState = {
      value,
      currentValue: filteredValue,
    };
    if (caretCursor > 0) {
      newState = {
        ...newState,
        ...updateSuggestions(
          filteredValue,
          RichTextareaWithSuggestions.InputRegex,
          this.props.availableSuggestions,
        ),
      };
    }
    this.setState(newState);
    this.props.input.onChange(transformedValue);
  };

  handleReturn = e => {
    if (this.props.submitOnEnter) {
      e.preventDefault();
      e.target.closest('form').querySelector('button[type=submit]').click();
    }
  };

  textChange(value) {
    const contentState = value.getEditorState().getCurrentContent();
    const currentValue = contentStateToString(contentState);
    this.props.input.onChange(currentValue);
    this.setState({ value, currentValue });
  }

  handleSuggestionClick = suggestion => {
    const caretCursor = this.state.value
      .getEditorState()
      .getSelection()
      .getStartOffset();

    const fullText = this.state.value
      .getEditorState()
      .getCurrentContent()
      .getPlainText();

    const newCurrentValue = getStartValueWithSuggestion(caretCursor, fullText);

    const targetSelection = this.state.value.getEditorState().getSelection();
    const contentState = this.state.value.getEditorState().getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'suggestion',
      'MUTABLE',
      { status: 'complete' },
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const targetRange = targetSelection.merge({
      anchorOffset: newCurrentValue + 1,
      focusOffset: caretCursor,
      isBackward: false,
    });

    const newContentState = Modifier.replaceText(
      contentState,
      targetRange,
      `${suggestion}$`,
      null,
      entityKey,
    );

    const newEditorState = EditorState.push(
      this.state.value.getEditorState(),
      newContentState,
      'addentity',
    );
    this.textChange(this.state.value.setEditorState(newEditorState));
  };

  handleKeyCommand = command => {
    if (command === 'myeditor-save') {
      return 'handled';
    }
    return 'not-handled';
  };

  render() {
    const {
      label,
      required,
      disabled,
      input,
      toolbar,
      meta: { touched, error },
      targetIsQuestion,
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
          <div style={{ color: 'red' }}>
            <b>ToDo</b>RichTextEditor
          </div>
          {/* <RichTextEditor
            blockStyleFn={() => 'singleline'}
            value={editorValue}
            onChange={this.handleChange}
            toolbarConfig={targetIsQuestion ? toolbarConfigQuestion : toolbar}
            handleReturn={this.handleReturn}
            rootStyle={rootStyle}
            formatURL={formatURL}
            disabled={disabled}
            onFocus={() => {
              this.handleInputFocus();
              input.onFocus();
            }}
            ref={node => {
              this.input = node;
            }}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={myKeyBindingFn}
          /> */}
          {touched && error && <span className="form-error">{error}</span>}
          {super.render()}
        </div>
      </div>
    );
  }
}

export default RichTextareaWithSuggestions;
