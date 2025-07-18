import ErrorIcon from '@/components/ui/icons/ErrorIcon';
import { UploadError } from '@/models/personalizationQuestionnaire';

interface ErrorProps {
  error: UploadError;
}

/** Display check error as an alert box. */
export default function ErrorTile({ error }: Readonly<ErrorProps>) {
  return (
    <div className="bg-red-100 border border-red-300 text-red-800 rounded px-4 py-3 mb-4 flex items-start">
      <ErrorIcon className="w-6 h-6 text-red-800 mr-3 mt-1 flex-shrink-0" />
      <div>
        <h4 className="text-lg font-semibold mb-2">{error.message}</h4>
        {error.details && error.details.length > 0 && (
          <ul className="list-disc pl-5 mt-1">
            {error.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
