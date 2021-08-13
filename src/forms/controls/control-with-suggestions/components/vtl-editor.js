import React, { useState } from 'react';
import { AntlrEditor } from 'antlr-editor';
import * as tools from 'vtl-2-0-antlr-tools-ts';
import { getSuggestions } from './vtl-suggestions';

import { CONTROL_RICH_TEXTAREA } from 'constants/dom-constants';

const { COMPONENT_CLASS } = CONTROL_RICH_TEXTAREA;

const VTLEditor = ({
  availableSuggestions,
  label,
  input,
  required,
  ...props
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
  console.log(props);
  const { value, onChange, name: id } = input;
  return (
    <div className={COMPONENT_CLASS}>
      <label htmlFor={id}>
        {label}
        {required && <span className="ctrl-required">*</span>}
      </label>
      <div>
        <AntlrEditor
          script={value}
          setScript={onChange}
          languageVersion="my-language"
          setErrors={setErrors}
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
        {errors.length > 0 && <div>{`Errors: ${errors.join(' - ')}`}</div>}
      </div>
    </div>
  );
};

export default VTLEditor;
