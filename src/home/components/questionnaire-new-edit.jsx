import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'layout/forms/controls/input';
import SelectWithAddNew from 'layout/forms/controls/select-with-add-new';
import ListRadioButtons from 'layout/forms/controls/list-radio-buttons';
import Select from 'layout/forms/controls/select';
import { required, name as validationName } from 'layout/forms/validation-rules';
import { componentName } from 'layout/forms/normalize-inputs';
import Dictionary from 'utils/dictionary/dictionary';

const FORM_NAME = 'questionnaire-new';

export function QuestionnaireNewEdit({
  handleSubmit,
  pristine,
  submitting,
  onCancel,
  collections,
  operations,
  campaigns,
  loadOperations,
  loadCampaigns,
  resetField,
}) {
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
      <form onSubmit={handleSubmit}>
        <Field name="label" type="text" component={Input} label={Dictionary.title} validate={[required]} required />

        <Field
          name="name"
          type="text"
          component={Input}
          label={Dictionary.name}
          validate={[required, validationName]}
          normalize={componentName}
          required
        />

        <Field name="stamp" type="text" component={Input} label={Dictionary.stamp} validate={[]} />

        <div>
          {Dictionary.newQuestionnaireLegend}
        </div>
        <br />

        {collections.length > 0 &&
          <Field
            name="collection"
            component={Select}
            label={Dictionary.collection}
            options={collections}
            emptyValue="--"
            onChange={e => {
              loadOperations(e.target.value);
              loadCampaigns();
              resetField(FORM_NAME, 'operation', '');
              resetField(FORM_NAME, 'campaign', '');
            }}
          />}

        {operations.length > 0 &&
          <Field
            name="operation"
            component={Select}
            label={Dictionary.operationStat}
            options={operations}
            emptyValue="--"
            onChange={e => {
              loadCampaigns(e.target.value);
              resetField(FORM_NAME, 'campaign', '');
            }}
          />}

        {operations.length > 0 &&
          campaigns.length > 0 &&
          <Field
            name="campaign"
            component={SelectWithAddNew}
            label={Dictionary.collectionCampaign}
            options={campaigns}
            emptyValue="--"
            labelButton={Dictionary.collectionCampaignNew}
          />}

        <Field
          name="model"
          component={SelectWithAddNew}
          label={Dictionary.model}
          options={mockModels}
          labelButton={Dictionary.modelNew}
        />

        <Field name="context" component={ListRadioButtons} label={Dictionary.collectionMode} radios={mockContext} />

        <div className="form-footer">
          <button type="submit" disabled={pristine || submitting}>
            {Dictionary.validate}
          </button>
          {onCancel &&
            <button className="cancel" disabled={submitting} onClick={onCancel}>
              {Dictionary.cancel}
            </button>}
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
  collections: PropTypes.arrayOf(PropTypes.object),
  operations: PropTypes.arrayOf(PropTypes.object),
  campaigns: PropTypes.arrayOf(PropTypes.object),
  loadOperations: PropTypes.func.isRequired,
  loadCampaigns: PropTypes.func.isRequired,
  resetField: PropTypes.func.isRequired,
};

QuestionnaireNewEdit.defaultProps = {
  handleSubmit: undefined,
  onCancel: undefined,
  pristine: false,
  submitting: false,
  collections: [],
  operations: [],
  campaigns: [],
};

export default reduxForm({
  form: 'questionnaire-new',
})(QuestionnaireNewEdit);
