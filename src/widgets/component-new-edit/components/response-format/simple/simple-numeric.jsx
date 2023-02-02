import { DATATYPE_NAME } from 'constants/pogues-constants';
import Input from 'forms/controls/input';
import SelectMetaDataContainer from 'layout/connected-widget/select-metadata';
import { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import Dictionary from 'utils/dictionary/dictionary';

const { NUMERIC } = DATATYPE_NAME;

function mapUnitData(unit) {
  return {
    label: unit.label,
    value: unit.id,
  };
}

class ResponseFormatDatatypeNumeric extends Component {
  static defaultProps = {
    name: NUMERIC,
    readOnly: false,
    required: true,
  };

  render() {
    return (
      <FormSection name={this.props.name}>
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
          <div className="ctrl-checkbox">
            <label htmlFor="rf-thousand-separator">
              {Dictionary.thousandSeparator}
            </label>
            <div>
              <Field
                name="thousandSeparator"
                id="rf-thousand-separator"
                component="input"
                type="checkbox"
              />
            </div>
          </div>
        </div>
      </FormSection>
    );
  }
}

export default ResponseFormatDatatypeNumeric;
