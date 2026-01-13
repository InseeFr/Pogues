import React from 'react';

import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

import {
  DATATYPE_VIS_HINT,
  CHOICE_TYPE,
} from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';
import Select from '../../../../../forms/controls/select';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { CodesLists } from '../../../../codes-lists';

const { CHECKBOX, RADIO, DROPDOWN } = DATATYPE_VIS_HINT;
const { CODE_LIST: selectorPath } = CHOICE_TYPE;

function ResponseFormatSimpleCodeslist({ selectorPathParent, allowPrecision, allowFilter, showMandatory }) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

    const styleMandatory = {
    display: showMandatory ? 'block' : 'none',
    };

  console.log('selectorPath', selectorPath);
  console.log('selectorPathComposed', selectorPathComposed);
  return (
    <FormSection name={selectorPath}>
      <CodesLists selectorPathParent={selectorPathComposed} allowPrecision={allowPrecision}
              allowFilter={allowFilter}/>
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
          <div className="ctrl-checkbox" style={styleMandatory}>
            <label htmlFor="rf-single-mandatory">{Dictionary.mandatory}</label>
            <div>
              <Field
                name="mandatory"
                id="rf-single-mandatory"
                component="input"
                type="checkbox"
              />
            </div>
          </div>
    </FormSection>
  );
}

ResponseFormatSimpleCodeslist.propTypes = {
    selectorPathParent: PropTypes.string,
    allowPrecision: PropTypes.bool,
    allowFilter: PropTypes.bool,
};

ResponseFormatSimpleCodeslist.defaultProps = {
    selectorPathParent: undefined,
    allowPrecision: false,
    allowFilter: false,
};

export default ResponseFormatSimpleCodeslist;
