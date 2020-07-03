import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ClassSet from 'react-classset';

import { WIDGET_STATISTICAL_CONTEXT_CRITERIA } from 'constants/dom-constants';

import Select from 'forms/controls/select';
import ListCheckboxes from 'forms/controls/list-checkboxes';
import GenericOption from 'forms/controls/generic-option';
import Dictionary from 'utils/dictionary/dictionary';
import { requiredSelect } from 'forms/validation-rules';

const {
  COMPONENT_CLASS,
  HORIZONTAL_CLASS,
} = WIDGET_STATISTICAL_CONTEXT_CRITERIA;

const StatisticalContextCriteria = props => {
  const {
    formName,
    path,
    selectedSerie,
    selectedOperation,
    campaigns,
    operations,
    series,
    multipleCampaign,
    required,
    focusOnInit,
    horizontal,
  } = props;

  const [selectedSerieState, setSelectedSerieState] = useState(selectedSerie);
  const [selectedOperationState, setSelectedOperationState] = useState(
    selectedOperation,
  );

  useEffect(() => {
    props.loadSeriesIfNeeded();
    if (operations && selectedSerie)
      props.loadOperationsIfNeeded(selectedSerie);
    if (campaigns && selectedOperation)
      props.loadCampaignsIfNeeded(selectedOperation);
    if (campaigns && selectedOperation)
      props.loadCampaignsIfNeeded(selectedOperation);
  }, [props, campaigns, operations, selectedOperation, selectedSerie]);

  useEffect(() => {
    if (selectedSerie !== selectedSerieState) {
      props.loadOperationsIfNeeded(selectedSerie);
      props.change(formName, `${path}operation`, '');
      setSelectedSerieState(selectedSerie);
    }

    if (selectedOperation !== selectedOperationState) {
      props.loadCampaignsIfNeeded(selectedOperation);
      props.change(formName, `${path}campaigns`, '');
      setSelectedOperationState(selectedOperation);
    }
  }, [
    props,
    selectedSerie,
    selectedOperation,
    formName,
    path,
    selectedOperationState,
    selectedSerieState,
  ]);

  return (
    <div
      className={ClassSet({
        [COMPONENT_CLASS]: true,
        [HORIZONTAL_CLASS]: horizontal,
      })}
    >
      <Field
        name="serie"
        component={Select}
        required={required}
        focusOnInit={focusOnInit}
        validate={required ? [requiredSelect] : []}
        label={Dictionary.serie}
        emptyOption={Dictionary.selectSerie}
      >
        {series.map(s => (
          <GenericOption key={s.value} value={s.value}>
            {s.label}
          </GenericOption>
        ))}
      </Field>
      {operations && (
        <Field
          name="operation"
          component={Select}
          required={required}
          validate={required ? [requiredSelect] : []}
          disabled={!selectedSerie}
          label={Dictionary.operation}
          emptyOption={Dictionary.selectOperation}
        >
          {operations.map(s => (
            <GenericOption key={s.value} value={s.value}>
              {s.label}
            </GenericOption>
          ))}
        </Field>
      )}

      {campaigns && (
        <Field
          name="campaigns"
          component={multipleCampaign ? ListCheckboxes : Select}
          required={required}
          validate={required ? [requiredSelect] : []}
          disabled={!selectedSerie || !selectedOperation}
          label={Dictionary.campaign}
          emptyOption={Dictionary.selectCampaign}
          noValuesMessage={Dictionary.noValuesCampaigns}
        >
          {campaigns.map(s => (
            <GenericOption key={s.value} value={s.value}>
              {s.label}
            </GenericOption>
          ))}
        </Field>
      )}
    </div>
  );
};
// PropTypes and defaultProps

StatisticalContextCriteria.propTypes = {
  series: PropTypes.array.isRequired,
  operations: PropTypes.array,
  campaigns: PropTypes.array,
  multipleCampaign: PropTypes.bool,
  required: PropTypes.bool,
  horizontal: PropTypes.bool.isRequired,
  focusOnInit: PropTypes.bool.isRequired,
  selectedSerie: PropTypes.string,
  selectedOperation: PropTypes.string,
  formName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  loadSeriesIfNeeded: PropTypes.func.isRequired,
  loadOperationsIfNeeded: PropTypes.func.isRequired,
  loadCampaignsIfNeeded: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};
StatisticalContextCriteria.defaultProps = {
  multipleCampaign: false,
  required: false,
  focusOnInit: false,
  operations: undefined,
  campaigns: undefined,
  selectedSerie: undefined,
  selectedOperation: undefined,
};

export default StatisticalContextCriteria;
