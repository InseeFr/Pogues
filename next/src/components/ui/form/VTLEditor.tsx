import { useEffect, useState } from 'react';

import { AntlrEditor } from '@making-sense/antlr-editor';
import { Error, Tools } from '@making-sense/antlr-editor/model';
import * as tools from '@making-sense/vtl-2-0-antlr-tools-ts';
import {
  getSuggestionsFromRange,
  monarchDefinition,
} from '@making-sense/vtl-2-0-monaco-tools-ts';
import { type ErrorOption } from 'react-hook-form';

import { type Variable } from '@/models/variables';

import Field, { type Props as FieldProps } from './Field';
import { computeAntlrVariables } from './utils/vtlEditor';

type Props = {
  /** Additional information about the field. */
  description?: FieldProps['description'];
  /**
   * Whether the field's value has been changed from its initial value. Useful
   * when the field state is controlled by an external library.
   */
  dirty?: FieldProps['dirty'];
  /**
   * Whether the component should ignore user interaction. Takes precedence over
   * the disabled prop on the `<Field.Control>` component.
   */
  disabled?: FieldProps['disabled'];
  /** Display an error from `react-hook-form`. */
  error?: FieldProps['error'];
  /** Whether the field is forcefully marked as invalid. */
  invalid?: FieldProps['invalid'];
  /**
   * An accessible label that is automatically associated with the field
   * control.
   */
  label?: FieldProps['label'];
  /**
   * Identifies the field when a form is submitted. Takes precedence over the
   * `name` prop on the `<Field.Control>` component.
   */
  name?: FieldProps['name'];
  /** Whether the field is mandatory. */
  required?: FieldProps['required'];
  /** Variables that can be suggested for autocompletion. */
  suggestionsVariables?: Variable[];
  /**
   * Whether the field has been touched. Useful when the field state is
   * controlled by an external library.
   */
  touched?: FieldProps['touched'];
  /** The value of the input. */
  value?: string;
  /** Manually clear custom error for `react-hook-form` to manage. */
  clearErrors?: () => void;
  onChange: (value: string) => void;
  /** Manually set custom error for `react-hook-form` to manage. */
  setError?: (error: ErrorOption) => void;
};

/**
 * A VTL editor input component with autocompletion of variables and functions.
 *
 * Use `Field` component to handle labeling and validation and has some optional
 * functions if it's in a `react-hook-form`.
 */
export default function VTLEditor({
  description,
  dirty,
  disabled,
  error,
  invalid,
  label,
  name,
  required,
  suggestionsVariables = [],
  touched,
  value,
  clearErrors = () => {},
  onChange,
  setError = () => {},
}: Readonly<Props>) {
  // Errors returned by the input
  const [vtlEditorErrors, setVTLEditorErrors] = useState<Error[]>([]);
  /** Whether there are errors on the input. */
  const isInvalid = !!error || vtlEditorErrors.length > 0;
  /** Variables that can be suggested for autocompletion. */
  const antlrVariables = computeAntlrVariables(suggestionsVariables);
  /** Additional tools to improve user experience. */
  const customTools: Tools = {
    ...tools,
    monarchDefinition,
    getSuggestionsFromRange,
    initialRule: 'expr',
  };

  // Send VTL error to `react-hook-form`
  useEffect(() => {
    if (error) return;
    if (!value || vtlEditorErrors.length === 0) {
      clearErrors();
      return;
    }
    for (const error of vtlEditorErrors) {
      const message = `[Ln ${error.line}, Col ${error.column}] ${error.message}`;
      setError({ type: 'custom', message });
    }
    // Remove clearErrors et setError to avoid infinite rerender
    // We'll use `useEffectEvent` to fix this once we're in React 19
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, name, value, vtlEditorErrors]);

  return (
    <Field
      description={description}
      dirty={dirty}
      disabled={disabled}
      error={error}
      invalid={invalid || isInvalid}
      label={label}
      name={name}
      required={required}
      touched={touched}
    >
      <div
        className={`
          h-20 w-full sm:w-[90%] lg:w-full
          resize-y overflow-auto
          text-sm text-default font-sans font-normal
          p-2 
          border border-default rounded-lg
          hover:border-primary
          focus-within:border-primary focus-within:outline focus-within:outline-primary
          bg-default
          placeholder:text-placeholder
          disabled:text-disabled disabled:bg-disabled
        `}
      >
        <AntlrEditor
          script={value}
          setScript={(value: string) => onChange(value)}
          onListErrors={(e: Error[]) => setVTLEditorErrors(e)}
          variables={antlrVariables}
          tools={customTools}
          theme="vs-light"
          height="100%"
          options={{
            minimap: { enabled: false },
            lineNumbers: 'off',
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            renderLineHighlight: 'none',
            readOnly: disabled,
            ariaRequired: required,
          }}
        />
      </div>
    </Field>
  );
}
