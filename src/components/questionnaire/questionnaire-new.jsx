import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'components/forms/input';
import { required } from 'components/forms/validation-rules';
import { questionnaireName } from 'components/forms/normalize-inputs';

export function QuestionnaireNew({ handleSubmit, pristine, submitting, invalid, error }) {
  return (
    <div id="questionnaire-new">
      <ul display={invalid}>
        {error.map((e, index) => <li key={`validation-error-${index}`}>{e}</li>)}
      </ul>
      <form onSubmit={handleSubmit}>
        <Field
          name="name"
          type="text"
          component={Input}
          label="Name"
          validate={[required]}
          normalize={questionnaireName}
        />
        <Field name="label" type="text" component={Input} label="Label" validate={[required]} />
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
        </div>
      </form>
    </div>
  );
}

QuestionnaireNew.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.array,
};

QuestionnaireNew.defaultProps = {
  error: [],
};

export default reduxForm({
  form: 'questionnaire-new',
})(QuestionnaireNew);
