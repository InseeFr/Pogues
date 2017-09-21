import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Select from 'layout/forms/controls/select';

function StatisticalContextFilters({ series, operations, campaigns }) {
  return (
    <div id="statistical-context-filters">
      <form>
        <Field name="serie" component={Select} label="Serie" options={series} emptyValue={'Select a serie'} />
        <Field
          name="operation"
          component={Select}
          label="Operation"
          options={operations}
          emptyValue={'Select an operation'}
          disabled={operations.length === 0}
        />
        <Field
          name="campaign"
          component={Select}
          label="Campaign"
          options={campaigns}
          emptyValue={'Select a campaign'}
          disabled={campaigns.length === 0}
        />
      </form>
    </div>
  );
}

StatisticalContextFilters.propTypes = {
  series: PropTypes.array,
  operations: PropTypes.array,
  campaigns: PropTypes.array,
};

StatisticalContextFilters.defaultProps = {
  series: [],
  operations: [],
  campaigns: [],
};

export default reduxForm({
  form: 'statistical-context',
})(StatisticalContextFilters);
