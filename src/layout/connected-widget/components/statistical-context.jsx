import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Select from 'layout/forms/controls/select';
import { requiredSelect } from 'layout/forms/validation-rules';

function StatisticalContext({ series, operations, campaigns, required }) {
  const validationProps = required ? { validate: [requiredSelect] } : {};
  return (
    <div id="statistical-context-filters">
      <Field
        name="serie"
        component={Select}
        label="Serie"
        options={series}
        emptyValue={'Select a serie'}
        required={required}
        {...validationProps}
      />
      <Field
        name="operation"
        component={Select}
        label="Operation"
        options={operations}
        emptyValue={'Select an operation'}
        disabled={operations.length === 0}
        required={required}
        {...validationProps}
      />
      <Field
        name="campaign"
        component={Select}
        label="Campaign"
        options={campaigns}
        emptyValue={'Select a campaign'}
        disabled={campaigns.length === 0}
        required={required}
        {...validationProps}
      />
    </div>
  );
}

StatisticalContext.propTypes = {
  series: PropTypes.array,
  operations: PropTypes.array,
  campaigns: PropTypes.array,
  required: PropTypes.bool.isRequired,
};

StatisticalContext.defaultProps = {
  series: [],
  operations: [],
  campaigns: [],
};

export default StatisticalContext;
