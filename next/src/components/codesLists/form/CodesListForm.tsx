import { type SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useCallback, useEffect, useState } from 'react'

import Button, { ButtonStyle } from '@/components/ui/Button'
import ControlledField from '@/components/ui/form/ControlledField'
import Form from '@/components/ui/form/Form'
import Input from '@/components/ui/form/Input'
import Label from '@/components/ui/form/Label'
import { useFormCancel } from '@/hooks/form/useFormCancel'
import { useReactHookfForm } from '@/hooks/form/useReactHookfForm'
import { type CodesList } from '@/models/codesLists'
import { FormulasLanguages } from '@/models/questionnaires'
import { Variable } from '@/models/variables'

import CodesFields from './CodesFields'
import ImportCodesListFromCsv from './ImportCodesListFromCsv'
import { type FormValues, schema } from './schema'

interface CodesListFormProps {
  /** In an update case, initial codes list value. */
  codesList?: Omit<CodesList, 'id'>
  /** Related questionnaire id. */
  questionnaireId: string
  formulasLanguage?: FormulasLanguages
  /** Variables of the questionnaire used for the VTL Editor. */
  variables?: Variable[]
  /** Function that will be called with form data when the user submit the form. */
  onSubmit: SubmitHandler<FormValues>
  /** Function that will be called with form data when the form values change. */
  onValuesChange?: (values: FormValues) => void
}

/**
 * Create or edit a codes list.
 *
 * A code list has a label and codes (defined by a label and value).
 *
 * A code can have subcodes.
 *
 * @see {@link CodesList}
 */
export default function CodesListForm({
  codesList = {
    label: '',
    codes: [{ label: '', value: '', codes: [] }],
  },
  questionnaireId,
  formulasLanguage,
  variables = [],
  onSubmit,
  onValuesChange,
}: Readonly<CodesListFormProps>) {
  const { t } = useTranslation()
  const cancel = useFormCancel()
  const [showCsvImport, setShowCsvImport] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitted },
    setError,
    trigger,
    watch,
    getValues,
    setValue,
  } = useReactHookfForm<FormValues>({
    defaultValues: {
      label: '',
      codes: [{ label: '', value: '', codes: [] }],
    },
    values: codesList,
    schema,
  })

  useEffect(() => {
    const subscription = watch((values) => {
      onValuesChange?.(values as FormValues)
    })
    return () => subscription.unsubscribe()
  }, [watch, onValuesChange])

  const handleImportSuccess = useCallback(
    (importedFormValues: FormValues) => {
      const currentValues = getValues()
      const mergedCodes = [
        ...currentValues.codes.filter((code) => code.value || code.label),
        ...importedFormValues.codes,
      ]

      const uniqueCodesMap = new Map<string, FormValues['codes'][number]>()
      mergedCodes.forEach((code) => {
        if (code.value) {
          uniqueCodesMap.set(code.value, {
            label: code.label,
            value: code.value,
            codes: code.codes || [],
          })
        }
      })

      const uniqueCodes = Array.from(uniqueCodesMap.values())
      setValue(
        'codes',
        uniqueCodes.length > 0
          ? uniqueCodes
          : [{ label: '', value: '', codes: [] }],
      )

      setShowCsvImport(false)
    },
    [getValues, setValue],
  )

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() =>
        cancel({
          to: '/questionnaire/$questionnaireId/codes-lists',
          params: { questionnaireId },
        })
      }
      isDirty={isDirty}
      isValid={isValid}
      isSubmitted={isSubmitted}
    >
      <ControlledField
        control={control}
        name="label"
        label={t('codesList.common.label')}
        required
      >
        {(field) => (
          <Input value={field.value} onValueChange={field.onChange} />
        )}
      </ControlledField>
      <div>
        {!showCsvImport && (
          <Button
            type="button"
            onClick={() => setShowCsvImport((v) => !v)}
            buttonStyle={ButtonStyle.Primary}
          >
            {t('codesList.import.importButton')}
          </Button>
        )}
        {showCsvImport && (
          <div className="border-t border-default pt-4 mt-4">
            <ImportCodesListFromCsv
              onImportSuccess={handleImportSuccess}
              onCancel={() => setShowCsvImport(false)}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-[1fr_2fr_auto_auto] auto-cols-min items-start gap-x-2 gap-y-2">
        <Label className="col-start-1">{t('codesList.common.codeValue')}</Label>
        <Label className="col-start-2">{t('codesList.common.codeLabel')}</Label>
        <CodesFields
          control={control}
          formulasLanguage={formulasLanguage}
          variables={variables}
          setError={setError}
          trigger={trigger}
        />
      </div>
    </Form>
  )
}
