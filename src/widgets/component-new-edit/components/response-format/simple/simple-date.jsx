import React, { Component } from 'react';
import { FormSection, Field, formValueSelector, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { required, date, message } from 'redux-form-validators';
import Input from 'forms/controls/input';
import Select from 'forms/controls/select';
import Dictionary from 'utils/dictionary/dictionary';
import { DATATYPE_NAME } from 'constants/pogues-constants';
import GenericOption from 'forms/controls/generic-option';
var formValues = require('redux-form').formValues ;
const { DATE } = DATATYPE_NAME;


class ResponseFormatDatatypeDate extends Component {
  static defaultProps = {
    name: DATE,
    readOnly: false,
    required: true,
  };
  render() {
    let formatini = this.props.format;
    if(this.props.type === 'TABLE'){
      formatini = this.props.formattable; 
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
            <GenericOption
              key=""
              value=""
            >
              {Dictionary.dateinitial}
            </GenericOption>

            <GenericOption
              key="dd-mm-yyyy"
              value="dd-mm-yyyy"
            >
              {Dictionary.dateddmmyyyy}
            </GenericOption>

            <GenericOption
              key="mm-yyyy"
              value="mm-yyyy"
            >
              {Dictionary.datemmyyyy}
            </GenericOption>

            <GenericOption
              key="yyyy"
              value="yyyy"
            >
              {Dictionary.dateyyyy}
            </GenericOption>

          </Field>   

          <Field
            name="minimum"
            type="text"
            step="any"
            component={Input}
            label={Dictionary.minimum}
            validate = {date({ format: formatini, message: Dictionary.formatDate? Dictionary.formatDate: '', allowBlank: true })}
            disabled={this.props.readOnly}
          />
          <Field
            name="maximum"
            type="text"
            step="any"
            component={Input}
            label={Dictionary.maximum}
            required='false'
            validate = {date({ format: formatini, message: Dictionary.formatDate? Dictionary.formatDate: '', allowBlank: true })}
            disabled={this.props.readOnly}
          />

        </div>
      </FormSection>
         
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const selector = formValueSelector('component');
  return {
      formattable: selector(state, 'responseFormat.TABLE.LIST_MEASURE.SIMPLE.DATE.format'),
      format: selector(state, 'responseFormat.SIMPLE.DATE.format'),
      type : selector(state, 'responseFormat.type')
  }
};

export default connect(mapStateToProps) (ResponseFormatDatatypeDate);
