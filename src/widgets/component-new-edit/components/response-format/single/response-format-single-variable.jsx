import React from 'react';

import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { CHOICE_TYPE } from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';
import Select from '../../../../../forms/controls/select';
import Dictionary from '../../../../../utils/dictionary/dictionary';

const { VARIABLE_RESPONSES: selectorPath } = CHOICE_TYPE;

function ResponseFormatSimpleVariable({
  selectorPathParent,
  collectedVariableStore,
}) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

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
              {collectedVariable.name} - {collectedVariable.label}
            </GenericOption>
          ))
          .flat(),
      ],
      [],
    );
  return (
    <>
      <Field
        name="responseVariable"
        component={Select}
        label={Dictionary.selectVariable}
      >
        <GenericOption key="" value="">
          {Dictionary.selectVariable}
        </GenericOption>
        {variableSourceOptions}
      </Field>
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
