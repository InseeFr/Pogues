import React from 'react';
import { formPropTypes, Field } from 'redux-form';

import { StatisticalContextCriteria } from 'widgets/statistical-context-criteria';
import { AssociatedFields } from 'widgets/associated-fields';
import Dictionary from 'utils/dictionary/dictionary';
import { WIDGET_QUESTIONNAIRE_NEW_EDIT } from 'constants/dom-constants';

import ListCheckboxes from 'forms/controls/list-checkboxes';
import GenericOption from 'forms/controls/generic-option';
import ListRadios from 'forms/controls/list-radios';
import { TargetMode, QUESTIONNAIRE_TYPE } from 'constants/pogues-constants';

import { updateNameField } from 'utils/utils';

const {
  COMPONENT_CLASS,
  FOOTER,
  CANCEL,
  VALIDATE,
} = WIDGET_QUESTIONNAIRE_NEW_EDIT;

const { Filtres, Redirections } = QUESTIONNAIRE_TYPE;
// Componet

function QuestionnaireNewEdit({ handleSubmit, submitting, form, onCancel }) {
  return (
    <div className={COMPONENT_CLASS}>
      <form onSubmit={handleSubmit}>
        <StatisticalContextCriteria
          formName={form}
          multipleCampaign
          focusOnInit
        />

        <AssociatedFields
          formName={form}
          fieldOrigin={{ name: 'label', label: Dictionary.title }}
          fieldTarget={{ name: 'name', label: Dictionary.name }}
          action={updateNameField}
        />

        <Field
          name="TargetMode"
          component={ListCheckboxes}
          label={Dictionary.collectionMode}
          inline
        >
          {TargetMode.map(s => (
            <GenericOption key={s.value} value={s.value}>
              {s.label}
            </GenericOption>
          ))}
        </Field>
        <Field
          name="dynamiqueSpecified"
          component={ListRadios}
          label={Dictionary.dynamiqueSpecified}
          inline
        >
          <GenericOption key={Redirections} value={Redirections}>
            {Dictionary.QGoTo}
          </GenericOption>
          <GenericOption key={Filtres} value={Filtres}>
            {Dictionary.QFilter}
          </GenericOption>
        </Field>
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

QuestionnaireNewEdit.propTypes = formPropTypes;

export default QuestionnaireNewEdit;
