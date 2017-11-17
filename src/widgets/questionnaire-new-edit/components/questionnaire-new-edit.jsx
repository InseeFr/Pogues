import React, { Component } from 'react';
import { Field, formPropTypes } from 'redux-form';

import { StatisticalContextCriteria } from 'widgets/statistical-context-criteria';
import Input from 'forms/controls/input';
import Dictionary from 'utils/dictionary/dictionary';
import { WIDGET_QUESTIONNAIRE_NEW_EDIT } from 'constants/dom-constants';

const { COMPONENT_CLASS, FOOTER, CANCEL, VALIDATE } = WIDGET_QUESTIONNAIRE_NEW_EDIT;

// PropTypes and defaultProps

export const propTypes = formPropTypes;

// Componet

class QuestionnaireNewEdit extends Component {
  static propTypes = propTypes;

  render() {
    const { handleSubmit, submitting, form, onCancel } = this.props;
    return (
      <div className={COMPONENT_CLASS}>
        <form onSubmit={handleSubmit}>
          <StatisticalContextCriteria formName={form} multipleCampaign focusOnInit />

          <div>
            <Field name="label" type="text" component={Input} label={Dictionary.title} required />
          </div>
          <Field name="name" type="text" component={Input} label={Dictionary.name} required />

          <div className={FOOTER}>
            <button className={VALIDATE} type="submit" disabled={submitting}>
              {Dictionary.validate}
            </button>
            <button className={CANCEL} disabled={submitting} onClick={onCancel}>
              {Dictionary.cancel}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default QuestionnaireNewEdit;
