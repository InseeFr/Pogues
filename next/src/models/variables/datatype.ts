export enum DatatypeType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Duration = 'DURATION',
  Numeric = 'NUMERIC',
  Text = 'TEXT',
}

export type DataType =
  | BooleanDatatype
  | DateDatatype<DateFormat>
  | DurationDatatype<DurationFormat>
  | NumericDatatype
  | TextDatatype;

/**
 * Boolean variable
 */

type BooleanDatatype = {
  typeName: DatatypeType.Boolean;
};

/**
 * Date variable
 */

export enum DateFormat {
  YearMonthDay = 'YYYY-MM-DD',
  YearMonth = 'YYYY-MM',
  Year = 'YYYY',
}

export interface YearDate {
  year: number;
}

export interface YearMonthDate extends YearDate {
  month: number;
}

export interface YearMonthDayDate extends YearMonthDate {
  day: number;
}

type Date<F extends DateFormat> = F extends DateFormat.Year
  ? YearDate
  : F extends DateFormat.YearMonth
    ? YearMonthDate
    : F extends DateFormat.YearMonthDay
      ? YearMonthDayDate
      : never;

type DateDatatype<F extends DateFormat> = {
  typeName: DatatypeType.Date;
  format: F;
  minimum?: Date<F>;
  maximum?: Date<F>;
};

/**
 * Duration variable
 */

export enum DurationFormat {
  YearMonth = 'PnYnM',
  MinuteSecond = 'PTnHnM',
}

export interface YearMonthDuration {
  years: number;
  months: number;
}

export interface MinuteSecondDuration {
  hours: number;
  minutes: number;
}

type Duration<F extends DurationFormat> = F extends DurationFormat.YearMonth
  ? YearMonthDuration
  : F extends DurationFormat.MinuteSecond
    ? MinuteSecondDuration
    : never;

type DurationDatatype<F extends DurationFormat> = {
  typeName: DatatypeType.Duration;
  format: F;
  minimum?: Duration<F>;
  maximum?: Duration<F>;
};

/**
 * Numeric variable
 */

type NumericDatatype = {
  typeName: DatatypeType.Numeric;
  minimum?: number;
  maximum?: number;
  decimals?: number;
  isDynamicUnit?: boolean;
  unit?: string;
};

/**
 * Text variable
 */

type TextDatatype = {
  typeName: DatatypeType.Text;
  maxLength?: number;
};
