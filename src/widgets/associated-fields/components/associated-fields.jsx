import React, { useCallback } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Input from '../../../forms/controls/input';
import { markdownVtlToString } from '../../../forms/controls/rich-textarea';
import {
  RichEditorWithVariable,
  InputWithVariableAutoCompletion,
} from '../../../forms/controls/control-with-suggestions';

import { WIDGET_ASSOCIATED_FIELDS } from '../../../constants/dom-constants';

const { COMPONENT_CLASS } = WIDGET_ASSOCIATED_FIELDS;

function AssociatedFields({
  action,
  change,
  formName,
  fieldTarget: { name: nameTarget },
  currentValueOrigin,
  currentValueTarget,
  fieldOrigin,
  fieldTarget,
  targetIsRichTextarea,
  targetIsQuestion,
  focusOnInit,
  handleDisableValidation,
  onEnter,
}) {
  const onBlur = useCallback(() => {
    let valueOrigin = currentValueOrigin;
    if (targetIsRichTextarea) {
      valueOrigin = markdownVtlToString(currentValueOrigin);
    }
    const newValueTarget = action(valueOrigin, currentValueTarget);
    change(formName, nameTarget, newValueTarget);
  }, [
    action,
    change,
    currentValueOrigin,
    currentValueTarget,
    formName,
    nameTarget,
    targetIsRichTextarea,
  ]);

  return (
    <div className={COMPONENT_CLASS}>
      {targetIsRichTextarea ? (
        <div onBlur={onBlur}>
          <Field
            props={{
              targetIsQuestion,
            }}
            name={fieldOrigin.name}
            component={RichEditorWithVariable}
            label={fieldOrigin.label}
            focusOnInit={focusOnInit}
            setDisableValidation={handleDisableValidation}
          />
        </div>
      ) : (
        <Field
          onBlur={onBlur}
          name={fieldOrigin.name}
          type="text"
          component={InputWithVariableAutoCompletion}
          label={fieldOrigin.label}
          focusOnInit={focusOnInit}
          onEnter={onEnter}
        />
      )}
      <Field
        name={fieldTarget.name}
        type="text"
        component={Input}
        label={fieldTarget.label}
        onEnter={onEnter}
      />
    </div>
  );
}

AssociatedFields.propTypes = {
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

AssociatedFields.defaultProps = {
  currentValueOrigin: '',
  currentValueTarget: '',
  focusOnInit: false,
  onEnter: undefined,
};

export default AssociatedFields;
