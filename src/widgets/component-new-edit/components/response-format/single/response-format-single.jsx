import React from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';

import {
  DATATYPE_VIS_HINT,
  QUESTION_TYPE_ENUM,
} from 'constants/pogues-constants';
import { CodesLists } from 'widgets/codes-lists';
import Dictionary from 'utils/dictionary/dictionary';
import GenericOption from 'forms/controls/generic-option';
import ListRadios from 'forms/controls/list-radios';

const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { CHECKBOX, RADIO, DROPDOWN } = DATATYPE_VIS_HINT;
const selectorPath = SINGLE_CHOICE;

function ResponseFormatSingle({ selectorPathParent, showMandatory }) {
  const styleMandatory = {
    display: showMandatory ? 'block' : 'none',
  };
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <FormSection name={selectorPath} className="response-format__single">
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
      <Field
        name="visHint"
        component={ListRadios}
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
      <CodesLists selectorPathParent={selectorPathComposed} />
    </FormSection>
  );
}

ResponseFormatSingle.propTypes = {
  selectorPathParent: PropTypes.string,
  showMandatory: PropTypes.bool,
};

ResponseFormatSingle.defaultProps = {
  selectorPathParent: undefined,
  showMandatory: true,
};

export default ResponseFormatSingle;
