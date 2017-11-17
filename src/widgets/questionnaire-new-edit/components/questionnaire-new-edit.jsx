import React, { Component } from 'react';
import { formPropTypes } from 'redux-form';

import { StatisticalContextCriteria } from 'widgets/statistical-context-criteria';
import { AssociatedFields } from 'widgets/associated-fields';

import Dictionary from 'utils/dictionary/dictionary';
import { WIDGET_QUESTIONNAIRE_NEW_EDIT } from 'constants/dom-constants';

const { COMPONENT_CLASS, FOOTER, CANCEL, VALIDATE } = WIDGET_QUESTIONNAIRE_NEW_EDIT;

// Utils

function updateNameField(currentValueLabel, currentValueName) {
  let value = currentValueName;

  if (currentValueName === '') {
    value = currentValueLabel
      .replace(/[^a-z0-9_]/gi, '')
      .toUpperCase()
      .slice(0, 10);
  }

  return value;
}

// PropTypes and defaultP rops

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

          <AssociatedFields
            formName={form}
            fieldOrigin={{ name: 'label', label: Dictionary.title }}
            fieldTarget={{ name: 'name', label: Dictionary.name }}
            action={updateNameField}
          />

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
