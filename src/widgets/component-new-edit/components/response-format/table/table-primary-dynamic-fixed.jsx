import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

import {
  DIMENSION_CALCULATION,
  DIMENSION_LENGTH,
} from '../../../../../constants/pogues-constants';
import { InputWithVariableAutoCompletion } from '../../../../../forms/controls/control-with-suggestions';
import Input from '../../../../../forms/controls/input';
import Dictionary from '../../../../../utils/dictionary/dictionary';

const { DYNAMIC_FIXED: selectorPath } = DIMENSION_LENGTH;
const { NUMBER, FORMULA } = DIMENSION_CALCULATION;

/**
 * In a dynamic table, the user can specify a fixed length.
 */
export function ResponseFormatTablePrincipalDynamicFixed({ type }) {
  return (
    <FormSection name={selectorPath}>
      <Field
        name="size"
        type={type === FORMULA ? 'text' : 'number'}
        component={type === FORMULA ? InputWithVariableAutoCompletion : Input}
        label={Dictionary.tableRowNb}
        required
      />
    </FormSection>
  );
}

ResponseFormatTablePrincipalDynamicFixed.propTypes = {
  type: PropTypes.oneOf([NUMBER, FORMULA]),
};

ResponseFormatTablePrincipalDynamicFixed.defaultProps = {
  type: NUMBER,
};

export default ResponseFormatTablePrincipalDynamicFixed;
