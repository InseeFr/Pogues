import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FormSection, change, formValueSelector } from 'redux-form';

import { DATATYPE_NAME } from '../../../../../constants/pogues-constants';
import { RichEditorWithVariable } from '../../../../../forms/controls/control-with-suggestions';
import GenericOption from '../../../../../forms/controls/generic-option';
import Input from '../../../../../forms/controls/input';
import ListRadios from '../../../../../forms/controls/list-radios';
import withCurrentFormVariables from '../../../../../hoc/with-current-form-variables';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import SelectMetaDataContainer from './connected-widget/select-metadata';

const { NUMERIC } = DATATYPE_NAME;

function mapUnitData(unit) {
  return {
    label: unit.label,
    value: unit.id,
  };
}

/**
 * Give information for a numeric variable (collected, external, or calculated variable).
 *
 * - disableSetUnit : allows to disable the fields concerning the measurement unit, not wanted for calculated variables
 */
function ResponseFormatDatatypeNumeric({
  name = NUMERIC,
  required = true,
  readOnly = false,
  isDynamicUnit,
  setUnit,
  disableSetUnit = false,
}) {
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
        {!disableSetUnit && (
          <>
            <Field
              name="isDynamicUnit"
              component={ListRadios}
              label={Dictionary.dynamicUnit}
              disabled={readOnly}
              onChange={handleDynamicUnitChange}
              required
              // Convert string "true"/"false" to boolean true/false when storing in Redux form
              parse={(value) => value === 'true'}
              // Convert true/false/undefined to string "true"/"false" when displaying the form
              format={(value) => (value === true ? 'true' : 'false')}
            >
              <GenericOption value="true">{Dictionary.yes}</GenericOption>
              <GenericOption value="false">{Dictionary.no}</GenericOption>
            </Field>

            {isDynamicUnit ? (
              <Field
                name="unit"
                component={RichEditorWithVariable}
                label={Dictionary.dynamicUnitFormula}
                disabled={readOnly}
              />
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
          </>
        )}
      </div>
    </FormSection>
  );
}

ResponseFormatDatatypeNumeric.propTypes = {
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  isDynamicUnit: PropTypes.bool,
  setUnit: PropTypes.func,
  disableSetUnit: PropTypes.bool,
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
