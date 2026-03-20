import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

import {
  DIMENSION_CALCULATION,
  DIMENSION_LENGTH,
} from '../../../../../constants/pogues-constants';
import { InputWithVariableAutoCompletion } from '../../../../../forms/controls/control-with-suggestions';
import Input from '../../../../../forms/controls/input';
import Dictionary from '../../../../../utils/dictionary/dictionary';

const { DYNAMIC_LENGTH: selectorPath } = DIMENSION_LENGTH;
const { NUMBER, FORMULA } = DIMENSION_CALCULATION;

/**
 * In a dynamic table, the user can specify min and max.
 */
export function ResponseFormatTablePrincipalDynamicArray({ type }) {
  const fieldType = type === FORMULA ? 'text' : 'number';
  const FieldComponent =
    type === FORMULA ? InputWithVariableAutoCompletion : Input;

  return (
    <FormSection name={selectorPath}>
      <Field
        name="minimum"
        type={fieldType}
        component={FieldComponent}
        label={Dictionary.tableMinRowNb}
        required
      />
      <Field
        name="maximum"
        type={fieldType}
        component={FieldComponent}
        label={Dictionary.tableMaxRowNb}
        required
      />
    </FormSection>
  );
}

ResponseFormatTablePrincipalDynamicArray.propTypes = {
  type: PropTypes.oneOf([NUMBER, FORMULA]),
};

ResponseFormatTablePrincipalDynamicArray.defaultProps = {
  type: NUMBER,
};

export default ResponseFormatTablePrincipalDynamicArray;
