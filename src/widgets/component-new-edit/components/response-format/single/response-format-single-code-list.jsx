import React from 'react';

import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import ListRadios from '@/forms/controls/list-radios';

import { DATATYPE_VIS_HINT } from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { CodesLists } from '../../../../codes-lists';

const { CHECKBOX, RADIO, DROPDOWN } = DATATYPE_VIS_HINT;

function ResponseFormatSingleCodeslist({
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
        component={ListRadios}
        label={Dictionary.visHint}
        required
      >
        <GenericOption key={RADIO} value={RADIO}>
          {Dictionary.radio}
        </GenericOption>
        <GenericOption key={DROPDOWN} value={DROPDOWN}>
          {Dictionary.dropdown}
        </GenericOption>
        <GenericOption key={CHECKBOX} value={CHECKBOX}>
          {Dictionary.checkbox}
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

ResponseFormatSingleCodeslist.propTypes = {
  selectorPathParent: PropTypes.string,
  allowPrecision: PropTypes.bool,
  allowFilter: PropTypes.bool,
};

ResponseFormatSingleCodeslist.defaultProps = {
  selectorPathParent: undefined,
  allowPrecision: false,
  allowFilter: false,
};

export default ResponseFormatSingleCodeslist;
