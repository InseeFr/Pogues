import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import ResponseFormat from 'questionnaire/components/response-format/response-format';
import Declaration from 'questionnaire/components/declarations/declarations';
import Controls from 'questionnaire/components/controls/controls';
import Redirections from 'questionnaire/components/redirections/redirections';

import Input from 'layout/forms/controls/input';
import Tabs from 'layout/widget/tabs';
import { required } from 'layout/forms/validation-rules';
import Dictionary from 'utils/dictionary/dictionary';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

export class QuestionNewEdit extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    edit: PropTypes.bool,
    handleSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
  };
  static defaultProps = {
    handleSubmit: undefined,
    onCancel: undefined,
    pristine: false,
    submitting: false,
    edit: false,
  };
  componentDidMount() {
    if (this.props.edit) {
      this.nameInput.focus();
    } else {
      this.labelInput.focus();
    }
  }
  render() {
    const { type, edit, handleSubmit, onCancel, pristine, submitting } = this.props;
    const panels = [
      {
        id: 'declarations',
        label: Dictionary.declaration_tabTitle,
        content: <Declaration />,
      },
      {
        id: 'controls',
        label: Dictionary.controls,
        content: <Controls />,
      },
      {
        id: 'redirections',
        label: Dictionary.goTo,
        content: <Redirections />,
      },
    ];

    if (type === QUESTION) {
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
            component={Input}
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
              <button className="cancel" disabled={submitting} onClick={onCancel}>
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
