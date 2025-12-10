import { DatatypeType, DateFormat } from '@/models/datatype';

import { computeDatatypeName } from '../utils/datatype';

/** Available datatypes for variable creation / update. */
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

/** Available formats for variable of date datatype creation / update. */
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
