import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'layout/forms/controls/input';
import { required, name as validationName } from 'layout/forms/validation-rules';
import { componentName } from 'layout/forms/normalize-inputs';
import Dictionary from 'utils/dictionary/dictionary';
import StaticalContext from 'layout/connected-widget/statistical-context';

const FORM_NAME = 'questionnaire-new';

export function QuestionnaireNewEdit({ handleSubmit, pristine, submitting, onCancel }) {
  return (
    <div id="questionnaire-new">
      <form onSubmit={handleSubmit}>
        <StaticalContext formName={FORM_NAME} required />

        <Field name="label" type="text" component={Input} label={Dictionary.title} validate={[required]} required />

        <Field
          name="name"
          type="text"
          component={Input}
          label={Dictionary.name}
          validate={[required, validationName]}
          normalize={componentName}
          required
        />

        <div className="form-footer">
          <button type="submit" disabled={pristine || submitting}>
            {Dictionary.validate}
          </button>
          {onCancel && (
            <button className="cancel" disabled={submitting} onClick={onCancel}>
              {Dictionary.cancel}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

QuestionnaireNewEdit.propTypes = {
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

QuestionnaireNewEdit.defaultProps = {
  handleSubmit: undefined,
  onCancel: undefined,
  pristine: false,
  submitting: false,
};

export default reduxForm({
  form: FORM_NAME,
})(QuestionnaireNewEdit);
