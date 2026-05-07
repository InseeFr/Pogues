import { fireEvent, screen, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'

import { renderWithI18n } from '@/testing/render'
import {
  convertCsvToFormValues,
  validateCodeListCsvFile,
} from '@/utils/csvValidation'

import ImportCodesListFromCsv from './ImportCodesListFromCsv'

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { error: vi.fn(), success: vi.fn() },
}))

vi.mock('@/utils/csvValidation', () => ({
  validateCodeListCsvFile: vi.fn(),
  convertCsvToFormValues: vi.fn(),
}))

vi.mock('@/components/personalization/form/CsvViewerTable', () => ({
  default: () => <div data-testid="csv-viewer-table" />,
}))

const mockValidate = vi.mocked(validateCodeListCsvFile)
const mockConvert = vi.mocked(convertCsvToFormValues)

const makeParsedData = (rowCount = 3) => ({
  data: Array.from({ length: rowCount }, (_, i) => [`code${i}`, `label${i}`]),
  errors: [],
  meta: {
    delimiter: ',',
    linebreak: '\n',
    aborted: false,
    truncated: false,
    cursor: 0,
  },
})

const makeCsvFile = () =>
  new File(['code1,label1'], 'test.csv', { type: 'text/csv' })

const uploadFile = (file: File) =>
  fireEvent.change(screen.getByTestId('csv-file-upload'), {
    target: { files: [file] },
  })

describe('ImportCodesListFromCsv', () => {
  const onImportSuccess = vi.fn()
  const onCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderComponent = () =>
    renderWithI18n(
      <ImportCodesListFromCsv
        onImportSuccess={onImportSuccess}
        onCancel={onCancel}
      />,
    )

  it('renders the import button correctly', () => {
    renderComponent()
    expect(screen.getByText('Import codes from CSV')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Select CSV file' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Validate' })).toBeDisabled()
    expect(screen.queryByTestId('csv-viewer-table')).not.toBeInTheDocument()
  })

  it('calls onCancel when Cancel is clicked', () => {
    renderComponent()
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onCancel).toHaveBeenCalledOnce()
  })

  it('shows row count, CSV preview, and allow validation after a successful upload', async () => {
    const parsedData = makeParsedData(3)
    mockValidate.mockResolvedValueOnce({
      success: true,
      data: parsedData,
      hasHeader: false,
    })

    renderComponent()
    uploadFile(makeCsvFile())

    await waitFor(() => {
      expect(screen.getByText('3 codes detected')).toBeInTheDocument()
      expect(screen.getByTestId('csv-viewer-table')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Validate' })).toBeEnabled()
    })
  })

  it('calls shows an error toast and prevent validation when validation fails with a message', async () => {
    mockValidate.mockResolvedValueOnce({
      success: false,
      error: 'CSV file validation error',
    })

    renderComponent()
    uploadFile(makeCsvFile())

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('CSV file validation error')
    })
    expect(screen.getByRole('button', { name: 'Validate' })).toBeDisabled()
    expect(screen.queryByTestId('csv-viewer-table')).not.toBeInTheDocument()
  })

  it('falls back to the generic error message when validation fails without a message', async () => {
    mockValidate.mockResolvedValueOnce({ success: false })

    renderComponent()
    uploadFile(makeCsvFile())

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('CSV file validation error')
    })
  })

  it('calls convertCsvToFormValues and onImportSuccess with a success toast on Validate click', async () => {
    const parsedData = makeParsedData(2)
    const formValues = {
      label: '',
      codes: [
        { value: 'code0', label: 'label0', codes: [] },
        { value: 'code1', label: 'label1', codes: [] },
      ],
    }
    mockValidate.mockResolvedValueOnce({
      success: true,
      data: parsedData,
      hasHeader: false,
    })
    mockConvert.mockReturnValueOnce(formValues)

    renderComponent()
    uploadFile(makeCsvFile())

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Validate' })).toBeEnabled()
    })

    fireEvent.click(screen.getByRole('button', { name: 'Validate' }))

    expect(mockConvert).toHaveBeenCalledWith(parsedData, false)
    expect(toast.success).toHaveBeenCalledWith(
      'Code list imported successfully',
    )
    expect(onImportSuccess).toHaveBeenCalledWith(formValues)
  })

  it('convertCsvToFormValues detects header row when importing a file with a header', async () => {
    const parsedData = makeParsedData(2)
    mockValidate.mockResolvedValueOnce({
      success: true,
      data: parsedData,
      hasHeader: true,
    })
    mockConvert.mockReturnValueOnce({
      label: '',
      codes: [{ value: 'v', label: 'l', codes: [] }],
    })

    renderComponent()
    uploadFile(makeCsvFile())

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Validate' })).toBeEnabled()
    })

    fireEvent.click(screen.getByRole('button', { name: 'Validate' }))

    expect(mockConvert).toHaveBeenCalledWith(parsedData, true)
  })

  it('disables Validate and does not call onImportSuccess when convertCsvToFormValues throwas an error', async () => {
    const parsedData = makeParsedData(2)
    mockValidate.mockResolvedValueOnce({
      success: true,
      data: parsedData,
      hasHeader: false,
    })
    mockConvert.mockImplementationOnce(() => {
      throw new Error('No valid codes found')
    })

    renderComponent()
    uploadFile(makeCsvFile())

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Validate' })).toBeEnabled()
    })

    fireEvent.click(screen.getByRole('button', { name: 'Validate' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Validate' })).toBeDisabled()
    })
    expect(onImportSuccess).not.toHaveBeenCalled()
  })
})
