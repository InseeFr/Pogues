import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import ResponseFormat from 'questionnaire/components/response-format/response-format';
import Declaration from 'questionnaire/containers/declaration/declaration';
import Controls from 'questionnaire/containers/controls/controls';
import Redirections from 'questionnaire/containers/redirections/redirections';

import Input from 'layout/forms/controls/input';
import Tabs from 'layout/widget/tabs';
import { required } from 'layout/forms/validation-rules';
import Dictionary from 'utils/dictionary/dictionary';

export class QuestionNewEdit extends Component {
  static propTypes = {
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
  render() {
    const { edit, handleSubmit, onCancel, pristine, submitting } = this.props;
    const panels = [
      {
        label: Dictionary.responsesEdition,
        content: <ResponseFormat />,
      },
      {
        label: Dictionary.declaration_tabTitle,
        content: <Declaration />,
      },
      {
        label: Dictionary.controls,
        content: <Controls />,
      },
      {
        label: Dictionary.goTo,
        content: <Redirections />,
      },
    ];

    return (
      <div id="generic-input-new">
        <form onSubmit={handleSubmit}>
          {edit
            ? <Field name="name" type="text" component={Input} label={Dictionary.name} validate={[required]} required />
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
            {onCancel
              ? <button className="cancel" disabled={submitting} onClick={onCancel}>{Dictionary.cancel}</button>
              : ''}
            <button type="submit" disabled={pristine || submitting}>{Dictionary.validate}</button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'question',
})(QuestionNewEdit);
