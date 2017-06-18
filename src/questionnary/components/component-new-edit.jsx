import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import ResponseFormatContainer from 'containers/response-format/response-format';
import Input from 'components/forms/controls/input';
import Tabs from 'layout/widget/tabs';
import { required } from 'components/forms/validation-rules';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';

const { QUESTION } = COMPONENT_TYPE;

class ComponentNewEdit extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    componentId: PropTypes.string,
    questionnaireId: PropTypes.string,
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
    invalid: false,
    error: [],
    edit: false,
    componentId: undefined,
    questionnaireId: undefined,
  };
  componentDidMount() {
    this.labelInput.focus();
  }
  render() {
    const { componentId, questionnaireId, handleSubmit, pristine, submitting, type, edit, onCancel } = this.props;

    const panels = [];

    if (type === QUESTION && edit) {
      panels.push({
        label: Dictionary.responsesEdition,
        content: <ResponseFormatContainer questionId={componentId} questionnaireId={questionnaireId} />,
      });
    }

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

          {panels.length > 0 ? <Tabs components={panels} /> : ''}

          <div className="form-footer">
            {onCancel
              ? <button className="cancel" disabled={submitting} onClick={onCancel}>{Dictionary.cancel}</button>
              : ''}
            <button type="submit" disabled={!edit ? pristine || submitting : false}>{Dictionary.validate}</button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'questionnaire-new',
})(ComponentNewEdit);
