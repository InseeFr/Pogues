import dayjs from 'dayjs';

import {
  DataType,
  DatatypeType,
  DateFormat,
  DurationFormat,
  HourMinuteDuration,
  YearMonthDuration,
} from '@/models/datatype';
import { Variable, VariableType } from '@/models/variables';

import {
  VariableDTO,
  VariableDTODatatypeFormat,
  VariableDTODatatypeTypename,
  VariableDTOType,
} from '../models/variableDTO';

/** Compute variables that can be used in our app from API data. */
export function computeVariables(variablesDTO: VariableDTO[]): Variable[] {
  return variablesDTO.map((variableDTO) => computeVariable(variableDTO));
}

/** Compute variable that can be used in our app from API data. */
export function computeVariable(variableDTO: VariableDTO): Variable {
  const datatype = computeDatatype(variableDTO.datatype);

  const variable: Variable = {
    id: variableDTO.id,
    name: variableDTO.name,
    description: variableDTO.description,
    type: computeType(variableDTO.type),
    scope: variableDTO.scope,
    datatype,
  };

  if (variable.type === VariableType.Calculated) {
    variable.formula = variableDTO.formula || '';
  }

  return variable;
}

function computeType(type: VariableDTOType): VariableType {
  switch (type) {
    case VariableDTOType.Collected:
      return VariableType.Collected;
    case VariableDTOType.Calculated:
      return VariableType.Calculated;
    case VariableDTOType.External:
      return VariableType.External;
    default:
      throw new Error('Unknown variable type');
  }
}

function computeDateDatatypeFormat(
  format?: VariableDTODatatypeFormat,
): DateFormat {
  switch (format) {
    case VariableDTODatatypeFormat.DateYear:
      return DateFormat.Year;
    case VariableDTODatatypeFormat.DateYearMonth:
      return DateFormat.YearMonth;
    case VariableDTODatatypeFormat.DateYearMonthDay:
      return DateFormat.YearMonthDay;
    default:
      throw new Error('Unknown date datatype format');
  }
}

function computeDurationDatatypeFormat(
  format?: VariableDTODatatypeFormat,
): DurationFormat {
  switch (format) {
    case VariableDTODatatypeFormat.DurationYearMonth:
      return DurationFormat.YearMonth;
    case VariableDTODatatypeFormat.DurationHourMinute:
      return DurationFormat.HourMinute;
    default:
      throw new Error('Unknown duration datatype format');
  }
}

/**
 * Provides a duration object from API concatenated string value, depending on the duration format.
 *
 *  Examples : P5Y2M -> {years: 5, months: 2} ; P5H2M -> {hours: 5, minutes: 2}
 */
function computeDatatypeDuration(
  value: string,
  format: DurationFormat,
): YearMonthDuration | HourMinuteDuration {
  switch (format) {
    case DurationFormat.YearMonth: {
      const match = matchRegex(/P(\d+)Y(\d+)M/, value, format);
      return { years: parseInt(match[1]), months: parseInt(match[2]) };
    }
    case DurationFormat.HourMinute: {
      const match = matchRegex(/PT(\d+)H(\d+)M/, value, format);
      return { hours: parseInt(match[1]), minutes: parseInt(match[2]) };
    }
    default:
      throw new Error(`Unknown duration format: ${format}`);
  }
}

