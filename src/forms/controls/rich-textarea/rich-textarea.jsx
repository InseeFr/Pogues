import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import RichTextEditor, {
  ButtonGroup,
} from 'gillespie59-react-rte/lib/RichTextEditor';
import clearEntityForRange from 'gillespie59-react-rte/lib/lib/clearEntityForRange';
import getEntityAtCursor from 'gillespie59-react-rte/lib/lib/getEntityAtCursor';
import { getDefaultKeyBinding, EditorState, Modifier } from 'draft-js';

import { toolbarConfig, rootStyle } from './rich-textarea-toobar-config';
import {
  getEditorValue,
  contentStateToString,
} from './utils/rich-textarea-utils';
import PopoverIconButton from './ui/popover-icon-button';
import IconButton from './ui/icon-button';
import InputConditionPopover from './ui/input-condition-popover';

import { getControlId } from 'utils/widget-utils';
import { CONTROL_RICH_TEXTAREA } from 'constants/dom-constants';
import { formatURL } from 'forms/controls/rich-textarea';

const { COMPONENT_CLASS, EDITOR_CLASS } = CONTROL_RICH_TEXTAREA;

// Utils

function getSelectionAtCursor(editorState) {
  const contentState = editorState.getCurrentContent();
  const entity = getEntityAtCursor(editorState);
  return entity == null ? null : contentState.getEntity(entity.entityKey);
}

// Control
const RichTextarea = props => {
  const {
    className,
    label,
    required,
    focusOnInit,
    showAddConditions,
    toolbar,
    input,
    meta: { touched, error },
  } = props;

  const [editorValue, setEditorValue] = useState(props.input.value);
  const [value, setValue] = useState(props.input.value);
  const [showConditionInput, setShowConditionInput] = useState(false);

  useEffect(() => {
    if (props.input.value !== value) {
      setEditorValue(getEditorValue(props.input.value));
      setValue(props.input.value);
    }
  }, [props.input.value, value]);

  const setCondition = (conditions, editorState) => {
    let contentState = editorState.getCurrentContent();
    const targetSelection = editorState.getSelection();
    contentState = contentState.createEntity('CONDITION', 'MUTABLE', {
      conditions,
    });
    const entityKey = contentState.getLastCreatedEntityKey();
    let newEditorState = EditorState.push(editorState, contentState);
    const withoutCondition = Modifier.applyEntity(
      newEditorState.getCurrentContent(),
      targetSelection,
      entityKey,
    );
    newEditorState = EditorState.push(
      newEditorState,
      withoutCondition,
      'apply-entity',
    );

    setShowConditionInput(false);
    handleChange(editorValue.setEditorState(newEditorState));
  };

  const removeCondition = editorState => {
    const entity = getEntityAtCursor(editorState);
    if (entity != null) {
      const { blockKey, startOffset, endOffset } = entity;
      const newEditorState = clearEntityForRange(
        editorState,
        blockKey,
        startOffset,
        endOffset,
      );
      handleChange(editorValue.setEditorState(newEditorState));
    }
  };

  const toggleShowConditionInput = () => {
    setShowConditionInput(!showConditionInput);
  };

  const handleChange = editorValue => {
    const contentState = editorValue.getEditorState().getCurrentContent();
    const value = contentStateToString(contentState);
    props.input.onChange(value);
    setEditorValue(value);
  };

  const keyBinding = e => {
    if (e.keyCode === 13 && props.onEnter) {
      props.onEnter();
      return 'rich-textarea-enter';
    }
    return getDefaultKeyBinding(e);
  };

  const id = getControlId('rich-textarea', input.name);

  let customProps = {
    className: EDITOR_CLASS,
    placeholder: label,
    value: editorValue,
    onChange: handleChange,
    toolbarConfig: toolbar,
    autoFocus: focusOnInit,
    keyBindingFn: keyBinding,
    rootStyle,
    formatURL,
  };

  if (showAddConditions) {
    customProps = {
      ...customProps,
      customControls: [
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
                showPopover={showConditionInput}
                onTogglePopover={toggleShowConditionInput}
                onSubmit={conditions => {
                  setCondition(conditions, editorState);
                }}
                placeholder="Add condition"
                InputPopover={InputConditionPopover}
                data={data}
              />

              <IconButton
                label="Remove condition"
                iconName="remove-conditions"
                isDisabled={!isCursorOnCondition}
                onClick={() => removeCondition(editorState)}
                focusOnClick={false}
              />
            </ButtonGroup>
          );
        },
      ],
    };
  }

  return (
    <div className={`${COMPONENT_CLASS} ${className}`}>
      <label htmlFor={id}>
        {label}
        {required && <span className="ctrl-required">*</span>}
      </label>
      <div>
        <RichTextEditor {...customProps} />

        {touched && error && <span className="form-error">{error}</span>}
      </div>
    </div>
  );
};

// PropTypes and defaultProps

RichTextarea.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  label: PropTypes.string.isRequired,
  toolbar: PropTypes.object,
  className: PropTypes.string,
  required: PropTypes.bool,
  focusOnInit: PropTypes.bool,
  showAddConditions: PropTypes.bool,
  onEnter: PropTypes.func,
};

RichTextarea.defaultProps = {
  required: false,
  disabled: false,
  identifier: undefined,
  className: undefined,
  focusOnInit: false,
  showAddConditions: false,
  onEnter: undefined,
  toolbar: toolbarConfig,
};

export default RichTextarea;
