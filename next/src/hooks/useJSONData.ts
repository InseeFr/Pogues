import { useTranslation } from 'react-i18next'

/** Hook which parse the JSON string. */
export function useJSONData(stringJSON: string) {
  const { t } = useTranslation()
  try {
    const parsedJSON = JSON.parse(stringJSON)
    return { value: parsedJSON }
  } catch {
    return {
      error: new Error(t('error.parsing.jsonParsing')),
    }
  }
}
