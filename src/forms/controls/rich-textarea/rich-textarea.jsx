import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import RichTextEditor, { ButtonGroup } from 'gillespie59-react-rte/lib/RichTextEditor';
import clearEntityForRange from './lib/clear-entity-for-range';
import { getDefaultKeyBinding, EditorState, Modifier, convertToRaw } from 'draft-js';
// import ReactDOM from 'react-dom';

import { toolbarConfig, rootStyle } from './rich-textarea-toobar-config';
import { getValue, editorValueToMarkdown } from './rich-textarea-utils';
import PopoverIconButton from './ui/popover-icon-button';
import IconButton from './ui/icon-button';
import getEntityAtCursor from './lib/get-entity-at-cursor';
import InputConditionPopover from './ui/input-condition-popover';

import { getControlId } from 'utils/widget-utils';
import { CONTROL_RICH_TEXTAREA } from 'constants/dom-constants';

const { COMPONENT_CLASS, EDITOR_CLASS } = CONTROL_RICH_TEXTAREA;

// Utils

function getSelectionAtCursor(editorState) {
  const contentState = editorState.getCurrentContent();
  const entity = getEntityAtCursor(editorState);
  return entity == null ? null : contentState.getEntity(entity.entityKey);
}

function formatCondition(conditions) {
  return { conditions };
}

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
      showConditionInput: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.keyBinding = this.keyBinding.bind(this);
    this.toggleShowConditionInput = this.toggleShowConditionInput.bind(this);
    this.setCondition = this.setCondition.bind(this);
    this.removeCondition = this.removeCondition.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.input.value !== this.state.markdownValue) {
      this.setState({
        value: getValue(nextProps.input.value),
        markdownValue: nextProps.input.value,
      });
    }
  }

  setCondition(conditions, editorState) {
    let contentState = editorState.getCurrentContent();
    const targetSelection = editorState.getSelection();
    contentState = contentState.createEntity('CONDITION', 'MUTABLE', formatCondition(conditions));
    const entityKey = contentState.getLastCreatedEntityKey();
    let newEditorState = EditorState.push(editorState, contentState);
    const withoutCondition = Modifier.applyEntity(newEditorState.getCurrentContent(), targetSelection, entityKey);
    newEditorState = EditorState.push(newEditorState, withoutCondition, 'apply-entity');

    this.setState({ showConditionInput: false });
    this.handleChange(this.state.value.setEditorState(newEditorState));
  }

  removeCondition(editorState) {
    const entity = getEntityAtCursor(editorState);
    if (entity != null) {
      const { blockKey, startOffset, endOffset } = entity;
      const newEditorState = clearEntityForRange(editorState, blockKey, startOffset, endOffset);
      this.handleChange(this.state.value.setEditorState(newEditorState));
    }
  }

  toggleShowConditionInput() {
    const isShowing = this.state.showConditionInput;
    this.setState({ showConditionInput: !isShowing });
  }

  handleChange(editorValue) {
    const editorState = editorValue.getEditorState();
    const contentState = editorState.getCurrentContent();
    const markdownValue = editorValueToMarkdown(contentState);
    // const markdownValue = convertToRaw(contentState);
    this.props.input.onChange(markdownValue);
    this.setState({ value: editorValue, markdownValue: markdownValue });
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
            customControls={[
              // eslint-disable-next-line no-unused-vars
              (setValue, getValueButton, editorState) => {
                let data;
                let isCursorOnCondition = false;
                const selection = editorState.getSelection();
                const entity = getSelectionAtCursor(editorState);
                const hasSelection = !selection.isCollapsed();

                if (entity != null && entity.type === 'CONDITION') {
                  data = entity.getData();
                  isCursorOnCondition = true;
                }

                const shouldShowConditionButton = hasSelection || isCursorOnCondition;

                return (
                  <ButtonGroup key="conditions">
                    <PopoverIconButton
                      label="Add condition"
                      iconName="add-conditions"
                      isDisabled={!shouldShowConditionButton}
                      showPopover={this.state.showConditionInput}
                      onTogglePopover={this.toggleShowConditionInput}
                      onSubmit={conditions => {
                        this.setCondition(conditions, editorState);
                      }}
                      placeholder="Add condition"
                      InputPopover={InputConditionPopover}
                      data={data}
                    />

                    <IconButton
                      label="Remove condition"
                      iconName="remove-conditions"
                      isDisabled={!isCursorOnCondition}
                      onClick={() => this.removeCondition(editorState)}
                      focusOnClick={false}
                    />
                  </ButtonGroup>
                );
              },
            ]}
          />

          {touched && (error && <span className="form-error">{error}</span>)}
        </div>
      </div>
    );
  }
}

export default RichTextarea;
