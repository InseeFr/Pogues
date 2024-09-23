import React from 'react';
import { FormSection, Field, formValueSelector } from 'redux-form';

import Dictionary from '../../../../../utils/dictionary/dictionary';
import Input from '../../../../../forms/controls/input';
import { DIMENSION_FORMATS } from '../../../../../constants/pogues-constants';
import { InputWithVariableAutoCompletion } from '../../../../../forms/controls/control-with-suggestions';
import ListRadios from '../../../../../forms/controls/list-radios';
import GenericOption from '../../../../../forms/controls/generic-option';
import { connect } from 'react-redux';
import withCurrentFormVariables from '../../../../../hoc/with-current-form-variables';

const { LIST: selectorPath } = DIMENSION_FORMATS;

function ResponseFormatTablePrincipalList({ isFixedLength }) {
  return (
    <div className="axis-primary__panel">
      <FormSection name={selectorPath}>
        <Field
          name="isFixedLength"
          label={Dictionary.linesNbCalculation}
          component={ListRadios}
          required
        >
          <GenericOption key="0" value="0">
            {Dictionary.minMax}
          </GenericOption>
          <GenericOption key="1" value="1">
            {Dictionary.formula}
          </GenericOption>
        </Field>
        {isFixedLength === '1' ? (
          <Field
            name="fixedLength"
            type="text"
            component={InputWithVariableAutoCompletion}
            label={Dictionary.formula}
            required
          />
        ) : (
          <div>
            <Field
              name="numLinesMin"
              type="number"
              component={Input}
              label={Dictionary.minRowNb}
              required
            />
            <Field
              name="numLinesMax"
              type="number"
              component={Input}
              label={Dictionary.maxRowNb}
              required
            />
          </div>
        )}
      </FormSection>
    </div>
  );
}

// Container
const mapStateToProps = (state, { selectorPathParent }) => {
  const selector = formValueSelector('component');

  return {
    isFixedLength: selector(
      state,
      `${selectorPathParent}.${selectorPath}.isFixedLength`,
    ),
  };
};

export default connect(mapStateToProps)(
  withCurrentFormVariables(ResponseFormatTablePrincipalList),
);
