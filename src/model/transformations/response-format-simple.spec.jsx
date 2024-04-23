import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DATATYPE_NAME } from '../../constants/pogues-constants';
import * as Response from './response';
import { remoteToState, stateToRemote } from './response-format-simple';

describe('redirection transformation', () => {
  describe('remoteToState', () => {
    it('should return the state representation of an redirection', () => {
      expect(
        remoteToState({
          responses: [
            {
              Datatype: {
                typeName: 'typeName',
                MaxLength: 'maxLength',
                Pattern: 'pattern',
                Minimum: 'minimum',
                Maximum: 'maximum',
                Decimals: 'decimals',
                Unit: 'unit',
                Format: 'format',
              },
              mandatory: true,
              id: '1',
            },
          ],
        }),
      ).toEqual({
        mandatory: true,
        id: '1',
        type: 'typeName',
        typeName: {
          maxLength: 'maxLength',
          pattern: 'pattern',
          minimum: 'minimum',
          maximum: 'maximum',
          decimals: 'decimals',
          unit: 'unit',
          format: 'format',
        },
      });
    });

    it('should return miyears, mimonths, mayears, and mamonths from minimum and maximum if type name Duration and format PnYnM', () => {
      expect(
        remoteToState({
          responses: [
            {
              Datatype: {
                Format: 'PnYnM',
                Maximum: 'P2Y2M',
                Minimum: 'P2Y2M',
                type: 'DurationDatatypeType',
                typeName: 'DURATION',
              },
              mandatory: true,
              id: '1',
            },
          ],
        }),
      ).toEqual({
        mandatory: true,
        id: '1',
        type: 'DURATION',
        DURATION: {
          minimum: 'P2Y2M',
          maximum: 'P2Y2M',
          miyears: '2',
          mimonths: '2',
          mayears: '2',
          mamonths: '2',
          format: 'PnYnM',
        },
      });
    });

    it('should return mihundhours, mihundredths, mahundhours, and mahundredths from minimum and maximum if type name Duration and format HH:CH', () => {
      expect(
        remoteToState({
          responses: [
            {
              Datatype: {
                Format: 'HH:CH',
                Maximum: '02:00',
                Minimum: '00:02',
                type: 'DurationDatatypeType',
                typeName: 'DURATION',
              },
              mandatory: true,
              id: '1',
            },
          ],
        }),
      ).toEqual({
        mandatory: true,
        id: '1',
        type: 'DURATION',
        DURATION: {
          minimum: '00:02',
          maximum: '02:00',
          mihundhours: '0',
          mihundredths: '2',
          mahundhours: '2',
          mahundredths: '0',
          format: 'HH:CH',
        },
      });
    });

    it('should return maminutes = "" if type name Duration and format PTnHnM and maminutes = 0', () => {
      expect(
        remoteToState({
          responses: [
            {
              Datatype: {
                Format: 'PTnHnM',
                Maximum: 'PT2H0M',
                Minimum: 'PT1H1M',
                type: 'DurationDatatypeType',
                typeName: 'DURATION',
              },
              mandatory: true,
              id: '1',
            },
          ],
        }),
      ).toEqual({
        mandatory: true,
        id: '1',
        type: 'DURATION',
        DURATION: {
          format: 'PTnHnM',
          mahours: '2',
          maminutes: '',
          maximum: 'PT2H0M',
          mihours: '1',
          miminutes: '1',
          minimum: 'PT1H1M',
        },
      });
    });

    it('should return mahundhours = "0" if type name Duration and format HH:CH and mahundhours = 0', () => {
      expect(
        remoteToState({
          responses: [
            {
              Datatype: {
                Format: 'HH:CH',
                Maximum: '00:02',
                Minimum: '00:01',
                type: 'DurationDatatypeType',
                typeName: 'DURATION',
              },
              mandatory: true,
              id: '1',
            },
          ],
        }),
      ).toEqual({
        mandatory: true,
        id: '1',
        type: 'DURATION',
        DURATION: {
          format: 'HH:CH',
          mahundhours: '0',
          mahundredths: '2',
          maximum: '00:02',
          mihundhours: '0',
          mihundredths: '1',
          minimum: '00:01',
        },
      });
    });

    it('should return an empty datatype if all datas are undefined', () => {
      expect(
        remoteToState({
          responses: [
            {
              Datatype: {
                typeName: 'typeName',
              },
              mandatory: true,
              id: '1',
            },
          ],
        }),
      ).toEqual({
        mandatory: true,
        id: '1',
        type: 'typeName',
        typeName: {},
      });
    });
  });
  describe('stateToRemote', () => {
    beforeEach(() => {
      const responseStateToRemote = vi.fn();
      Response.stateToRemote = responseStateToRemote;
      Response.stateToRemote.mockReturnValueOnce({ id: '2' });
    });

    afterEach(() => {
      Response.stateToRemote.mockReset();
    });

    it('should return the remote representation of a simple response', () => {
      const result = stateToRemote(
        {
          id: '2',
          mandatory: true,
          type: 'typeName',
          typeName: { minimum: 1, maximum: 2 },
        },
        [{ id: '1' }],
      );
      expect(result).toEqual({ Response: [{ id: '2' }] });
      expect(Response.stateToRemote).toHaveBeenCalledWith({
        minimum: 1,
        maximum: 2,
        id: '2',
        mandatory: true,
        typeName: 'typeName',
        collectedVariable: { id: '1' },
      });
    });

    describe('DURATION format', () => {
      it('should return the remote representation for the PnYnM format', () => {
        const result = stateToRemote(
          {
            id: '2',
            mandatory: true,
            type: DATATYPE_NAME.DURATION,

            [DATATYPE_NAME.DURATION]: {
              miyears: 1,
              mimonths: '',
              mayears: 3,
              mamonths: 4,
              format: 'PnYnM',
            },
          },
          [{ id: '1' }],
        );
        expect(result).toEqual({ Response: [{ id: '2' }] });
        expect(Response.stateToRemote).toHaveBeenCalledWith({
          maximum: 'P3Y4M',
          minimum: 'P1Y0M',
          format: 'PnYnM',
          id: '2',
          mandatory: true,
          typeName: DATATYPE_NAME.DURATION,
          collectedVariable: { id: '1' },
        });
      });
      it('should return the remote representation for the PTnHnM format', () => {
        const result = stateToRemote(
          {
            id: '2',
            mandatory: true,
            type: DATATYPE_NAME.DURATION,

            [DATATYPE_NAME.DURATION]: {
              mihours: 1,
              miminutes: 2,
              mahours: 3,
              maminutes: 4,
              format: 'PTnHnM',
            },
          },
          [{ id: '1' }],
        );
        expect(result).toEqual({ Response: [{ id: '2' }] });
        expect(Response.stateToRemote).toHaveBeenCalledWith({
          maximum: 'PT3H4M',
          minimum: 'PT1H2M',
          format: 'PTnHnM',
          id: '2',
          mandatory: true,
          typeName: DATATYPE_NAME.DURATION,
          collectedVariable: { id: '1' },
        });
      });

      it('should return the remote representation for the HH:CH format', () => {
        const result = stateToRemote(
          {
            id: '2',
            mandatory: true,
            type: DATATYPE_NAME.DURATION,

            [DATATYPE_NAME.DURATION]: {
              mihundhours: 0,
              mihundredths: 2,
              mahundhours: 3,
              mahundredths: 4,
              format: 'HH:CH',
            },
          },
          [{ id: '1' }],
        );
        expect(result).toEqual({ Response: [{ id: '2' }] });
        expect(Response.stateToRemote).toHaveBeenCalledWith({
          maximum: '03:04',
          minimum: '00:02',
          format: 'HH:CH',
          id: '2',
          mandatory: true,
          typeName: DATATYPE_NAME.DURATION,
          collectedVariable: { id: '1' },
        });
      });

      it('should remove the minimum and maximum if the mihours and miminutes are empty or mahours and maminutes are empty', () => {
        const result = stateToRemote(
          {
            id: '2',
            mandatory: true,
            type: DATATYPE_NAME.DURATION,

            [DATATYPE_NAME.DURATION]: {
              mihours: '',
              miminutes: '',
              mahours: '',
              maminutes: '',
              format: 'PTnHnM',
            },
          },
          [{ id: '3' }],
        );
        expect(result).toEqual({ Response: [{ id: '2' }] });
        expect(Response.stateToRemote).toHaveBeenCalledWith({
          format: 'PTnHnM',
          id: '2',
          mandatory: true,
          typeName: DATATYPE_NAME.DURATION,
          collectedVariable: { id: '3' },
        });
      });
    });

    it('should remove the minimum and maximum if the mihundhours and mihundredths are empty or mahundhours and mahundredths are empty', () => {
      const result = stateToRemote(
        {
          id: '2',
          mandatory: true,
          type: DATATYPE_NAME.DURATION,

          [DATATYPE_NAME.DURATION]: {
            mihundhours: '',
            mihundredths: '',
            mahundhours: '',
            mahundredths: '',
            format: 'HH:CH',
          },
        },
        [{ id: '3' }],
      );
      expect(result).toEqual({ Response: [{ id: '2' }] });
      expect(Response.stateToRemote).toHaveBeenCalledWith({
        format: 'HH:CH',
        id: '2',
        mandatory: true,
        typeName: DATATYPE_NAME.DURATION,
        collectedVariable: { id: '3' },
      });
    });

    describe('DATE format', () => {
      it('should remove the minimum and maximum if the typeName is a DATE and if they are empty', () => {
        const result = stateToRemote(
          {
            id: '2',
            mandatory: true,
            type: DATATYPE_NAME.DATE,

            [DATATYPE_NAME.DATE]: { minimum: '', maximum: '', format: '2000' },
          },
          [{ id: '1' }],
        );
        expect(result).toEqual({ Response: [{ id: '2' }] });
        expect(Response.stateToRemote).toHaveBeenCalledWith({
          format: '2000',
          id: '2',
          mandatory: true,
          typeName: DATATYPE_NAME.DATE,
          collectedVariable: { id: '1' },
        });
      });

      it('should not remove the minimum and maximum if the typeName is a DATE and if the format is not empty', () => {
        const result = stateToRemote(
          {
            id: '2',
            mandatory: true,
            type: DATATYPE_NAME.DATE,
            [DATATYPE_NAME.DATE]: { minimum: 1, maximum: 2, format: '2000' },
          },
          [{ id: '1' }],
        );
        expect(result).toEqual({ Response: [{ id: '2' }] });
        expect(Response.stateToRemote).toHaveBeenCalledWith({
          minimum: 1,
          maximum: 2,
          format: '2000',
          id: '2',
          mandatory: true,
          typeName: DATATYPE_NAME.DATE,
          collectedVariable: { id: '1' },
        });
      });
    });
  });
});
