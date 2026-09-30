import JsonView from '@uiw/react-json-view'

import { useJSONData } from '@/hooks/useJSONData'

interface JsonViewerProps {
  data: string
}

/**
 * source: previous prismjs json viewer theme
 */
export const jsonViewerTheme: Record<string, string> = {
  '--w-rjv-font-family':
    'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  '--w-rjv-color': '#000',
  '--w-rjv-background-color': '#f5f7fa',
  '--w-rjv-key-string': '#690',
  '--w-rjv-key-number': '#905',
  '--w-rjv-colon-color': '#9a6e3a',
  '--w-rjv-curlybraces-color': '#999',
  '--w-rjv-brackets-color': '#999',
  '--w-rjv-line-color': '#999',
  '--w-rjv-arrow-color': '#999',
  '--w-rjv-info-color': '#999',
  '--w-rjv-edit-color': '#07a',
  '--w-rjv-quotes-color': '#690',
  '--w-rjv-quotes-string-color': '#690',
  '--w-rjv-type-string-color': '#690',
  '--w-rjv-type-int-color': '#905',
  '--w-rjv-type-float-color': '#905',
  '--w-rjv-type-bigint-color': '#905',
  '--w-rjv-type-boolean-color': '#905',
  '--w-rjv-type-null-color': '#07a',
  '--w-rjv-type-nan-color': '#905',
  '--w-rjv-type-date-color': '#07a',
  '--w-rjv-type-url-color': '#07a',
  '--w-rjv-type-undefined-color': '#905',
  '--w-rjv-copied-color': '#000',
  '--w-rjv-copied-success-color': '#690',
}

export default function JsonViewer({ data }: Readonly<JsonViewerProps>) {
  const shouldScroll = data.split('\n').length > 4
  const { value, error } = useJSONData(data)

  if (error) return <div>{error.message}</div>
  return (
    <div className="overflow-x-auto w-full my-1">
      <div
        style={{
          maxHeight: shouldScroll ? '420px' : 'none',
          overflowY: shouldScroll ? 'auto' : 'visible',
        }}
      >
        {value && (
          <JsonView
            value={value}
            collapsed={3}
            displayDataTypes={false}
            shortenTextAfterLength={0}
            className="rounded-lg p-2 overflow-auto"
            displayObjectSize={false}
            style={{ ...jsonViewerTheme, fontSize: 15 }}
          />
        )}
      </div>
    </div>
  )
}
