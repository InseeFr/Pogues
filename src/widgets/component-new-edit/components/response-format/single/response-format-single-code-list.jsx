import React from 'react';

import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { DATATYPE_VIS_HINT } from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';
import Select from '../../../../../forms/controls/select';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { CodesLists } from '../../../../codes-lists';

const { CHECKBOX, RADIO, DROPDOWN } = DATATYPE_VIS_HINT;

function ResponseFormatSimpleCodeslist({
  selectorPathParent,
  allowPrecision,
  allowFilter,
  showMandatory,
}) {
  const styleMandatory = {
    display: showMandatory ? 'block' : 'none',
  };

  return (
    <>
      <CodesLists
        selectorPathParent={selectorPathParent}
        allowPrecision={allowPrecision}
        allowFilter={allowFilter}
      />
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
    </>
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
