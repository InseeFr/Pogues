import { type ParseResult } from 'papaparse'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useRef, useState } from 'react'

import CsvViewerTable from '@/components/personalization/form/CsvViewerTable'
import Button, { ButtonStyle } from '@/components/ui/Button'
import FormInput from '@/components/ui/form/FormInput'
import {
  convertCsvToFormValues,
  validateCodeListCsvFile,
} from '@/utils/csvValidation'

import { type FormValues } from '../form/schema'

interface ImportCodesListFromCsvProps {
  onImportSuccess: (formValues: FormValues) => void
  onCancel: () => void
}

export default function ImportCodesListFromCsv({
  onImportSuccess,
  onCancel,
}: Readonly<ImportCodesListFromCsvProps>) {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [parseError, setParseError] = useState<string | null>(null)
  const [parsedData, setParsedData] = useState<ParseResult<unknown> | null>(
    null,
  )
  const [hasHeader, setHasHeader] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setParseError(null)
    setParsedData(null)
    setHasHeader(false)

    try {
      const validationResult = await validateCodeListCsvFile(file)

      if (!validationResult.success) {
        const errorKey =
          validationResult.error &&
          validationResult.error.startsWith('codesList.')
            ? (validationResult.error as
                | 'codesList.import.columnNumber'
                | 'codesList.import.noDataFound'
                | 'codesList.import.genericValidationError')
            : 'codesList.import.genericValidationError'
        const errorMessage = t(errorKey)
        toast.error(errorMessage)
        setParseError(errorMessage)
        return
      }

      if (validationResult.data) {
        setParsedData(validationResult.data)
        setHasHeader(validationResult.hasHeader ?? false)
      }
    } catch (error) {
      setIsLoading(false)
      setParseError(t('codesList.import.conversionError'))
      console.error('CSV validation error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImport = () => {
    if (!parsedData?.data || parsedData.data.length === 0) {
      setParseError(t('codesList.import.noDataToImport'))
      return
    }

    try {
      const formValues = convertCsvToFormValues(parsedData, hasHeader)
      toast.success(t('codesList.import.uploadSuccess'))
      onImportSuccess(formValues)
    } catch (error) {
      console.error('Error converting CSV data:', error)
      setParseError(
        error instanceof Error
          ? error.message
          : t('codesList.import.conversionError'),
      )
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-default">
        {t('codesList.import.title')}
      </h3>

      <div className="border border-default rounded-lg p-4 bg-accent">
        <p className="font-medium mb-2">{t('codesList.import.instructions')}</p>
        <ul className="list-disc list-inside space-y-1 text-default">
          <li>{t('codesList.import.columnNumber')}</li>
          <li>{t('codesList.import.separator')}</li>
          <li>{t('codesList.import.encodingNote')}</li>
          <ul>
            <li>
              <i>{t('codesList.import.csvExample')}</i>
            </li>
          </ul>
        </ul>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <FormInput
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            accept=".csv,text/csv"
            data-testid="csv-file-upload"
          />
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            buttonStyle={ButtonStyle.Primary}
            disabled={isLoading}
          >
            {t('codesList.import.uploadButton')}
          </Button>
          {parsedData?.data && (
            <span className="text-sm text-gray-600 ml-2">
              {t('codesList.import.fileSelected', {
                count: parsedData.data.length,
              })}
            </span>
          )}
        </div>

        {isLoading && (
          <div className="text-action-primary">{t('common.loading')}...</div>
        )}

        {parsedData && !parseError && (
          <CsvViewerTable
            data-testid="csv-viewer-table"
            parsedCsv={parsedData}
            hasHeader={hasHeader}
          />
        )}

        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            buttonStyle={ButtonStyle.Secondary}
            onClick={onCancel}
            disabled={isLoading}
          >
            {t('common.cancel')}
          </Button>
          <Button
            type="button"
            buttonStyle={ButtonStyle.Primary}
            onClick={handleImport}
            disabled={isLoading || !parsedData || !!parseError}
          >
            {t('codesList.import.importValidateButton')}
          </Button>
        </div>
      </div>
    </div>
  )
}
