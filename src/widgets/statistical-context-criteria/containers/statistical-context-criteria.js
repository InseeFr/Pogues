import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, change } from 'redux-form';
import {
  loadSeriesIfNeeded,
  loadOperationsIfNeeded,
  loadCampaignsIfNeeded,
} from 'actions/metadata';
import { STATISTICAL_CONTEXT_FORM_NAME } from 'constants/pogues-constants';
import { filterStoreByProp } from 'utils/widget-utils';
import { storeToArray } from 'utils/utils';

import StatisticalContextCriteria from '../components/statistical-context-criteria';

// PropTypes and defaultProps

const propTypes = {
  formName: PropTypes.string,
  path: PropTypes.string,
  showOperations: PropTypes.bool,
  showCampaigns: PropTypes.bool,
  multipleCampaign: PropTypes.bool,
  required: PropTypes.bool,
  horizontal: PropTypes.bool,
};

export const defaultProps = {
  formName: STATISTICAL_CONTEXT_FORM_NAME,
  path: '',
  showOperations: true,
  showCampaigns: true,
  multipleCampaign: false,
  required: false,
  horizontal: false,
};

// Container

// @TODO: Tests
export const mapStateToProps = (
  state,
  { showCampaigns, showOperations, formName, path },
) => {
  const selector = formValueSelector(formName);
  const conditionalProps = {};

  // Selected serie and operation in the form
  const selectedSerie = selector(state, `${path}serie`);

  // Show or not the list of operations
  if (showOperations) {
    const selectedOperation = selector(state, `${path}operation`);

    conditionalProps.selectedOperation = selectedOperation;
    conditionalProps.operations = filterStoreByProp(
      state.metadataByType.operations,
      'serie',
      selectedSerie,
    );

    // Show or not the list of campaigns
    if (showCampaigns) {
      conditionalProps.campaigns = filterStoreByProp(
        state.metadataByType.campaigns,
        'operation',
        selectedOperation,
      );
    }
  }

  return {
    ...conditionalProps,
    series: storeToArray(state.metadataByType.series),
    selectedSerie,
    path,
  };
};

const mapDispatchToProps = {
  change: change,
  loadSeriesIfNeeded,
  loadOperationsIfNeeded,
  loadCampaignsIfNeeded,
};

const StatisticalContextCriteriaContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatisticalContextCriteria);

StatisticalContextCriteriaContainer.propTypes = propTypes;
StatisticalContextCriteriaContainer.defaultProps = defaultProps;

export default StatisticalContextCriteriaContainer;
