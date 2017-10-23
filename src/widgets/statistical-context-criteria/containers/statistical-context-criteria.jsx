import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, actions } from 'redux-form';

import StatisticalContextCriteria from '../components/statistical-context-criteria';

import { loadSeriesIfNeeded, loadOperationsIfNeeded, loadCampaignsIfNeeded } from 'actions/metadata';
import { STATISTICAL_CONTEXT_FORM_NAME } from 'constants/pogues-constants';
import { getCurrentSelectorPath, storeToArray, filterStoreByProp } from 'utils/widget-utils';

// PropTypes and defaultProps

const propTypes = {
  formName: PropTypes.string,
  selectorPath: PropTypes.string,
  showCampaigns: PropTypes.bool,
  multipleCampaign: PropTypes.bool,
  required: PropTypes.bool,
  horizontal: PropTypes.bool,
};

export const defaultProps = {
  formName: STATISTICAL_CONTEXT_FORM_NAME,
  selectorPath: '',
  showCampaigns: true,
  multipleCampaign: false,
  required: false,
  horizontal: false,
};

// Container

// @TODO: Tests
export const mapStateToProps = (state, { showCampaigns, formName, selectorPath }) => {
  const selector = formValueSelector(formName);
  const path = getCurrentSelectorPath(selectorPath);
  let campaignProps = {};

  // Selected serie and operation in the form
  const selectedSerie = selector(state, `${path}serie`);
  const selectedOperation = selector(state, `${path}operation`);

  // Show or not the list of campaigns
  if (showCampaigns) {
    campaignProps = {
      campaigns: filterStoreByProp(state.metadataByType.campaigns, 'operation', selectedOperation),
    };
  }

  return {
    ...campaignProps,
    series: storeToArray(state.metadataByType.series),
    operations: filterStoreByProp(state.metadataByType.operations, 'serie', selectedSerie),
    selectedSerie,
    selectedOperation,
    path,
  };
};

const mapDispatchToProps = {
  change: actions.change,
  loadSeriesIfNeeded,
  loadOperationsIfNeeded,
  loadCampaignsIfNeeded,
};

const StatisticalContextCriteriaContainer = connect(mapStateToProps, mapDispatchToProps)(StatisticalContextCriteria);

StatisticalContextCriteriaContainer.propTypes = propTypes;
StatisticalContextCriteriaContainer.defaultProps = defaultProps;

export default StatisticalContextCriteriaContainer;
