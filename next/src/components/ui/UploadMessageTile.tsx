import ErrorIcon from '@/components/ui/icons/ErrorIcon'
import { UploadMessage } from '@/models/personalizationQuestionnaire'

interface DetailItem {
  message: string
  dataIndex?: number
  attributeKey?: string
}

interface UploadMessageTileProps {
  message?: string
  details?: DetailItem[]
  isError?: boolean
  messages?: UploadMessage
  isErrorUpload?: boolean
}

/** Display upload messages as an alert box. */
export default function UploadMessageTile({
  message,
  details,
  isError,
  messages,
  isErrorUpload,
}: Readonly<UploadMessageTileProps>) {
  // Use old format if provided, otherwise use new format
  const displayMessage = messages?.message ?? message ?? ''
  const displayDetails = messages?.details ?? details
  const displayIsError = isErrorUpload ?? isError ?? false

  const colorClass = displayIsError
    ? 'bg-red-100 border-red-300 text-red-800 border'
    : 'bg-blue-100 border-blue-300 text-blue-800 border'
  return (
    <div
      aria-label="error-component"
      className={`${colorClass} rounded px-4 py-3 flex items-start`}
    >
      <ErrorIcon
        className={`w-6 h-6 mr-3 mt-0.5 flex-shrink-0 ${displayIsError ? 'text-red-800' : 'text-blue-800'}`}
      />
      <div>
        <h4 className="text-lg font-semibold">{displayMessage}</h4>
        {displayDetails && displayDetails.length > 0 && (
          <ul className="list-disc pl-5 mt-1">
            {displayDetails.map((detail) => (
              <li key={detail.dataIndex}>{detail.message}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
