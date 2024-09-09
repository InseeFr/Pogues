import React from 'react';

import { Field, FormSection } from 'redux-form';

import { DATATYPE_NAME } from '../../../../../constants/pogues-constants';
import Input from '../../../../../forms/controls/input';
import SelectMetaDataContainer from '../../../../../layout/connected-widget/select-metadata';
import Dictionary from '../../../../../utils/dictionary/dictionary';

const { NUMERIC } = DATATYPE_NAME;

function mapUnitData(unit) {
  return {
    label: unit.label,
    value: unit.id,
  };
}

function ResponseFormatDatatypeNumeric({ name, required, readOnly }) {
  return (
    <FormSection name={name}>
      <div className="response-format-datatype-numeric">
        <Field
          name="minimum"
          type="number"
          step="any"
          component={Input}
          label={Dictionary.minimum}
          required={required}
          disabled={readOnly}
        />
        <Field
          name="maximum"
          type="number"
          step="any"
          component={Input}
          label={Dictionary.maximum}
          required={required}
          disabled={readOnly}
        />
        <Field
          name="decimals"
          type="number"
          step="any"
          component={Input}
          label={Dictionary.decimals}
          disabled={readOnly}
        />
        <Field
          name="dynamicUnit"
          component={CheckboxBoolean}
          label={Dictionary.dynamicUnit}
          disabled={readOnly}
        />
        <SelectMetaDataContainer
          type="units"
          name="unit"
          label={Dictionary.unit}
          emptyValue={Dictionary.unitEmptySelect}
          mapMetadataFunction={mapUnitData}
          disabled={readOnly}
        />
      </div>
    </FormSection>
  );
}

ResponseFormatDatatypeNumeric.defaultProps = {
  name: NUMERIC,
  readOnly: false,
  required: true,
};

export default ResponseFormatDatatypeNumeric;
