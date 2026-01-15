import React from 'react';

import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

import {
  DATATYPE_VIS_HINT,
  DEFAULT_VARIABLE_SELECTOR_PATH,
} from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';
import Select from '../../../../../forms/controls/select';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { VariablesList } from '../../../../codes-lists/variables';

const { CHECKBOX, RADIO, DROPDOWN } = DATATYPE_VIS_HINT;

const selectorPath = DEFAULT_VARIABLE_SELECTOR_PATH;

function ResponseFormatSimpleVariable({ selectorPathParent }) {
  return (
    <>
      <VariablesList selectorPathParent={selectorPathParent} />
      <FormSection name={selectorPath}>
        <Field
          name="visHint"
          component={Select}
          label={Dictionary.visHint}
          required
        >
          <GenericOption key={CHECKBOX} value={CHECKBOX}>
            {Dictionary.checkbox}
          </GenericOption>
          <GenericOption key={RADIO} value={RADIO}>
            {Dictionary.radio}
          </GenericOption>
          <GenericOption key={DROPDOWN} value={DROPDOWN}>
            {Dictionary.dropdown}
          </GenericOption>
        </Field>
      </FormSection>
    </>
  );
}

ResponseFormatSimpleVariable.propTypes = {
  selectorPathParent: PropTypes.string,
  collectedVariableStore: PropTypes.object,
};

ResponseFormatSimpleVariable.defaultProps = {
  selectorPathParent: undefined,
  collectedVariableStore: {},
};

export default ResponseFormatSimpleVariable;
