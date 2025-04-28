import React, { useState } from 'react';

import { Field } from '@base-ui-components/react/field';
import { AntlrEditor } from '@making-sense/antlr-editor';
import { Error, Tools } from '@making-sense/antlr-editor/model';
import * as tools from '@making-sense/vtl-2-0-antlr-tools-ts';
import {
  getSuggestionsFromRange,
  monarchDefinition,
} from '@making-sense/vtl-2-0-monaco-tools-ts';

import { Variable } from '@/models/variables/variables';

import { computeAntlrVariables } from './utils/vtlEditor';

interface VTLEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  style?: React.CSSProperties;
  suggestionsVariables?: Variable[];
}

export default function VTLEditor({
  value,
  onChange,
  className = '',
  disabled,
  error,
  label,
  required,
  style = {},
  suggestionsVariables = [],
}: Readonly<VTLEditorProps>) {
  const [vtlErrors, setVtlErrors] = useState<Error[]>([]);
  const isError = !!error || vtlErrors.length > 0;

  const antlrVariables = computeAntlrVariables(suggestionsVariables);

  const customTools: Tools = {
    ...tools,
    monarchDefinition,
    getSuggestionsFromRange,
    initialRule: 'expr',
  };

  return (
    <Field.Root
      invalid={isError}
      disabled={disabled}
      className={`${className} flex w-full h-full flex-col items-start gap-1`}
      style={style}
    >
      {label && (
        <Field.Label className="text-sm ml-1">
          {label}
          {required && ' *'}
        </Field.Label>
      )}
      <div
        className={`${className} w-full sm:w-[90%] md:w-[90%] lg:w-[100%] resize-y overflow-auto text-sm font-sans font-normal p-2 rounded-lg border border-default hover:border-primary focus-within:border-primary bg-default text-default placeholder:text-placeholder disabled:text-disabled disabled:bg-disabled focus-within:outline focus-within:outline-1 focus-within:outline-primary`}
      >
        <AntlrEditor
          script={value}
          setScript={(value: string) => onChange(value)}
          onListErrors={(e: Error[]) => setVtlErrors(e)}
          variables={antlrVariables}
          variablesInputURLs={[]}
          tools={customTools}
          theme="vs-light"
          height="100%"
          options={{
            extraEditorClassName: `${className}`,
            minimap: { enabled: false },
            lineNumbers: 'off',
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            renderLineHighlight: 'none',
            readOnly: disabled,
            ariaRequired: true,
          }}
        />
      </div>

      <Field.Error className="text-sm text-error ml-1" forceShow={!!error}>
        {error}
      </Field.Error>

      {value &&
        vtlErrors.map(
          ({ line, column, message }) =>
            message && (
              <Field.Error
                key={`${line}_${column}`}
                className="text-sm text-error ml-1"
                forceShow
              >
                <div>{`Ligne : ${line} - Colonne : ${column}`}</div>
                <div>{message}</div>
              </Field.Error>
            ),
        )}
    </Field.Root>
  );
}
