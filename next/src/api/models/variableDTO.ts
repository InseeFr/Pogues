/** Model of the variable returned by the Pogues API's variables endpoint. */
export type VariableDTO = {
  id: string;
  name: string;
  description?: string;
  scope?: string;
  datatype:
    | {
        typeName: VariableDTODatatypeTypename.Boolean;
      }
    | {
        typeName: VariableDTODatatypeTypename.Date;
        format: VariableDTODatatypeFormat;
        minimum?: string;
        maximum?: string;
      }
    | {
        typeName: VariableDTODatatypeTypename.Duration;
        format: VariableDTODatatypeFormat;
        minimum?: string;
        maximum?: string;
      }
    | {
        typeName: VariableDTODatatypeTypename.Numeric;
        minimum?: number;
        maximum?: number;
        decimals?: number;
        isDynamicUnit?: boolean;
        unit?: string;
      }
    | {
        typeName: VariableDTODatatypeTypename.Text;
        maxLength?: number;
      };
} & (
  | {
      type: VariableDTOType.Calculated;
      formula?: string;
    }
  | { type: VariableDTOType.External; isDeletedOnReset?: boolean }
  | { type: VariableDTOType.Collected }
);

export enum VariableDTOType {
  Collected = 'COLLECTED',
  Calculated = 'CALCULATED',
  External = 'EXTERNAL',
}

export enum VariableDTODatatypeTypename {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Duration = 'DURATION',
  Numeric = 'NUMERIC',
  Text = 'TEXT',
}

export enum VariableDTODatatypeFormat {
  DateYear = 'YYYY',
  DateYearMonth = 'YYYY-MM',
  DateYearMonthDay = 'YYYY-MM-DD',
  DurationYearMonth = 'PnYnM',
  DurationHourMinute = 'PTnHnM',
}
