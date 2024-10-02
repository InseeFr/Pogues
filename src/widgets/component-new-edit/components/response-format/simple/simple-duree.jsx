import React from 'react';
import { FormSection, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { required as funcRequired } from 'redux-form-validators';
import Input from '../../../../../forms/controls/input';
import Select from '../../../../../forms/controls/select';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { DATATYPE_NAME } from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';

const { DURATION } = DATATYPE_NAME;

function ResponseFormatDatatypeDuree({
  format,
  type,
  formatTableList,
  formatTable,
  name,
  required,
  readOnly,
}) {
  const formatInit = type === 'TABLE' ? formatTableList || formatTable : format;
  const isDuration = formatInit === 'PTnHnM' || formatInit === 'PnYnM';

  return (
    <FormSection name={name}>
      <div className="response-format-datatype-duree">
        <Field
          name="format"
          id="date_format"
          component={Select}
          label={Dictionary.date_format}
          required={required}
          disabled={readOnly}
          validate={funcRequired({ message: Dictionary.validationRequired })}
        >
          <GenericOption key="" value="">
            {Dictionary.durationinitial}
          </GenericOption>

          <GenericOption key="PTnHnM" value="PTnHnM">
            {Dictionary.durationformat1}
          </GenericOption>

          <GenericOption key="PnYnM" value="PnYnM">
            {Dictionary.durationformat2}
          </GenericOption>
        </Field>
        {isDuration && (
          <div>
            <div className="response-format-datatype-duree-minimum">
              <div className="response-format-datatype-duree-label-minimum">
                {Dictionary.minimum}
              </div>
              <div style={{ width: '75%' }}>
                {formatInit === 'PTnHnM' && (
                  <div className="response-format-datatype-duree-minimum">
                    <Field
                      name="mihours"
                      type="number"
                      step="any"
                      component={Input}
                      label={Dictionary.hours}
                      disabled={readOnly}
                    />
                    <Field
                      name="miminutes"
                      type="number"
                      step="any"
                      component={Input}
                      label={Dictionary.minutes}
                      disabled={readOnly}
                    />
                  </div>
                )}
                {formatInit === 'PnYnM' && (
                  <div className="response-format-datatype-duree-minimum">
                    <Field
                      name="miyears"
                      type="number"
                      step="any"
                      component={Input}
                      label={Dictionary.years}
                      disabled={readOnly}
                    />
                    <Field
                      name="mimonths"
                      type="number"
                      step="any"
                      component={Input}
                      label={Dictionary.months}
                      disabled={readOnly}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="response-format-datatype-duree-maximum">
              <div className="response-format-datatype-duree-label-maximum">
                {Dictionary.maximum}
              </div>
              <div style={{ width: '75%' }}>
                {formatInit === 'PTnHnM' && (
                  <div className="response-format-datatype-duree-maximum">
                    <Field
                      name="mahours"
                      type="number"
                      step="any"
                      component={Input}
                      label={Dictionary.hours}
                      disabled={readOnly}
                    />
                    <Field
                      name="maminutes"
                      type="number"
                      step="any"
                      component={Input}
                      label={Dictionary.minutes}
                      disabled={readOnly}
                    />
                  </div>
                )}
                {formatInit === 'PnYnM' && (
                  <div className="response-format-datatype-duree-maximum">
                    <Field
                      name="mayears"
                      type="number"
                      step="any"
                      component={Input}
                      label={Dictionary.years}
                      disabled={readOnly}
                    />
                    <Field
                      name="mamonths"
                      type="number"
                      step="any"
                      component={Input}
                      label={Dictionary.months}
                      disabled={readOnly}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </FormSection>
  );
}

ResponseFormatDatatypeDuree.defaultProps = {
  name: DURATION,
  readOnly: false,
  required: true,
};

const mapStateToProps = state => {
  const selector = formValueSelector('component');
  return {
    formatTable: selector(
      state,
      'responseFormat.TABLE.LIST_MEASURE.SIMPLE.DURATION.format',
    ),
    formatTableList: selector(
      state,
      'responseFormat.TABLE.MEASURE.SIMPLE.DURATION.format',
    ),
    format: selector(state, 'responseFormat.SIMPLE.DURATION.format'),
    type: selector(state, 'responseFormat.type'),
  };
};

export default connect(mapStateToProps)(ResponseFormatDatatypeDuree);
