import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'components/forms/controls/input';
import { required } from 'components/forms/validation-rules';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

export function ComponentNewEdit({ handleSubmit, pristine, submitting, type, edit, invalid, locale, error, onCancel }) {
  return (
    <div id="generic-input-new">
      {/* <ul display={invalid}>*/}
      {/* /!* eslint-disable react/no-array-index-key *!/*/}
      {/* {error.map((e, index) => <li key={`validation-error-${index}`}>{e}</li>)}*/}
      {/* </ul>*/}
      <form onSubmit={handleSubmit}>
        {edit
          ? <Field name="name" type="text" component={Input} label={locale.name} validate={[required]} required />
          : ''}

        <Field name="label" type="text" component={Input} label={locale.title} validate={[required]} required />

        <div className="form-footer">
          {onCancel ? <button className="cancel" disabled={submitting} onClick={onCancel}>{locale.cancel}</button> : ''}
          <button type="submit" disabled={pristine || submitting}>{locale.validate}</button>
        </div>
      </form>
    </div>
  );
}

ComponentNewEdit.propTypes = {
  locale: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  error: PropTypes.array,
};

ComponentNewEdit.defaultProps = {
  handleSubmit: undefined,
  onCancel: undefined,
  pristine: false,
  submitting: false,
  invalid: false,
  error: [],
  edit: false,
};

export default reduxForm({
  form: 'questionnaire-new',
})(ComponentNewEdit);
