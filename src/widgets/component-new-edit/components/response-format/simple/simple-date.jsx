import React from 'react';
import { FormSection, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { date } from 'redux-form-validators';
import Input from '../../../../../forms/controls/input';
import Select from '../../../../../forms/controls/select';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { DATATYPE_NAME } from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';

const { DATE } = DATATYPE_NAME;

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
            validate={date({
              format: formatInit.toLowerCase(),
              message: Dictionary.formatDate ? Dictionary.formatDate : '',
              allowBlank: true,
            })}
            disabled={readOnly}
          />
          <Field
            name="maximum"
            type="text"
            step="any"
            component={Input}
            label={Dictionary.maximum}
            validate={date({
              format: formatInit.toLowerCase(),
              message: Dictionary.formatDate ? Dictionary.formatDate : '',
              allowBlank: true,
            })}
            disabled={readOnly}
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

const mapStateToProps = state => {
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

export default connect(mapStateToProps)(ResponseFormatDatatypeDate);