function computeDatatype(datatype: VariableDTO['datatype']): DataType {
  switch (datatype.typeName) {
    case VariableDTODatatypeTypename.Boolean:
      return { typeName: DatatypeType.Boolean };

    case VariableDTODatatypeTypename.Date: {
      const format = computeDateDatatypeFormat(datatype.format);
      return {
        typeName: DatatypeType.Date,
        format,
        minimum: datatype.minimum ? new Date(datatype.minimum) : undefined,
        maximum: datatype.maximum ? new Date(datatype.maximum) : undefined,
      };
    }

    case VariableDTODatatypeTypename.Duration: {
      const format = computeDurationDatatypeFormat(datatype.format);
      return {
        typeName: DatatypeType.Duration,
        format,
        minimum: datatype.minimum
          ? computeDatatypeDuration(datatype.minimum, format)
          : undefined,
        maximum: datatype.maximum
          ? computeDatatypeDuration(datatype.maximum, format)
          : undefined,
      };
    }

    case VariableDTODatatypeTypename.Numeric:
      return {
        typeName: DatatypeType.Numeric,
        minimum: datatype.minimum,
        maximum: datatype.maximum,
        decimals: datatype.decimals,
        isDynamicUnit: datatype.isDynamicUnit,
        unit: datatype.unit,
      };

    case VariableDTODatatypeTypename.Text:
      return {
        typeName: DatatypeType.Text,
        maxLength: datatype.maxLength,
      };

    default:
      throw new Error('Unsupported datatype');
  }
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

/**
 * Compute variable in the Pogues API format (remove Date, compute minimum /
 * maximum, and set enum value).
 */
export function computeVariableDTO(variable: Variable): VariableDTO {
  const datatypeDTO = computeDatatypeDTO(variable.datatype);

  const variableDTO: VariableDTO = {
    id: variable.id,
    name: variable.name,
    description: variable.description,
    type: computeVariableTypeDTO(variable.type),
    scope: variable.scope,
    datatype: datatypeDTO,
  };

  if (variable.type === VariableType.Calculated) {
    variableDTO.formula = variable.formula;
  }

  return variableDTO;
}

function computeVariableTypeDTO(type: VariableType): VariableDTOType {
  switch (type) {
    case VariableType.Collected:
      return VariableDTOType.Collected;
    case VariableType.Calculated:
      return VariableDTOType.Calculated;
    case VariableType.External:
      return VariableDTOType.External;
    default:
      throw new Error('Unknown variable type');
  }
}

function computeDatatypeDTO(datatype: DataType): VariableDTO['datatype'] {
  switch (datatype.typeName) {
    case DatatypeType.Boolean:
      return { typeName: VariableDTODatatypeTypename.Boolean };

    case DatatypeType.Date: {
      return {
        typeName: VariableDTODatatypeTypename.Date,
        format: computeDateDatatypeDTOFormat(datatype.format),
        minimum: datatype.minimum
          ? computeDateDatatypeDTOBounds(datatype.minimum, datatype.format)
          : undefined,
        maximum: datatype.maximum
          ? computeDateDatatypeDTOBounds(datatype.maximum, datatype.format)
          : undefined,
      };
    }

    case DatatypeType.Duration:
      return {
        typeName: VariableDTODatatypeTypename.Duration,
        format: computeDurationDatatypeDTOFormat(datatype.format),
        minimum: datatype.minimum
          ? computeDurationDatatypeDTOBounds(datatype.minimum, datatype.format)
          : '',
        maximum: datatype.maximum
          ? computeDurationDatatypeDTOBounds(datatype.maximum, datatype.format)
          : '',
      };

    case DatatypeType.Numeric:
      return {
        typeName: VariableDTODatatypeTypename.Numeric,
        minimum: datatype.minimum,
        maximum: datatype.maximum,
        decimals: datatype.decimals,
        isDynamicUnit: datatype.isDynamicUnit,
        unit: datatype.unit,
      };

    case DatatypeType.Text:
      return {
        typeName: VariableDTODatatypeTypename.Text,
        maxLength: datatype.maxLength,
      };

    default:
      throw new Error('Unsupported datatype');
  }
}

function computeDateDatatypeDTOFormat(
  format?: DateFormat,
): VariableDTODatatypeFormat {
  switch (format) {
    case DateFormat.Year:
      return VariableDTODatatypeFormat.DateYear;
    case DateFormat.YearMonth:
      return VariableDTODatatypeFormat.DateYearMonth;
    case DateFormat.YearMonthDay:
      return VariableDTODatatypeFormat.DateYearMonthDay;
    default:
      throw new Error('Unknown date datatype format');
  }
}

function computeDurationDatatypeDTOFormat(
  format?: DurationFormat,
): VariableDTODatatypeFormat {
  switch (format) {
    case DurationFormat.YearMonth:
      return VariableDTODatatypeFormat.DurationYearMonth;
    case DurationFormat.HourMinute:
      return VariableDTODatatypeFormat.DurationHourMinute;
    default:
      throw new Error('Unknown duration datatype format');
  }
}

function computeDurationDatatypeDTOBounds(
  bounds: YearMonthDuration | HourMinuteDuration,
  format: DurationFormat,
): string {
  switch (format) {
    case DurationFormat.HourMinute: {
      const HourMinuteBounds = bounds as HourMinuteDuration;
      return `PT${HourMinuteBounds.hours}H${HourMinuteBounds.minutes}M`;
    }
    case DurationFormat.YearMonth: {
      const yearMonthBounds = bounds as YearMonthDuration;
      return `P${yearMonthBounds.years}Y${yearMonthBounds.months}M`;
    }
    default:
      throw new Error('Unsupported duration format');
  }
}

function computeDateDatatypeDTOBounds(date: Date, format: DateFormat): string {
  switch (format) {
    case DateFormat.Year: {
      return dayjs(date).format('YYYY');
    }
    case DateFormat.YearMonth: {
      return dayjs(date).format('YYYY-MM');
    }
    case DateFormat.YearMonthDay: {
      return dayjs(date).format('YYYY-MM-DD');
    }
    default:
      throw new Error('Unsupported date format');
  }
}
