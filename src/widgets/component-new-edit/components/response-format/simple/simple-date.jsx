import React, { Component } from 'react';
import { FormSection, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { date } from 'redux-form-validators';
import Input from 'forms/controls/input';
import Select from 'forms/controls/select';
import Dictionary from 'utils/dictionary/dictionary';
import { DATATYPE_NAME } from 'constants/pogues-constants';
import GenericOption from 'forms/controls/generic-option';

const { DATE } = DATATYPE_NAME;

class ResponseFormatDatatypeDate extends Component {
  static defaultProps = {
    name: DATE,
    readOnly: false,
    required: true,
  };

  render() {
    let formatini = this.props.format;
    if (this.props.type === 'TABLE') {
      formatini = this.props.formatTableList
        ? this.props.formatTableList
        : this.props.formatTable;
    }
    return (
      <FormSection name={this.props.name}>
        <div className="response-format-datatype-date">
          <Field
            name="format"
            id="date_format"
            component={Select}
            label={Dictionary.date_format}
            required={this.props.required}
            disabled={this.props.readOnly}
          >
            <GenericOption key="" value="">
              {Dictionary.dateinitial}
            </GenericOption>

            <GenericOption key="yyyy-mm-dd" value="yyyy-mm-dd">
              {Dictionary.dateddmmyyyy}
            </GenericOption>

            <GenericOption key="yyyy-mm" value="yyyy-mm">
              {Dictionary.datemmyyyy}
            </GenericOption>

            <GenericOption key="yyyy" value="yyyy">
              {Dictionary.dateyyyy}
            </GenericOption>
          </Field>
          <div hidden={formatini === ''}>
            <Field
              name="minimum"
              type="text"
              step="any"
              component={Input}
              label={Dictionary.minimum}
              validate={date({
                format: formatini,
                message: Dictionary.formatDate ? Dictionary.formatDate : '',
                allowBlank: true,
              })}
              disabled={this.props.readOnly}
            />
            <Field
              name="maximum"
              type="text"
              step="any"
              component={Input}
              label={Dictionary.maximum}
              validate={date({
                format: formatini,
                message: Dictionary.formatDate ? Dictionary.formatDate : '',
                allowBlank: true,
              })}
              disabled={this.props.readOnly}
            />
          </div>
        </div>
      </FormSection>
    );
  }
}

const mapStateToProps = state => {
  const selector = formValueSelector('component');
  return {
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
