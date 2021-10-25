/* eslint-disable no-console */
import React, { useState } from 'react';
import { AntlrEditor } from '@eurostat/vtl-editor';
import * as tools from 'vtl-2-0-antlr-tools-ts';
import { getSuggestions } from './vtl-suggestions';

import { CONTROL_VTL_EDITOR } from 'constants/dom-constants';

const { COMPONENT_CLASS } = CONTROL_VTL_EDITOR;

const VTLEditor = ({
  availableSuggestions,
  label,
  input,
  required,
  setDisableValidation,
}) => {
  const [errors, setErrors] = useState([]);
  const variables = availableSuggestions.reduce(
    (acc, s) => ({
      ...acc,
      [s]: { type: 'Variable' },
    }),
    {},
  );

  const customTools = {
    ...tools,
    getSuggestionsFromRange: getSuggestions,
    initialRule: 'expr',
  };

  const { value, onChange, name: id } = input;

  const handleErrors = e => {
    setErrors(e);
    if (e.length > 0 && value.length > 0) setDisableValidation(true);
    else setDisableValidation(false);
  };

  const localOnChange = e => {
    onChange(e);
    if (!e) {
      setDisableValidation(false);
      setErrors([]);
    }
  };

  return (
    <div className={COMPONENT_CLASS}>
      <label htmlFor={id}>
        {label}
        {required && <span className="ctrl-required">*</span>}
      </label>
      <div>
        <AntlrEditor
          script={value}
          setScript={localOnChange}
          languageVersion="my-language"
          onListErrors={handleErrors}
          variables={variables}
          variableURLs={[]}
          tools={customTools}
          options={{
            minimap: false,
            theme: 'vs-light',
            hideLines: true,
            style: {
              height: '100px',
            },
          }}
        />
      </div>
      <div style={{ color: 'red' }}>
        {errors.map(({ message }) => message).join(' - ')}
      </div>
    </div>
  );
};

export default VTLEditor;
