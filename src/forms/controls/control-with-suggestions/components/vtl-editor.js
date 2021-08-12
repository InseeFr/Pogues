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
  console.log('value', value);
  console.log('errors', errors);
  return (
    <div className={COMPONENT_CLASS}>
      <label htmlFor={id}>
        {label}
        {required && <span className="ctrl-required">*</span>}
      </label>
      <div>
        <AntlrEditor
          script={value}
          setScript={e => {
            if (e === '') setErrors([]);
            onChange(e);
          }}
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
        {/* <RichTextEditor
          blockStyleFn={() => 'singleline'}
          value={editorValue}
          onChange={this.handleChange}
          toolbarConfig={targetIsQuestion ? toolbarConfigQuestion : toolbar}
          handleReturn={this.handleReturn}
          rootStyle={rootStyle}
          formatURL={formatURL}
          disabled={disabled}
          onFocus={() => {
            this.handleInputFocus();
            input.onFocus();
          }}
          ref={node => {
            this.input = node;
          }}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={myKeyBindingFn}
        />
        {touched && error && <span className="form-error">{error}</span>}
        {super.render()} */}
      </div>
    </div>
  );
};

export default VTLEditor;
