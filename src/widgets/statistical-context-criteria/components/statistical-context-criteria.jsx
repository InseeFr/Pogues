import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ClassSet from 'react-classset';

import { WIDGET_STATISTICAL_CONTEXT_CRITERIA } from 'constants/dom-constants';

import Select from 'forms/controls/select';
import ListCheckboxes from 'forms/controls/list-checkboxes';
import GenericOption from 'forms/controls/generic-option';
import Dictionary from 'utils/dictionary/dictionary';
import { requiredSelect } from 'layout/forms/validation-rules';

const { COMPONENT_CLASS, HORIZONTAL_CLASS } = WIDGET_STATISTICAL_CONTEXT_CRITERIA;

// PropTypes and defaultProps

const propTypes = {
  series: PropTypes.array.isRequired,
  operations: PropTypes.array.isRequired,
  campaigns: PropTypes.array,
  multipleCampaign: PropTypes.bool,
  required: PropTypes.bool,
  horizontal: PropTypes.bool.isRequired,
  selectedSerie: PropTypes.string,
  selectedOperation: PropTypes.string,
  formName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  loadSeriesIfNeeded: PropTypes.func.isRequired,
  loadOperationsIfNeeded: PropTypes.func.isRequired,
  loadCampaignsIfNeeded: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};
const defaultProps = {
  multipleCampaign: false,
  required: false,
  campaigns: undefined,
  selectedSerie: undefined,
  selectedOperation: undefined,
};

// Component

class StatisticalContextCriteria extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentWillMount() {
    const { selectedSerie, selectedOperation } = this.props;

    this.props.loadSeriesIfNeeded();
    if (selectedSerie) this.props.loadOperationsIfNeeded(selectedSerie);
    if (this.props.campaigns && selectedOperation) this.props.loadCampaignsIfNeeded(selectedOperation);
  }

  componentWillUpdate(nextProps) {
    const { formName, path, selectedSerie, selectedOperation } = this.props;

    // Updating operations list if the selected serie changes
    if (nextProps.selectedSerie && selectedSerie !== nextProps.selectedSerie) {
      this.props.loadOperationsIfNeeded(nextProps.selectedSerie);
    }

    // Setting to empty the selected operation when the selected serie changes
    if (selectedSerie !== nextProps.selectedSerie) {
      this.props.change(formName, `${path}operation`, '');
    }

    if (this.props.campaigns) {
      // Updating campaigns list if the selected operation changes
      if (nextProps.selectedOperation && selectedOperation !== nextProps.selectedOperation) {
        this.props.loadCampaignsIfNeeded(nextProps.selectedOperation);
      }

      // Setting to empty the selected campaign when the selected serie or operation changes
      if (selectedOperation !== nextProps.selectedOperation) {
        this.props.change(formName, `${path}campaigns`, '');
      }
    }
  }

  render() {
    const {
      series,
      operations,
      campaigns,
      multipleCampaign,
      required,
      horizontal,
      selectedSerie,
      selectedOperation,
    } = this.props;

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
  }
}

export default StatisticalContextCriteria;
