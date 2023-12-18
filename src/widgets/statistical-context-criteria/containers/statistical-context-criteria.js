import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';
import {
  loadCampaignsIfNeeded,
  loadOperationsIfNeeded,
  loadSeriesIfNeeded,
} from '../../../actions/metadata';
import {
  STATISTICAL_CONTEXT_FORM_NAME,
  TCM,
} from '../../../constants/pogues-constants';
import { storeToArray } from '../../../utils/utils';
import { filterStoreByProp } from '../../../utils/widget-utils';

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
  { authType, showCampaigns, showOperations, formName, path, stamp },
) => {
  const selector = formValueSelector(formName);
  const conditionalProps = {};

  // Selected serie and operation in the form
  const selectedSerie = selector(state, `${path}serie`);

  // Show or not the list of operations
  if (showOperations) {
    const selectedOperation = selector(state, `${path}operation`);

    conditionalProps.selectedOperation = selectedOperation;
    conditionalProps.operations =
      selectedSerie === TCM.id
        ? [{ id: TCM.id, value: TCM.value, label: TCM.label }]
        : filterStoreByProp(
            state.metadataByType.operations,
            'serie',
            selectedSerie,
          );

    // Show or not the list of campaigns
    if (showCampaigns) {
      conditionalProps.campaigns =
        selectedOperation === TCM.id
          ? [{ id: TCM.id, value: TCM.value, label: TCM.label }]
          : filterStoreByProp(
              state.metadataByType.campaigns,
              'operation',
              selectedOperation,
            );
    }
  }

  return {
    ...conditionalProps,
    series:
      stamp === TCM.owner || stamp === 'FAKEPERMISSION'
        ? [
            { id: TCM.id, value: TCM.value, label: TCM.label },
            ...storeToArray(state.metadataByType.series),
          ]
        : storeToArray(state.metadataByType.series),
    selectedSerie,
    path,
    authType,
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
