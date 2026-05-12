import i18next from 'i18next'

import { DatatypeType } from '@/models/datatype'

/**
 * Compute the translated readable name of the variable datatype (e.g. text,
 * boolean...).
 */
export function computeDatatypeName(datatype: DatatypeType) {
  switch (datatype) {
    case DatatypeType.Boolean:
      return i18next.t('variable.datatype.boolean')
    case DatatypeType.Date:
      return i18next.t('variable.datatype.date')
    case DatatypeType.Duration:
      return i18next.t('variable.datatype.duration')
    case DatatypeType.Numeric:
      return i18next.t('variable.datatype.numeric')
    case DatatypeType.Text:
      return i18next.t('variable.datatype.text')
  }
}
