import { AntlrEditor } from '@making-sense/antlr-editor'
import { Error, Tools } from '@making-sense/antlr-editor/dist/model'
import * as tools from '@making-sense/vtl-2-1-antlr-tools-ts'
import {
  getSuggestionsFromRange,
  monarchDefinition,
} from '@making-sense/vtl-2-1-monaco-tools-ts'
import { type ErrorOption } from 'react-hook-form'

import { useCallback, useMemo } from 'react'

import { type Variable } from '@/models/variables'

import Field, { type Props as FieldProps } from './Field'
import { computeAntlrVariables } from './utils/vtlEditor'
import { filterPoguesDollarCompatibilityErrors } from './utils/vtlDollarCompatibility'

type Props = {
  /** Additional information about the field. */
  description?: FieldProps['description']
  /**
   * Whether the field's value has been changed from its initial value. Useful
   * when the field state is controlled by an external library.
   */
  dirty?: FieldProps['dirty']
  /**
   * Whether the component should ignore user interaction. Takes precedence over
   * the disabled prop on the `<Field.Control>` component.
   */
  disabled?: FieldProps['disabled']
  /** Display an error from `react-hook-form`. */
  error?: FieldProps['error']
  /** Whether the field is forcefully marked as invalid. */
  invalid?: FieldProps['invalid']
  /**
   * An accessible label that is automatically associated with the field
   * control.
   */
  label?: FieldProps['label']
  /**
   * Identifies the field when a form is submitted. Takes precedence over the
   * `name` prop on the `<Field.Control>` component.
   */
  name?: FieldProps['name']
  /** Whether the field is mandatory. */
  required?: FieldProps['required']
  /** Variables that can be suggested for autocompletion. */
  suggestionsVariables?: Variable[]
  /**
   * Whether the field has been touched. Useful when the field state is
   * controlled by an external library.
   */
  touched?: FieldProps['touched']
  /** The value of the input. */
  value?: string
  /** Callback fired when the value changes. */
  onChange: (value: string) => void
  /** Manually set custom error for `react-hook-form` to manage. */
  setError?: (error: ErrorOption) => void
  /**
   * When false, treat the field as a Pogues label (free text / `$VAR$`):
   * do not push VTL parser errors to the form and hide Monaco squiggles.
   * Formula fields keep the default `true` (only `$`-only lexer noise is filtered).
   */
  blockOnSyntaxErrors?: boolean
}

/**
 * A VTL editor input component with autocompletion of variables and functions.
 *
 * Use `Field` component to handle labeling and validation and has some optional
 * functions if it's in a `react-hook-form`.
 *
 * Do not call `cleanupProviders()` from here: providers are shared across Monaco
 * instances, and codes-list pages mount many editors at once.
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
  onChange,
  setError = () => {},
  blockOnSyntaxErrors = true,
}: Readonly<Props>) {
  /** Whether there are errors on the input. */
  const isInvalid = !!error
  /** Variables that can be suggested for autocompletion. */
  const antlrVariables = useMemo(
    () => computeAntlrVariables(suggestionsVariables),
    [suggestionsVariables],
  )
  /** Additional tools to improve user experience.
   * `expr` (not `start`): Pogues stores VTL expressions, not full scripts.
   * Full-input validation (EOF + lexer errors) is handled by antlr-editor ≥ 2.9.4.
   * Memoize: a new tools object each render re-triggers parse in antlr-editor.
   */
  const customTools: Tools = useMemo(
    () => ({
      ...tools,
      monarchDefinition,
      getSuggestionsFromRange,
      initialRule: 'expr',
    }),
    [],
  )

  const editorOptions = useMemo(
    () => ({
      minimap: { enabled: false },
      lineNumbers: 'off' as const,
      glyphMargin: false,
      folding: false,
      lineDecorationsWidth: 0,
      renderLineHighlight: 'none' as const,
      readOnly: disabled,
      ariaRequired: required,
      ...(blockOnSyntaxErrors
        ? {}
        : { renderValidationDecorations: 'off' as const }),
    }),
    [disabled, required, blockOnSyntaxErrors],
  )

  /** Send VTL errors to `react-hook-form` (formulas only). */
  const handleVTLErrors = useCallback(
    (vtlEditorErrors: Error[]) => {
      if (!blockOnSyntaxErrors) return
      if (error) return
      // Temporary: keep `$VAR$` for DDI/XSLT; ignore `$`-only lexer errors.
      const blockingErrors = filterPoguesDollarCompatibilityErrors(
        vtlEditorErrors,
        value,
      )
      for (const vtlError of blockingErrors) {
        const message = `[Ln ${vtlError.line}, Col ${vtlError.column}] ${vtlError.message}`
        setError({ type: 'custom', message })
      }
    },
    [blockOnSyntaxErrors, error, value, setError],
  )

  const handleScriptChange = useCallback(
    (next: string) => {
      onChange(next)
    },
    [onChange],
  )

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
          setScript={handleScriptChange}
          onListErrors={handleVTLErrors}
          variables={antlrVariables}
          tools={customTools}
          theme="vs-light"
          height="100%"
          options={editorOptions}
          shortcuts={{}}
          displayFooter={false}
        />
      </div>
    </Field>
  )
}
