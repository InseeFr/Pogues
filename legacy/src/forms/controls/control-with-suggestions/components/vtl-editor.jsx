import { useCallback, useMemo, useState } from 'react';

import { AntlrEditor } from '@making-sense/antlr-editor';
import * as tools from '@making-sense/vtl-2-1-antlr-tools-ts';
import {
  getSuggestionsFromRange,
  monarchDefinition,
} from '@making-sense/vtl-2-1-monaco-tools-ts';

import { filterPoguesDollarCompatibilityErrors } from './vtl-dollar-compatibility';

function sameVtlErrors(a = [], b = []) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  return a.every(
    (error, index) =>
      error.line === b[index].line &&
      error.column === b[index].column &&
      error.message === b[index].message,
  );
}

const VTLEditor = ({
  availableSuggestions,
  label,
  input,
  meta = {},
  required,
  disabled,
  setDisableValidation,
  /** When false (labels / markdown), VTL syntax errors do not block VALIDER. */
  blockOnSyntaxErrors = true,
}) => {
  const [errors, setErrors] = useState([]);

  const variables = useMemo(() => {
    const next = {};
    for (const s of availableSuggestions) {
      next[s] = { type: 'Variable' };
    }
    return next;
  }, [availableSuggestions]);

  // expr: Pogues stores VTL expressions (not full scripts). EOF leftover
  // tokens / empty input are handled by @making-sense/antlr-editor ≥ 2.9.4.
  // Memoize: a new tools object each render re-triggers parse in antlr-editor.
  const customTools = useMemo(
    () => ({
      ...tools,
      monarchDefinition,
      getSuggestionsFromRange,
      initialRule: 'expr',
    }),
    [],
  );

  const editorOptions = useMemo(
    () => ({
      minimap: { enabled: false },
      lineNumbers: 'off',
      glyphMargin: false,
      folding: false,
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 0,
      renderLineHighlight: 'none',
      readOnly: disabled,
      // Labels are not VTL expressions: hide Monaco squiggles from the parser.
      ...(blockOnSyntaxErrors
        ? {}
        : { renderValidationDecorations: 'off' }),
    }),
    [disabled, blockOnSyntaxErrors],
  );

  const { value, onChange, name: id } = input;
  const { touched, error, submitFailed } = meta;
  const showFormError = (touched || submitFailed) && error;

  const handleErrors = useCallback(
    (e) => {
      if (!blockOnSyntaxErrors) {
        setErrors((prev) => (prev.length === 0 ? prev : []));
        return;
      }
      // Temporary: keep `$VAR$` for DDI/XSLT; ignore `$`-only lexer errors.
      // Prefer live script from antlr-editor when provided via filterErrors.
      const blockingErrors = filterPoguesDollarCompatibilityErrors(e, value);
      setErrors((prev) =>
        sameVtlErrors(prev, blockingErrors) ? prev : blockingErrors,
      );
      if (setDisableValidation) {
        setDisableValidation(blockingErrors.length > 0);
      }
    },
    [value, setDisableValidation, blockOnSyntaxErrors],
  );

  const filterErrors = useCallback(
    (errors, script) => filterPoguesDollarCompatibilityErrors(errors, script),
    [],
  );

  const localOnChange = useCallback(
    (e) => {
      onChange(e);
      if (!e) {
        if (setDisableValidation && blockOnSyntaxErrors) {
          setDisableValidation(false);
        }
        setErrors([]);
      }
    },
    [onChange, setDisableValidation, blockOnSyntaxErrors],
  );

  return (
    <div className="ctrl-vtl-editor">
      <label htmlFor={id}>
        {label}
        {required && <span className="ctrl-required">*</span>}
      </label>
      <div>
        <div
          className={`editor-container ${disabled ? 'editor-disabled' : ''}`}
        >
          <AntlrEditor
            script={value}
            setScript={localOnChange}
            onListErrors={handleErrors}
            filterErrors={blockOnSyntaxErrors ? filterErrors : () => []}
            variables={variables}
            variablesInputURLs={[]}
            tools={customTools}
            height="100px"
            theme="vs-light"
            options={editorOptions}
          />
        </div>
        {showFormError && <span className="form-error">{error}</span>}
      </div>
      {blockOnSyntaxErrors && (
        <div style={{ color: 'red', display: 'inline-block' }}>
          {value &&
            !disabled &&
            errors.map(({ line, column, message }) => (
              <div key={`${line}_${column}`} style={{ marginBottom: '20px' }}>
                <div>{`Ligne : ${line} - Colonne : ${column}`}</div>
                <div>{message}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default VTLEditor;
