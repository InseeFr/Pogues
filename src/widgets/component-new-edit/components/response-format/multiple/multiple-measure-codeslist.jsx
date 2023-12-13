import React from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';

import Dictionary from '../../../../../utils/dictionary/dictionary';
import { CodesLists } from '../../../../codes-lists';
import {
  DATATYPE_VIS_HINT,
  DIMENSION_FORMATS,
} from '../../../../../constants/pogues-constants';
import Select from '../../../../../forms/controls/select';
import GenericOption from '../../../../../forms/controls/generic-option';

const { CHECKBOX, RADIO, DROPDOWN } = DATATYPE_VIS_HINT;
const { CODES_LIST: selectorPath } = DIMENSION_FORMATS;

function ResponseFormatMultipleMeasureCodeslist({ selectorPathParent }) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <FormSection name={selectorPath}>
      <CodesLists selectorPathParent={selectorPathComposed} />
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
  );
}

ResponseFormatMultipleMeasureCodeslist.propTypes = {
  selectorPathParent: PropTypes.string,
};

ResponseFormatMultipleMeasureCodeslist.defaultProps = {
  selectorPathParent: undefined,
};

export default ResponseFormatMultipleMeasureCodeslist;
