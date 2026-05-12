import { DatatypeType } from '@/models/datatype'

import { computeDatatypeName } from './utils/datatype'

type Props = {
  datatype: DatatypeType
}

/** Display the datatype of a variable (e.g. text, boolean...). */
export default function VariableDatatype({ datatype }: Readonly<Props>) {
  return computeDatatypeName(datatype)
}
