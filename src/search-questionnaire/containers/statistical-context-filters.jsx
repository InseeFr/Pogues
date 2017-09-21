import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';

import StatisticalContextFilters from 'search-questionnaire/components/statistical-context-filters';
import { getSeries, getOperations, getCampaigns } from 'utils/remote-api';

const mapStateToProps = state => {
  const selector = formValueSelector('statistical-context');
  return {
    selectedSerie: selector(state, 'serie'),
    selectedOperation: selector(state, 'operation'),
  };
};

class StatisticalContextFiltersContainer extends Component {
  static propTypes = {
    selectedSerie: PropTypes.string,
    selectedOperation: PropTypes.string,
  };

  static defaultProps = {
    selectedSerie: '',
    selectedOperation: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      series: [],
      operations: [],
      campaigns: [],
    };

    this.fetchSeries = this.fetchSeries.bind(this);
    this.fetchOperations = this.fetchOperations.bind(this);
    this.fetchCampaigns = this.fetchCampaigns.bind(this);
  }

  componentWillMount() {
    this.fetchSeries();
  }

  componentWillUpdate(nextProps) {
    if (this.props.selectedSerie !== nextProps.selectedSerie) {
      this.fetchOperations(nextProps.selectedSerie);
    }

    if (this.props.selectedOperation !== nextProps.selectedOperation) {
      this.fetchCampaigns(nextProps.selectedOperation);
    }
  }

  fetchSeries() {
    getSeries().then(res => {
      const newState = {
        ...this.state,
        series: res,
      };
      this.setState(newState);
    });
  }

  fetchOperations(idSerie) {
    getOperations(idSerie).then(res => {
      const newState = {
        ...this.state,
        operations: res,
        campaigns: [],
      };
      this.setState(newState);
    });
  }

  fetchCampaigns(idOperation) {
    getCampaigns(idOperation).then(res => {
      const newState = {
        ...this.state,
        campaigns: res,
      };
      this.setState(newState);
    });
  }

  render() {
    const { series, operations, campaigns } = this.state;

    return <StatisticalContextFilters series={series} operations={operations} campaigns={campaigns} />;
  }
}

export default connect(mapStateToProps)(StatisticalContextFiltersContainer);
