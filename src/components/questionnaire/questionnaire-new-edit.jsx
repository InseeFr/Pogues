import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'components/forms/input';
import SelectWithAddNew from 'components/forms/select-with-add-new';
import ListRadioButtons from 'components/forms/list-radio-buttons';
import Select from 'components/forms/select';
import { required } from 'components/forms/validation-rules';
import { questionnaireName } from 'components/forms/normalize-inputs';

export function QuestionnaireNewEdit({ handleSubmit, pristine, submitting, invalid, locale, error, onCancel }) {
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
  const mockModels = [
    {
      value: 'model-01',
      label: 'Modèle 01',
    },
    {
      value: 'model-02',
      label: 'Modèle 02',
    },
  ];
  const mockCollections = [
    {
      value: 'serie-01',
      label: 'Série 01',
    },
    {
      value: 'serie-02',
      label: 'Série 02',
    },
  ];
  const mockOperations = [
    {
      value: 'operation-01',
      label: 'Opération statisque 01',
    },
    {
      value: 'operation-02',
      label: 'Opération statisque 02',
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

        <Field name="label" type="text" component={Input} label={locale.title} validate={[required]} required />

        <Field
          name="id"
          type="text"
          component={Input}
          label={locale.name}
          validate={[required]}
          normalize={questionnaireName}
          required
        />

        <Field
          name="stamp"
          type="text"
          component={Input}
          label={locale.stamp}
          validate={[required]}
          required
        />

        <div>{locale.newQuestionnaireLegend}</div><br />

        <Field name="collection" component={Select} label={locale.collection} options={mockCollections} required />

        <Field name="operation" component={Select} label={locale.operationStat} options={mockOperations} required />

        <Field
          name="campaign"
          component={SelectWithAddNew}
          label={locale.collectionCampaign}
          options={mockCampaigns}
          labelButton={locale.collectionCampaignNew}
          required
        />

        <Field
          name="model"
          component={SelectWithAddNew}
          label={locale.model}
          options={mockModels}
          labelButton={locale.modelNew}
          required
        />

        <Field
          name="context"
          component={ListRadioButtons}
          label={locale.collectionMode}
          radios={mockContext}
          required
        />

        <div className="form-footer">
          {onCancel ? <button className="cancel" disabled={submitting} onClick={onCancel}>{locale.cancel}</button> : ''}
          <button type="submit" disabled={pristine || submitting}>{locale.validate}</button>
        </div>
      </form>
    </div>
  );
}

QuestionnaireNewEdit.propTypes = {
  locale: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  error: PropTypes.array,
};

QuestionnaireNewEdit.defaultProps = {
  handleSubmit: undefined,
  onCancel: undefined,
  pristine: false,
  submitting: false,
  invalid: false,
  error: [],
};

export default reduxForm({
  form: 'questionnaire-new',
})(QuestionnaireNewEdit);
