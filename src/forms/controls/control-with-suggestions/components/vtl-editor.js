/* eslint-disable no-console */
import React from 'react';
import { AntlrEditor } from '@eurostat/vtl-editor';
import * as tools from 'vtl-2-0-antlr-tools-ts';
import { getSuggestions } from './vtl-suggestions';

import { CONTROL_VTL_EDITOR } from 'constants/dom-constants';

const { COMPONENT_CLASS } = CONTROL_VTL_EDITOR;

const VTLEditor = ({ availableSuggestions, label, input, required }) => {
  // const [errors, setErrors] = useState([]);
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
          // onListErrors={setErrors}
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
    </div>
  );
};

export default VTLEditor;
