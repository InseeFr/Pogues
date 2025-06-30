import {
  DataType,
  DatatypeType,
  DateFormat,
  DurationFormat,
  MinuteSecondDuration,
  YearMonthDuration,
} from '@/models/datatype';
import { BaseVariable, Variable, VariableType } from '@/models/variables';

import {
  DateFormatEnum as PoguesDateFormat,
  Variable as PoguesVariable,
  VariableTypeType as PoguesVariableType,
} from '../models/pogues';

/** Compute variable array that can be used in our app from API data. */
export function computeVariables(variables: PoguesVariable[]): Variable[] {
  return variables.map((variable) => computeVariable(variable));
}

/** Compute variable that can be used in our app from API data. */
export function computeVariable(variable: PoguesVariable): Variable {
  const datatype = computeDatatype(variable.Datatype);

  const baseVariable: BaseVariable = {
    id: variable.id,
    name: variable.Name,
    label: variable.Label,
    datatype: datatype,
  };

  if (variable.CodeListReference) {
    baseVariable.codeListReference = variable.CodeListReference;
  }
  if (variable.Scope) {
    baseVariable.scope = variable.Scope;
  }

  switch (variable.type) {
    case PoguesVariableType.CalculatedVariableType:
      return {
        ...baseVariable,
        type: VariableType.Calculated,
        formula: variable.Formula,
      };

    case PoguesVariableType.CollectedVariableType:
      return {
        ...baseVariable,
        type: VariableType.Collected,
      };

    case PoguesVariableType.ExternalVariableType:
      return {
        ...baseVariable,
        type: VariableType.External,
      };

    default:
      throw new Error('Unknown variable type');
  }
}

/** Compute date format from API data. Can be undefined in API data. */
function computeDateFormat(format?: PoguesDateFormat): DateFormat {
  switch (format) {
    case PoguesDateFormat.Year:
      return DateFormat.Year;
    case PoguesDateFormat.YearMonth:
      return DateFormat.YearMonth;
    case PoguesDateFormat.YearMonthDay:
      return DateFormat.YearMonthDay;
    default:
      return DateFormat.YearMonthDay;
  }
}

/** Compute date format from API data. It's simply typed as a string in API data. */
function computeDurationFormat(format?: string): DurationFormat {
  switch (format) {
    case 'PTnHnM':
      return DurationFormat.MinuteSecond;
    case 'PnYnM':
    default:
      return DurationFormat.YearMonth;
  }
}

/**
 * Provides a duration object from API concatenated string value, depending on the duration format.
 *
 *  Examples : P5Y2M -> {years: 5, months: 2} ; P5H2M -> {hours: 5, minutes: 2}
 */
function computeDuration(
  value: string,
  format: DurationFormat,
): YearMonthDuration | MinuteSecondDuration {
  switch (format) {
    case DurationFormat.YearMonth: {
      const match = matchRegex(/P(\d+)Y(\d+)M/, value, format);
      return { years: parseInt(match[1]), months: parseInt(match[2]) };
    }
    case DurationFormat.MinuteSecond: {
      const match = matchRegex(/PT(\d+)H(\d+)M/, value, format);
      return { hours: parseInt(match[1]), minutes: parseInt(match[2]) };
    }
    default:
      throw new Error(`Unknown duration format: ${format}`);
  }
}

function computeDatatype(datatype: PoguesVariable['Datatype']): DataType {
  switch (datatype.type) {
    case 'BooleanDatatypeType':
      return { typeName: DatatypeType.Boolean };

    case 'DateDatatypeType': {
      const format = computeDateFormat(datatype.Format);
      return {
        typeName: DatatypeType.Date,
        format,
        minimum: datatype.Minimum ? new Date(datatype.Minimum) : undefined,
        maximum: datatype.Maximum ? new Date(datatype.Maximum) : undefined,
      };
    }

    case 'DurationDatatypeType': {
      const format = computeDurationFormat(datatype.Format);
      return {
        typeName: DatatypeType.Duration,
        format,
        minimum: datatype.Minimum
          ? computeDuration(datatype.Minimum, format)
          : undefined,
        maximum: datatype.Maximum
          ? computeDuration(datatype.Maximum, format)
          : undefined,
      };
    }

    case 'NumericDatatypeType':
      return {
        typeName: DatatypeType.Numeric,
        minimum: safeParseFloat(datatype.Minimum),
        maximum: safeParseFloat(datatype.Maximum),
        decimals: safeParseFloat(datatype.Decimals),
        isDynamicUnit: datatype.IsDynamicUnit,
        unit: datatype.Unit,
      };

    case 'TextDatatypeType':
      return {
        typeName: DatatypeType.Text,
        maxLength: datatype.MaxLength,
      };

    default:
      throw new Error('Unsupported datatype');
  }
}

/**
 * Parse a string into number, returning undefined if the result is not a number.
 */
function safeParseFloat(value?: string): number | undefined {
  if (value === undefined) return undefined;
  const num = parseFloat(value);
  return isNaN(num) ? undefined : num;
}

/**
 * Execute regex match and handle invalid format gracefully.
 * Used for computing date and duration from string
 */
function matchRegex(
  pattern: RegExp,
  value: string,
  format: string,
): RegExpExecArray {
  const match = pattern.exec(value);
  if (!match) {
    throw new Error(`Invalid value for ${format}: ${value}`);
  }
  return match;
}
