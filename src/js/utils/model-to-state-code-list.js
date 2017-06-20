import { uuid } from '../utils/data-utils'

export function codeListToState(rawCodeList) {
  const { codes } = rawCodeList
  return codes.map(({ value, label, name }) => ({
    id: uuid(),
    value,
    label,
    name
  }))
}