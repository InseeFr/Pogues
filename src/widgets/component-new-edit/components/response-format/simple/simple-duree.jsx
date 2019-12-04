import React, { Component } from 'react';
import { FormSection, Field, formValueSelector, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { required, numericality, message } from 'redux-form-validators';
import Input from 'forms/controls/input';
import Select from 'forms/controls/select';
import Dictionary from 'utils/dictionary/dictionary';
import { DATATYPE_NAME } from 'constants/pogues-constants';
import GenericOption from 'forms/controls/generic-option';

const { DURATION } = DATATYPE_NAME;

class ResponseFormatDatatypeDuree extends Component {
  static defaultProps = {
    name: DURATION,
    readOnly: false,
    required: true,
  };

  render() {
    let formatini = this.props.format;
    console.log('formatini', formatini);
    if(this.props.type === 'TABLE'){
      formatini = this.props.formattable; 
    }

    return (

      <FormSection name={this.props.name}>
        <div className="response-format-datatype-duree" >
       
        <Field
            name="format"
            id="date_format"
            component={Select}
            label={Dictionary.date_format}
            required={this.props.required}
            disabled={this.props.readOnly}
            validate = {required({message: Dictionary.validationRequired})}
          >
            <GenericOption
              key=""
              value=""
            >
              {Dictionary.durationinitial}
            </GenericOption>

            <GenericOption
              key="PTnHnM"
              value="PTnHnM"
            >
              {Dictionary.durationformat1}
            </GenericOption>

            <GenericOption
              key="PnYnM"
              value="PnYnM"
            >
              {Dictionary.durationformat2}
            </GenericOption>

          </Field>   
          <div className="response-format-datatype-duree-minimum" >
            <div className="response-format-datatype-duree-label-minimum" style= {{ display : formatini==='PTnHnM' || formatini==='PnYnM'? 'flex' : 'none' }}>   
                {Dictionary.minimum}
            </div>
            <div  style= {{ width: '75%' }}>
            <div className="response-format-datatype-duree-minimum" style= {{ display : formatini==='PTnHnM'? 'flex' : 'none' }}>
                <Field
                    name="mihours"
                    type="number"
                    step="any"
                    component={Input}
                    label={Dictionary.hours}
                    disabled={this.props.readOnly}
                />
                <Field
                    name="miminutes"
                    type="number"
                    step="any"
                    component={Input}
                    label={Dictionary.minutes}
                    disabled={this.props.readOnly}
                />
            </div>
            
            <div className="response-format-datatype-duree-minimum" style= {{ display : formatini==='PnYnM'? 'flex' : 'none' }}>
                <Field
                    name="miyears"
                    type="number"
                    step="any"
                    component={Input}
                    label={Dictionary.years}
                    disabled={this.props.readOnly}
                />
                <Field
                    name="mimonths"
                    type="number"
                    step="any"
                    component={Input}
                    label={Dictionary.months}
                    disabled={this.props.readOnly}
                />
            </div>
            </div>
          </div>

          <div className="response-format-datatype-duree-maximum" >
            <div className="response-format-datatype-duree-label-maximum" style= {{ display : formatini==='PTnHnM' || formatini==='PnYnM' ? 'flex' : 'none' }}>   
                {Dictionary.maximum}
            </div>
            <div  style= {{ width: '75%'}}>
            <div className="response-format-datatype-duree-maximum" style= {{ display : formatini==='PTnHnM'? 'flex' : 'none' }}>
                <Field
                    name="mahours"
                    type="number"
                    step="any"
                    component={Input}
                    label={Dictionary.hours}
                    disabled={this.props.readOnly}
                />
                <Field
                    name="maminutes"
                    type="number"
                    step="any"
                    component={Input}
                    label={Dictionary.minutes}
                    disabled={this.props.readOnly}
                />
            </div>
            <div className="response-format-datatype-duree-maximum" style= {{ display : formatini==='PnYnM'? 'flex' : 'none' }}>
                <Field
                    name="mayears"
                    type="number"
                    step="any"
                    component={Input}
                    label={Dictionary.years}
                    disabled={this.props.readOnly}
                />
                <Field
                    name="mamonths"
                    type="number"
                    step="any"
                    component={Input}
                    label={Dictionary.months}
                    disabled={this.props.readOnly}
                />
            </div>
            </div>
          </div>
        </div>
      </FormSection>
         
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    const selector = formValueSelector('component');
    return {
        formattable: selector(state, 'responseFormat.TABLE.LIST_MEASURE.SIMPLE.DURATION.format'),
        format: selector(state, 'responseFormat.SIMPLE.DURATION.format'),
        type : selector(state, 'responseFormat.type'),
    }
  };

export default connect(mapStateToProps)(ResponseFormatDatatypeDuree);
