import React from 'react';
import { FormSection, Field } from 'redux-form';

import Input from 'layout/forms/controls/input';
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
  };
  render() {
    return (
      <div className="response-format-datatype-numeric">
        <Field name="minimum" type="number" component={Input} label={Dictionary.minimum} required />
        <Field name="maximum" type="number" component={Input} label={Dictionary.maximum} required />
        <Field name="decimals" type="number" component={Input} label={Dictionary.decimals} />
        <SelectMetaDataContainer
          type="units"
          name="unit"
          label={Dictionary.unit}
          emptyValue={Dictionary.unitEmptySelect}
          mapMetadataFunction={mapUnitData}
        />
      </div>
    );
  }
}

export default ResponseFormatDatatypeNumeric;
