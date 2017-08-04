import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'layout/forms/controls/input';
import SelectWithAddNew from 'layout/forms/controls/select-with-add-new';
import ListRadioButtons from 'layout/forms/controls/list-radio-buttons';
import Select from 'layout/forms/controls/select';
import { required } from 'layout/forms/validation-rules';
import { questionnaireName } from 'layout/forms/normalize-inputs';
import Dictionary from 'utils/dictionary/dictionary';

export function QuestionnaireNewEdit({ handleSubmit, pristine, submitting, invalid, error, onCancel }) {
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

        <Field name="label" type="text" component={Input} label={Dictionary.title} validate={[required]} required />

        <Field
          name="name"
          type="text"
          component={Input}
          label={Dictionary.name}
          validate={[required]}
          normalize={questionnaireName}
          required
        />

        <Field name="stamp" type="text" component={Input} label={Dictionary.stamp} validate={[]} />

        <div>{Dictionary.newQuestionnaireLegend}</div>
        <br />

        <Field name="collection" component={Select} label={Dictionary.collection} options={mockCollections} required />

        <Field name="operation" component={Select} label={Dictionary.operationStat} options={mockOperations} required />

        <Field
          name="campaign"
          component={SelectWithAddNew}
          label={Dictionary.collectionCampaign}
          options={mockCampaigns}
          labelButton={Dictionary.collectionCampaignNew}
          required
        />

        <Field
          name="model"
          component={SelectWithAddNew}
          label={Dictionary.model}
          options={mockModels}
          labelButton={Dictionary.modelNew}
          required
        />

        <Field
          name="context"
          component={ListRadioButtons}
          label={Dictionary.collectionMode}
          radios={mockContext}
          required
        />

        <div className="form-footer">
          <button type="submit" disabled={pristine || submitting}>{Dictionary.validate}</button>
          {onCancel && <button className="cancel" disabled={submitting} onClick={onCancel}>{Dictionary.cancel}</button>}
        </div>
      </form>
    </div>
  );
}

QuestionnaireNewEdit.propTypes = {
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
