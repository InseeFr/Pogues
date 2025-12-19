import { DatatypeType, DateFormat } from '@/models/datatype';

import { computeDatatypeName } from '../utils/datatype';

/** Available datatypes to create / update a variable. */
export const datatypeOptions = [
  {
    label: computeDatatypeName(DatatypeType.Text),
    value: DatatypeType.Text,
  },
  {
    label: computeDatatypeName(DatatypeType.Date),
    value: DatatypeType.Date,
  },
  {
    label: computeDatatypeName(DatatypeType.Numeric),
    value: DatatypeType.Numeric,
  },
  {
    label: computeDatatypeName(DatatypeType.Boolean),
    value: DatatypeType.Boolean,
  },
];

/** Available date formats to create / update a variable. */
export const dateFormatOptions = [
  {
    label: DateFormat.YearMonthDay,
    value: DateFormat.YearMonthDay,
  },
  {
    label: DateFormat.YearMonth,
    value: DateFormat.YearMonth,
  },
  {
    label: DateFormat.Year,
    value: DateFormat.Year,
  },
];
