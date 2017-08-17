import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import ResponseFormat from 'questionnaire/components/response-format/response-format';
import Declaration from 'questionnaire/components/declarations/declarations';
import Controls from 'questionnaire/components/controls/controls';
import Redirections from 'questionnaire/components/redirections/redirections';
import CalculatedVariables from 'questionnaire/components/calculated-variables/calculated-variables';

import Input from 'layout/forms/controls/input';
import Tabs from 'layout/widget/tabs';
import { required } from 'layout/forms/validation-rules';
import Dictionary from 'utils/dictionary/dictionary';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import Textarea from 'layout/forms/controls/rich-textarea';

const { QUESTION } = COMPONENT_TYPE;

function getErrorsByType(errors) {
  return errors.reduce((acc, e) => {
    if (!acc[e.type]) acc[e.type] = [];
    acc[e.type].push(e);
    return acc;
  }, {});
}

export class QuestionNewEdit extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    edit: PropTypes.bool,
    handleSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    errors: PropTypes.array,
  };
  static defaultProps = {
    handleSubmit: undefined,
    onCancel: undefined,
    pristine: false,
    submitting: false,
    edit: false,
    errors: [],
  };
  componentDidMount() {
    if (this.props.edit) {
      this.nameInput.focus();
    } else if (this.props.type !== QUESTION) {
      this.labelInput.focus();
    } else {
      this.labelInput._focus();
    }
  }
  render() {
    const { type, edit, handleSubmit, onCancel, pristine, submitting, errors } = this.props;
    const errorsByType = getErrorsByType(errors);
    const panels = [
      {
        id: 'declarations',
        label: Dictionary.declaration_tabTitle,
        content: <Declaration />,
        numErrors: errorsByType.declarations && errorsByType.declarations.length,
      },
      {
        id: 'controls',
        label: Dictionary.controls,
        content: <Controls />,
        numErrors: errorsByType.controls && errorsByType.controls.length,
      },
      {
        id: 'redirections',
        label: Dictionary.goTo,
        content: <Redirections componentType={type} isNewComponent={!edit} errors={errorsByType.redirections} />,
        numErrors: errorsByType.redirections && errorsByType.redirections.length,
      },
    ];

    if (type === QUESTION) {
      panels.unshift({
        id: 'calculated-variables',
        label: Dictionary.calculatedVariables,
        content: <CalculatedVariables />,
      });
      panels.unshift({
        id: 'response-format',
        label: Dictionary.responsesEdition,
        content: <ResponseFormat />,
      });
    }

    return (
      <div className="component-edition">
        <form onSubmit={handleSubmit}>
          {edit
            ? <Field
                refs="input"
                reference={input => {
                  this.nameInput = input;
                }}
                name="name"
                type="text"
                component={Input}
                label={Dictionary.name}
                validate={[required]}
                required
              />
            : ''}
          <Field
            reference={input => {
              this.labelInput = input;
            }}
            name="label"
            type="text"
            component={type === QUESTION ? Textarea : Input}
            buttons
            label={Dictionary.title}
            validate={[required]}
            required
          />
          <Tabs components={panels} />
          <div className="form-footer">
            <button type="submit" disabled={!edit && (pristine || submitting)}>
              {Dictionary.validate}
            </button>
            {onCancel &&
              <button type="reset" className="cancel" disabled={submitting} onClick={onCancel}>
                {Dictionary.cancel}
              </button>}
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'component',
})(QuestionNewEdit);
