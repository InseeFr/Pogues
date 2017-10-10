import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Select from 'layout/forms/controls/select';
import { requiredSelect, requiredListCheckboxes } from 'layout/forms/validation-rules';
import ListCheckboxes from 'forms/controls/list-checkboxes';
import GenericOption from 'forms/controls/generic-option';
import Dictionary from 'utils/dictionary/dictionary';

function StatisticalContext({ series, operations, campaigns, required, multipleCampaign }) {
  const validationProps = required ? { validate: [requiredSelect] } : {};
  const campaignsPropsBase = {
    name: 'campaigns',
    label: Dictionary.campaigns,
    disabled: campaigns.length === 0,
    required: required,
  };
  const campaignProps = {
    ...campaignsPropsBase,
    component: Select,
    options: campaigns,
  };
  const campaignPropsMultiple = {
    ...campaignsPropsBase,
    component: ListCheckboxes,
    noValuesMessage: Dictionary.noValuesCampaigns,
    validate: [requiredListCheckboxes],
  };
  return (
    <div id="statistical-context-filters">
      <Field
        name="serie"
        component={Select}
        label={Dictionary.serie}
        options={series}
        emptyValue={Dictionary.selectSerie}
        required={required}
        {...validationProps}
      />
      <Field
        name="operation"
        component={Select}
        label={Dictionary.operation}
        options={operations}
        emptyValue={Dictionary.selectOperation}
        disabled={operations.length === 0}
        required={required}
        {...validationProps}
      />
      {multipleCampaign ? (
        <Field {...campaignPropsMultiple}>
          {campaigns.map(c => (
            <GenericOption key={c.value} value={c.value}>
              {c.label}
            </GenericOption>
          ))}
        </Field>
      ) : (
        <Field {...campaignProps} />
      )}
    </div>
  );
}

StatisticalContext.propTypes = {
  series: PropTypes.array,
  operations: PropTypes.array,
  campaigns: PropTypes.array,
  required: PropTypes.bool.isRequired,
  multipleCampaign: PropTypes.bool.isRequired,
};

StatisticalContext.defaultProps = {
  series: [],
  operations: [],
  campaigns: [],
};

export default StatisticalContext;
