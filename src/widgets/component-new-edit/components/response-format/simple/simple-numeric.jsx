import { connect } from 'react-redux';
import { Field, FormSection, change, formValueSelector } from 'redux-form';

import { DATATYPE_NAME } from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';
import Input from '../../../../../forms/controls/input';
import Select from '../../../../../forms/controls/select';
import withCurrentFormVariables from '../../../../../hoc/with-current-form-variables';
import SelectMetaDataContainer from '../../../../../layout/connected-widget/select-metadata';
import Dictionary from '../../../../../utils/dictionary/dictionary';

const { NUMERIC } = DATATYPE_NAME;

function mapUnitData(unit) {
  return {
    label: unit.label,
    value: unit.id,
  };
}

function ResponseFormatDatatypeNumeric({
  name,
  required,
  readOnly,
  isDynamicUnit,
  setUnit,
  availableSuggestions,
}) {
  const dynamicUnitList = availableSuggestions.map((as) => (
    <GenericOption key={as} value={as}>
      {as}
    </GenericOption>
  ));
  const handleDynamicUnitChange = () => {
    setUnit('');
  };

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
          name="isDynamicUnit"
          component={CheckboxBoolean}
          label={Dictionary.dynamicUnit}
          disabled={readOnly}
          onChange={handleDynamicUnitChange}
        />
        {isDynamicUnit ? (
          <Field
            name="unit"
            component={Select}
            label={Dictionary.dynamicUnitVariable}
            required={required}
            disabled={readOnly}
          >
            <GenericOption key="dynamicUnitEmptySelect" value="">
              {Dictionary.dynamicUnitEmptySelect}
            </GenericOption>
            {dynamicUnitList}
          </Field>
        ) : (
          <SelectMetaDataContainer
            type="units"
            name="unit"
            label={Dictionary.unit}
            emptyValue={Dictionary.unitEmptySelect}
            mapMetadataFunction={mapUnitData}
            disabled={readOnly}
          />
        )}
      </div>
    </FormSection>
  );
}

ResponseFormatDatatypeNumeric.defaultProps = {
  name: NUMERIC,
  readOnly: false,
  required: true,
};

// Container
const mapStateToProps = (state, { selectorPath }) => {
  const selector = formValueSelector('component');
  return {
    isDynamicUnit: selector(state, `${selectorPath}.NUMERIC.isDynamicUnit`),
    unit: selector(state, `${selectorPath}.NUMERIC.unit`),
  };
};

// Dispatch actions to change form values
const mapDispatchToProps = (dispatch, { selectorPath }) => ({
  setUnit: (value) =>
    dispatch(change('component', `${selectorPath}.NUMERIC.unit`, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withCurrentFormVariables(ResponseFormatDatatypeNumeric));
