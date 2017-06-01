import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'components/forms/controls/input';
import { required } from 'components/forms/validation-rules';

export function GenericInputNew({ handleSubmit, pristine, submitting, invalid, locale, error, onCancel }) {
  return (
    <div id="generic-input-new">
      <ul display={invalid}>
        {/* eslint-disable react/no-array-index-key */}
        {error.map((e, index) => <li key={`validation-error-${index}`}>{e}</li>)}
      </ul>
      <form onSubmit={handleSubmit}>

        <Field name="label" type="text" component={Input} label={locale.title} validate={[required]} required />

        <div className="form-footer">
          {onCancel ? <button className="cancel" disabled={submitting} onClick={onCancel}>{locale.cancel}</button> : ''}
          <button type="submit" disabled={pristine || submitting}>{locale.validate}</button>
        </div>
      </form>
    </div>
  );
}

GenericInputNew.propTypes = {
  locale: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  error: PropTypes.array,
};

GenericInputNew.defaultProps = {
  handleSubmit: undefined,
  onCancel: undefined,
  pristine: false,
  submitting: false,
  invalid: false,
  error: [],
};

export default reduxForm({
  form: 'questionnaire-new',
})(GenericInputNew);
