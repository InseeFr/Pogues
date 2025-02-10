import React from 'react';

import { connect } from 'react-redux';
import { Field, FormSection, formValueSelector } from 'redux-form';
import { date, required as funcRequired } from 'redux-form-validators';

import { DATATYPE_NAME } from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';
import Input from '../../../../../forms/controls/input';
import Select from '../../../../../forms/controls/select';
import Dictionary from '../../../../../utils/dictionary/dictionary';

const { DATE } = DATATYPE_NAME;

const requiredValidationFunction = funcRequired({
  message: Dictionary.validationRequired,
});

function ResponseFormatDatatypeDate({
  format,
  type,
  isCollectedVariables,
  formatTableList,
  formatTable,
  formatCollectedVariables,
  name,
  required,
  readOnly,
}) {
  const formatInit =
    (type !== 'TABLE' && format) ||
    (type === 'TABLE' && isCollectedVariables
      ? formatCollectedVariables
      : formatTableList || formatTable);
  return (
    <FormSection name={name}>
      <div className="response-format-datatype-date">
        <Field
          name="format"
          id="date_format"
          component={Select}
          label={Dictionary.date_format}
          required={required}
          disabled={readOnly}
        >
          <GenericOption key="" value="">
            {Dictionary.dateinitial}
          </GenericOption>
          <GenericOption key="YYYY-MM-DD" value="YYYY-MM-DD">
            {Dictionary.dateddmmyyyy}
          </GenericOption>
          <GenericOption key="YYYY-MM" value="YYYY-MM">
            {Dictionary.datemmyyyy}
          </GenericOption>
          <GenericOption key="YYYY" value="YYYY">
            {Dictionary.dateyyyy}
          </GenericOption>
        </Field>
        <div hidden={formatInit === ''}>
          <Field
            name="minimum"
            type="text"
            step="any"
            component={Input}
            label={Dictionary.minimum}
            validate={[
              requiredValidationFunction,
              date({
                format: formatInit.toLowerCase(),
                message: Dictionary.formatDate ? Dictionary.formatDate : '',
              }),
            ]}
            disabled={readOnly}
            required={required}
          />
          <Field
            name="maximum"
            type="text"
            step="any"
            component={Input}
            label={Dictionary.maximum}
            validate={[
              requiredValidationFunction,
              date({
                format: formatInit.toLowerCase(),
                message: Dictionary.formatDate ? Dictionary.formatDate : '',
              }),
            ]}
            disabled={readOnly}
            required={required}
          />
        </div>
      </div>
    </FormSection>
  );
}

ResponseFormatDatatypeDate.defaultProps = {
  name: DATE,
  readOnly: false,
  required: true,
};

const mapStateToProps = (state) => {
  const selector = formValueSelector('component');
  return {
    formatCollectedVariables: selector(state, 'collectedVariables.DATE.format'),
    formatTable: selector(
      state,
      'responseFormat.TABLE.LIST_MEASURE.SIMPLE.DATE.format',
    ),
    formatTableList: selector(
      state,
      'responseFormat.TABLE.MEASURE.SIMPLE.DATE.format',
    ),
    format: selector(state, 'responseFormat.SIMPLE.DATE.format'),
    type: selector(state, 'responseFormat.type'),
  };
};
export { ResponseFormatDatatypeDate };

export default connect(mapStateToProps)(ResponseFormatDatatypeDate);
