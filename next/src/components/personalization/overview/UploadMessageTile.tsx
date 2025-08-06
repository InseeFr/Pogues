import ErrorIcon from '@/components/ui/icons/ErrorIcon';
import { UploadMessage } from '@/models/personalizationQuestionnaire';

interface UploadMessageTileProps {
  messages: UploadMessage;
  isErrorUpload: boolean;
}

/** Display check upload messages as an alert box. */
export default function UploadMessageTile({
  messages,
  isErrorUpload,
}: Readonly<UploadMessageTileProps>) {
  const colorClass = isErrorUpload
    ? 'bg-red-100 border-red-300 text-red-800 border'
    : 'bg-blue-100 border-blue-300 text-blue-800 border';
  return (
    <div
      aria-label="error-component"
      className={`${colorClass} rounded px-4 py-3 flex items-start`}
    >
      <ErrorIcon
        className={`w-6 h-6 mr-3 mt-0.5 flex-shrink-0 ${isErrorUpload ? 'text-red-800' : 'text-blue-800'}`}
      />
      <div>
        <h4 className="text-lg font-semibold mb-2">{messages.message}</h4>
        {messages.details && messages.details.length > 0 && (
          <ul className="list-disc pl-5 mt-1">
            {messages.details.map((detail) => (
              <li key={detail.dataIndex}>{detail.message}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
