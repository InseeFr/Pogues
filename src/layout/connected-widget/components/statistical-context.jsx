import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Select from 'layout/forms/controls/select';
import { requiredSelect, requiredSelectMultiple } from 'layout/forms/validation-rules';
import Dictionary from 'utils/dictionary/dictionary';

function StatisticalContext({ series, operations, campaigns, required, multipleCampaign }) {
  const validationProps = required ? { validate: [requiredSelect] } : {};
  const validationPropsMultiple = required ? { validate: [requiredSelectMultiple] } : {};
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
      <Field
        name="campaigns"
        component={Select}
        label={Dictionary.campaigns}
        options={campaigns}
        emptyValue={Dictionary.selectCampaigns}
        disabled={campaigns.length === 0}
        required={required}
        multiple={multipleCampaign}
        {...validationPropsMultiple}
      />
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
