import { describe, expect, it } from 'vitest';

import { DatatypeType, DateFormat, DurationFormat } from '@/models/datatype';
import { VariableType } from '@/models/variables';

import {
  VariableDTO,
  VariableDTODatatypeFormat,
  VariableDTODatatypeTypename,
  VariableDTOType,
} from '../models/variableDTO';
import { computeVariable, computeVariableDTO } from './variables';

describe('computeVariable', () => {
  describe('text variable', () => {
    it('should compute a collected text variable correctly', () => {
      const variableDTO: VariableDTO = {
        type: VariableDTOType.Collected,
        id: 'mon-id',
        name: 'MA_VAR',
        description: 'Une variable collectée de type texte',
        datatype: { typeName: VariableDTODatatypeTypename.Text, maxLength: 42 },
        scope: 'mon-scope',
      };

      const result = computeVariable(variableDTO);
      expect(result).toEqual({
        type: VariableType.Collected,
        id: 'mon-id',
        name: 'MA_VAR',
        description: 'Une variable collectée de type texte',
        datatype: { typeName: DatatypeType.Text, maxLength: 42 },
        scope: 'mon-scope',
      });

      const resultDTO = computeVariableDTO(result);
      expect(resultDTO).toEqual(variableDTO);
    });

    it('should compute a Calculated text variable correctly', () => {
      const variableDTO: VariableDTO = {
        type: VariableDTOType.Calculated,
        id: 'mon-id',
        name: 'MA_VAR',
        description: 'Une variable calculée de type texte',
        datatype: { typeName: VariableDTODatatypeTypename.Text, maxLength: 42 },
        scope: 'mon-scope',
        formula: '1+2',
      };

      const result = computeVariable(variableDTO);
      expect(result).toEqual({
        type: VariableType.Calculated,
        id: 'mon-id',
        name: 'MA_VAR',
        description: 'Une variable calculée de type texte',
        datatype: { typeName: DatatypeType.Text, maxLength: 42 },
        scope: 'mon-scope',
        formula: '1+2',
      });

      const resultDTO = computeVariableDTO(result);
      expect(resultDTO).toEqual(variableDTO);
    });

    it('should compute an External text variable correctly', () => {
      const variableDTO: VariableDTO = {
        type: VariableDTOType.External,
        id: 'mon-id',
        name: 'MA_VAR',
        description: 'Une variable collectée de type texte',
        datatype: { typeName: VariableDTODatatypeTypename.Text, maxLength: 42 },
        scope: 'mon-scope',
      };

      const result = computeVariable(variableDTO);
      expect(result).toEqual({
        type: VariableType.External,
        id: 'mon-id',
        name: 'MA_VAR',
        description: 'Une variable collectée de type texte',
        datatype: { typeName: DatatypeType.Text, maxLength: 42 },
        scope: 'mon-scope',
      });

      const resultDTO = computeVariableDTO(result);
      expect(resultDTO).toEqual(variableDTO);
    });
  });

  it('should compute a Collected boolean variable correctly', () => {
    const variableDTO: VariableDTO = {
      type: VariableDTOType.Collected,
      id: 'mon-id',
      name: 'MA_VAR',
      description: 'Une variable collectée de type booléen',
      datatype: { typeName: VariableDTODatatypeTypename.Boolean },
    };

    const result = computeVariable(variableDTO);
    expect(result).toEqual({
      type: VariableType.Collected,
      id: 'mon-id',
      name: 'MA_VAR',
      description: 'Une variable collectée de type booléen',
      datatype: { typeName: DatatypeType.Boolean },
    });

    const resultDTO = computeVariableDTO(result);
    expect(resultDTO).toEqual(variableDTO);
  });

  describe('date variable', () => {
    it('should compute a Collected date variable with YearMonthDay format', () => {
      const variableDTO: VariableDTO = {
        type: VariableDTOType.Collected,
        id: 'mon-id',
        name: 'MA_VAR',
        description:
          'Une variable collectée de type date avec année, mois et jour',
        datatype: {
          typeName: VariableDTODatatypeTypename.Date,
          format: VariableDTODatatypeFormat.DateYearMonthDay,
          minimum: '1900-01-10',
          maximum: '2020-12-20',
        },
      };

      const result = computeVariable(variableDTO);
      expect(result).toEqual({
        type: VariableType.Collected,
        id: 'mon-id',
        name: 'MA_VAR',
        description:
          'Une variable collectée de type date avec année, mois et jour',
        datatype: {
          typeName: DatatypeType.Date,
          format: DateFormat.YearMonthDay,
          minimum: new Date('1900-01-10'),
          maximum: new Date('2020-12-20'),
        },
      });

      const resultDTO = computeVariableDTO(result);
      expect(resultDTO).toEqual(variableDTO);
    });

    it('should compute a Collected date variable with YearMonth format', () => {
      const variableDTO: VariableDTO = {
        type: VariableDTOType.Collected,
        id: 'mon-id',
        name: 'MA_VAR',
        description: 'Une variable collectée de type date avec année et mois',
        datatype: {
          typeName: VariableDTODatatypeTypename.Date,
          format: VariableDTODatatypeFormat.DateYearMonth,
          minimum: '1900-01',
          maximum: '2020-12',
        },
      };

      const result = computeVariable(variableDTO);
      expect(result).toEqual({
        type: VariableType.Collected,
        id: 'mon-id',
        name: 'MA_VAR',
        description: 'Une variable collectée de type date avec année et mois',
        datatype: {
          typeName: DatatypeType.Date,
          format: DateFormat.YearMonth,
          minimum: new Date('1900-01'),
          maximum: new Date('2020-12'),
        },
      });

      const resultDTO = computeVariableDTO(result);
      expect(resultDTO).toEqual(variableDTO);
    });

    it('should compute a Collected date variable with Year format', () => {
      const variableDTO: VariableDTO = {
        type: VariableDTOType.Collected,
        id: 'mon-id',
        name: 'MA_VAR',
        description: 'Une variable collectée de type date avec année',
        datatype: {
          typeName: VariableDTODatatypeTypename.Date,
          format: VariableDTODatatypeFormat.DateYear,
          minimum: '1900',
          maximum: '2020',
        },
      };

      const result = computeVariable(variableDTO);
      expect(result).toEqual({
        type: VariableType.Collected,
        id: 'mon-id',
        name: 'MA_VAR',
        description: 'Une variable collectée de type date avec année',
        datatype: {
          typeName: DatatypeType.Date,
          format: DateFormat.Year,
          minimum: new Date('1900'),
          maximum: new Date('2020'),
        },
      });

      const resultDTO = computeVariableDTO(result);
      expect(resultDTO).toEqual(variableDTO);
    });
  });

  describe('duration variable', () => {
    it('should compute a Collected duration variable with YearMonth format', () => {
      const variableDTO: VariableDTO = {
        type: VariableDTOType.Collected,
        id: 'mon-id',
        name: 'MA_VAR',
        description:
          'Une variable collectée de type duration avec années et mois',
        datatype: {
          typeName: VariableDTODatatypeTypename.Duration,
          format: VariableDTODatatypeFormat.DurationYearMonth,
          minimum: 'P1Y2M',
          maximum: 'P5Y6M',
        },
      };

      const result = computeVariable(variableDTO);
      expect(result).toEqual({
        type: VariableType.Collected,
        id: 'mon-id',
        name: 'MA_VAR',
        description:
          'Une variable collectée de type duration avec années et mois',
        datatype: {
          typeName: DatatypeType.Duration,
          format: DurationFormat.YearMonth,
          minimum: { years: 1, months: 2 },
          maximum: { years: 5, months: 6 },
        },
      });

      const resultDTO = computeVariableDTO(result);
      expect(resultDTO).toEqual(variableDTO);
    });

    it('should compute a Collected duration variable with HourMinute format', () => {
      const variableDTO: VariableDTO = {
        type: VariableDTOType.Collected,
        id: 'mon-id',
        name: 'MA_VAR',
        description:
          'Une variable collectée de type duration avec heures et minutes',
        datatype: {
          typeName: VariableDTODatatypeTypename.Duration,
          format: VariableDTODatatypeFormat.DurationHourMinute,
          minimum: 'PT1H2M',
          maximum: 'PT5H6M',
        },
      };

      const result = computeVariable(variableDTO);
      expect(result).toEqual({
        type: VariableType.Collected,
        id: 'mon-id',
        name: 'MA_VAR',
        description:
          'Une variable collectée de type duration avec heures et minutes',
        datatype: {
          typeName: DatatypeType.Duration,
          format: DurationFormat.HourMinute,
          minimum: { hours: 1, minutes: 2 },
          maximum: { hours: 5, minutes: 6 },
        },
      });

      const resultDTO = computeVariableDTO(result);
      expect(resultDTO).toEqual(variableDTO);
    });
  });

  describe('numeric variable', () => {
    it('should compute a Collected numeric variable correctly', () => {
      const variableDTO: VariableDTO = {
        type: VariableDTOType.Collected,
        id: 'mon-id',
        name: 'MA_VAR',
        description: 'Une variable collectée de type numérique',
        datatype: {
          typeName: VariableDTODatatypeTypename.Numeric,
          minimum: 1,
          maximum: 10,
          decimals: 2,
          isDynamicUnit: true,
          unit: '€',
        },
      };

      const result = computeVariable(variableDTO);
      expect(result).toEqual({
        type: VariableType.Collected,
        id: 'mon-id',
        name: 'MA_VAR',
        description: 'Une variable collectée de type numérique',
        datatype: {
          typeName: DatatypeType.Numeric,
          minimum: 1,
          maximum: 10,
          decimals: 2,
          isDynamicUnit: true,
          unit: '€',
        },
      });

      const resultDTO = computeVariableDTO(result);
      expect(resultDTO).toEqual(variableDTO);
    });
  });
});
