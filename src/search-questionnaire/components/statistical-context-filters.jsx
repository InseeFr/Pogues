import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Select from 'layout/forms/controls/select';
import PropTypes from 'prop-types';

class StatisticalContextFilters extends Component {
  static propTypes = {
    series: PropTypes.array,
    operations: PropTypes.array,
    campaigns: PropTypes.array,
  };
  static defaultProps = {
    series: [],
    operations: [],
    campaigns: [],
  };

  render() {
    const { series, operations, campaigns } = this.props;

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
}

export default reduxForm({
  form: 'statistical-context',
})(StatisticalContextFilters);
