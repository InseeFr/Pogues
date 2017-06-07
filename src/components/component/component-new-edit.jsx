import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import ResponseFormatContainer from 'containers/response-format/response-format';
import Input from 'components/forms/controls/input';
import Tabs from 'components/widget/tabs';
import { required } from 'components/forms/validation-rules';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';

const { QUESTION } = COMPONENT_TYPE;

export function ComponentNewEdit({
  componentId,
  questionnaireId,
  handleSubmit,
  pristine,
  submitting,
  type,
  edit,
  // invalid,
  // error,
  onCancel,
}) {
  const panels = [];

  if (type === QUESTION && edit) {
    panels.push({
      label: Dictionary.responsesEdition,
      content: <ResponseFormatContainer questionId={componentId} questionnaireId={questionnaireId} />,
    });
  }

  return (
    <div id="generic-input-new">
      {/* <ul display={invalid}>*/}
      {/* /!* eslint-disable react/no-array-index-key *!/*/}
      {/* {error.map((e, index) => <li key={`validation-error-${index}`}>{e}</li>)}*/}
      {/* </ul>*/}
      <form onSubmit={handleSubmit}>
        {edit
          ? <Field name="name" type="text" component={Input} label={Dictionary.name} validate={[required]} required />
          : ''}

        <Field name="label" type="text" component={Input} label={Dictionary.title} validate={[required]} required />

        {panels.length > 0 ? <Tabs components={panels} /> : ''}

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

ComponentNewEdit.propTypes = {
  type: PropTypes.string.isRequired,
  componentId: PropTypes.string,
  questionnaireId: PropTypes.string,
  edit: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  // invalid: PropTypes.bool,
  // error: PropTypes.array,
};

ComponentNewEdit.defaultProps = {
  handleSubmit: undefined,
  onCancel: undefined,
  pristine: false,
  submitting: false,
  invalid: false,
  error: [],
  edit: false,
  componentId: undefined,
  questionnaireId: undefined,
};

export default reduxForm({
  form: 'questionnaire-new',
})(ComponentNewEdit);
