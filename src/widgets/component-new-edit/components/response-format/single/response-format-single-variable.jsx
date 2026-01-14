import React from 'react';

import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

import {
  CHOICE_TYPE,
    DATATYPE_VIS_HINT,
  DEFAULT_VARIABLE_SELECTOR_PATH
} from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';
import Select from '../../../../../forms/controls/select';
import Dictionary from '../../../../../utils/dictionary/dictionary';

const { CHECKBOX, RADIO, DROPDOWN } = DATATYPE_VIS_HINT;

const selectorPath= DEFAULT_VARIABLE_SELECTOR_PATH;

function ResponseFormatSimpleVariable({
  selectorPathParent,
  collectedVariableStore,
}) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  console.log('selectorPath', selectorPath);
  console.log('selectorPathComposed', selectorPathComposed);
  //TODO: filter unwanted variables
  // See for a variable container ?
  const variableSourceOptions = Object.values(collectedVariableStore)
    .filter((question) => typeof question === 'object')
    .reduce(
      (acc, questionVariable) => [
        ...acc,
        Object.values(questionVariable)
          .map((collectedVariable) => (
            <GenericOption
              key={collectedVariable.id}
              value={collectedVariable.id}
            >
              {collectedVariable.label}
            </GenericOption>
          ))
          .flat(),
      ],
      [],
    );
  return (
    <>
      <FormSection name={selectorPath}>
        <Field
          name={"variableReference"}
          component={Select}
          label={Dictionary.selectVariable}
        >
          <GenericOption key="" value="">
            {Dictionary.selectVariable}
          </GenericOption>
          {variableSourceOptions}
        </Field>
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
