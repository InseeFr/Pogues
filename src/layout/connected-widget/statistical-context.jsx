import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValueSelector, actions } from 'redux-form';

import StatisticalContext from './components/statistical-context';
import { loadSeriesIfNeeded, loadOperationsIfNeeded, loadCampaignsIfNeeded } from 'actions/metadata';

class StatisticalContextContainer extends Component {
  static propTypes = {
    series: PropTypes.array,
    operations: PropTypes.array,
    campaigns: PropTypes.array,
    formName: PropTypes.string.isRequired,
    selectorPath: PropTypes.string.isRequired,
    selectedSerie: PropTypes.string,
    selectedOperation: PropTypes.string,
    required: PropTypes.bool,
    multipleCampaign: PropTypes.bool,
    change: PropTypes.func.isRequired,
    loadSeriesIfNeeded: PropTypes.func.isRequired,
    loadOperationsIfNeeded: PropTypes.func.isRequired,
    loadCampaignsIfNeeded: PropTypes.func.isRequired,
  };

  static defaultProps = {
    series: [],
    operations: [],
    campaigns: [],
    selectedSerie: '',
    selectedOperation: '',
    selectorPath: '',
    required: false,
    multipleCampaign: false,
  };

  static getSelectorPath = (selectorPath = '') => {
    return selectorPath !== '' ? `${selectorPath}.` : selectorPath;
  };

  componentWillMount() {
    const { selectedSerie, selectedOperation } = this.props;
    this.props.loadSeriesIfNeeded();
    this.props.loadOperationsIfNeeded(selectedSerie);
    this.props.loadCampaignsIfNeeded(selectedOperation);
  }

  componentWillUpdate(nextProps) {
    const { formName, selectorPath } = this.props;
    const path = StatisticalContextContainer.getSelectorPath(selectorPath);

    if (this.props.selectedSerie !== nextProps.selectedSerie) {
      this.props.loadOperationsIfNeeded(nextProps.selectedSerie);
      this.props.change(formName, `${path}operation`, '');
    }

    if (this.props.selectedOperation !== nextProps.selectedOperation) {
      this.props.loadCampaignsIfNeeded(nextProps.selectedOperation);
      this.props.change(formName, `${path}campaigns`, []);
    }
  }

  render() {
    const {
      series: currentSeries,
      operations: currentOperations,
      campaigns: currentCampaigns,
      required,
      multipleCampaign,
    } = this.props;

    return (
      <StatisticalContext
        series={currentSeries}
        operations={currentOperations}
        campaigns={currentCampaigns}
        required={required}
        multipleCampaign={multipleCampaign}
      />
    );
  }
}

const mapStateToProps = (state, { formName, selectorPath }) => {
  const selector = formValueSelector(formName || 'statistical-context');
  const path = StatisticalContextContainer.getSelectorPath(selectorPath);

  const selectedSerie = selector(state, `${path}serie`);
  const selectedOperation = selector(state, `${path}operation`);

  const seriesStore = state.metadataByType.series || {};
  const operationsStore = state.metadataByType.operations || {};
  const campaignsStore = state.metadataByType.campaigns || {};

  const series = Object.keys(seriesStore).map(key => seriesStore[key]);
  const operations = Object.keys(operationsStore)
    .filter(key => operationsStore[key].serie === selectedSerie)
    .map(key => operationsStore[key]);
  const campaigns = Object.keys(campaignsStore)
    .filter(key => campaignsStore[key].operation === selectedOperation)
    .map(key => campaignsStore[key]);

  return {
    series,
    operations,
    campaigns,
    selectedSerie,
    selectedOperation,
  };
};

const mapDispatchToProps = {
  change: actions.change,
  loadSeriesIfNeeded,
  loadOperationsIfNeeded,
  loadCampaignsIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticalContextContainer);
