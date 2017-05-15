import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'components/forms/input';
import SelectWithAddNew from 'components/forms/select-with-add-new';
import ListRadioButtons from 'components/forms/list-radio-buttons';
import { required } from 'components/forms/validation-rules';
import { questionnaireName } from 'components/forms/normalize-inputs';

export function QuestionnaireNew({ handleSubmit, pristine, submitting, invalid, locale, error, onCancel }) {
  // @TODO: Remove the mocks
  const mockCampaigns = [
    {
      value: 'campagne-01',
      label: 'Campagne 01',
    },
    {
      value: 'campagne-02',
      label: 'Campagne 02',
    },
  ];

  const mockContext = [
    {
      value: 'papier',
      label: 'Papier',
    },
    {
      value: 'web',
      label: 'Web',
    },
    {
      value: 'telephone',
      label: 'Téléphone',
    },
    {
      value: 'face-a-face',
      label: 'Face-à-Face',
    },
  ];

  return (
    <div id="questionnaire-new">
      <ul display={invalid}>
        {/* eslint-disable react/no-array-index-key */}
        {error.map((e, index) => <li key={`validation-error-${index}`}>{e}</li>)}
      </ul>
      <form onSubmit={handleSubmit}>

        <Field
          name="campaign"
          component={SelectWithAddNew}
          label={locale.collectionCampaign}
          options={mockCampaigns}
          labelButton={locale.collectionCampaignNew}
          required
        />

        <Field
          name="name"
          type="text"
          component={Input}
          label={locale.name}
          validate={[required]}
          normalize={questionnaireName}
          required
        />

        <Field name="label" type="text" component={Input} label={locale.label} validate={[required]} required />

        <div>{locale.newQuestionnaireLegend}</div><br />

        <Field
          name="stamp"
          type="text"
          component={Input}
          label={locale.stamp}
          validate={[required]}
          normalize={questionnaireName}
          required
        />

        <Field name="context" component={ListRadioButtons} label={locale.contextModel} radios={mockContext} required />

        <div className="form-footer">
          {onCancel ? <button className="cancel" disabled={submitting} onClick={onCancel}>{locale.cancel}</button> : ''}
          <button type="submit" disabled={pristine || submitting}>{locale.validate}</button>
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
  locale: PropTypes.object.isRequired,
  error: PropTypes.array,
  onCancel: PropTypes.func,
};

QuestionnaireNew.defaultProps = {
  error: [],
  onCancel: undefined,
};

export default reduxForm({
  form: 'questionnaire-new',
})(QuestionnaireNew);
