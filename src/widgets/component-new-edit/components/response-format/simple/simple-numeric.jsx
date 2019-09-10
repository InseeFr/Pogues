import React from 'react';
import { FormSection, Field } from 'redux-form';

import Input from 'forms/controls/input';
import Dictionary from 'utils/dictionary/dictionary';
import { DATATYPE_NAME } from 'constants/pogues-constants';
import SelectMetaDataContainer from 'layout/connected-widget/select-metadata';

const { NUMERIC } = DATATYPE_NAME;

function mapUnitData(unit) {
  return {
    label: unit.label,
    value: unit.id,
  };
}

class ResponseFormatDatatypeNumeric extends FormSection {
  static defaultProps = {
    name: NUMERIC,
    readOnly: false,
    required: true,
  };
  render() {
    return (
      <div className="response-format-datatype-numeric">
        <Field
          name="minimum"
          type="number"
          step="any"
          component={Input}
          label={Dictionary.minimum}
          required={this.props.required}
          disabled={this.props.readOnly}
        />
        <Field
          name="maximum"
          type="number"
          step="any"
          component={Input}
          label={Dictionary.maximum}
          required={this.props.required}
          disabled={this.props.readOnly}
        />
        <Field
          name="decimals"
          type="number"
          step="any"
          component={Input}
          label={Dictionary.decimals}
          disabled={this.props.readOnly}
        />
        <SelectMetaDataContainer
          type="units"
          name="unit"
          label={Dictionary.unit}
          emptyValue={Dictionary.unitEmptySelect}
          mapMetadataFunction={mapUnitData}
          disabled={this.props.readOnly}
        />
      </div>
    );
  }
}

export default ResponseFormatDatatypeNumeric;
