import { remoteToState, stateToRemote } from './response-format-simple';
import * as Response from './response';
import { DATATYPE_NAME } from 'constants/pogues-constants';

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

    it('should return an NUMBER datatype if it is a duration', () => {
      expect(
        remoteToState({
          responses: [
            {
              CollectedVariableReference: 'k10ot762',
              Datatype: {
                Decimals: '3',
                Maximum: '2',
                Minimum: '1',
                Unit: 'http://id.insee.fr/unit/mois',
                typeName: 'DURATION',
              },
              id: '1',
              mandatory: false,
            },
          ],
        }),
      ).toEqual({
        NUMERIC: {
          minimum: '1',
          maximum: '2',
          decimals: '3',
          unit: 'http://id.insee.fr/unit/mois',
        },
        mandatory: false,
        id: '1',
        type: 'NUMERIC',
      });
    });
  });
  describe('stateToRemote', () => {
    beforeEach(() => {
      Response.stateToRemote = jest.fn();
      Response.stateToRemote.mockReturnValueOnce({ id: '2' });
    });

    afterEach(() => {
      Response.stateToRemote.mockClear();
    });

    it('should return the remote representation of an redirection   ', () => {
      const result = stateToRemote(
        {
          id: '2',
          mandatory: true,
          type: 'typeName',
          typeName: { typeObject: true },
        },
        [{ id: '1' }],
      );
      expect(result).toEqual({ Response: [{ id: '2' }] });
      expect(Response.stateToRemote).toHaveBeenCalledWith({
        typeObject: true,
        id: '2',
        mandatory: true,
        typeName: 'typeName',
        collectedVariable: { id: '1' },
      });
    });

    it('should return a Datatype.DURATION if the unit is month', () => {
      const state = {
        NUMERIC: {
          minimum: '1',
          maximum: '2',
          decimals: '3',
          unit: 'http://id.insee.fr/unit/mois',
        },
        mandatory: false,
        id: '1',
        type: 'NUMERIC',
      };
      stateToRemote(state, [{ id: '1' }]);

      expect(Response.stateToRemote).toHaveBeenCalledWith({
        minimum: '1',
        maximum: '2',
        decimals: '3',
        unit: 'http://id.insee.fr/unit/mois',
        id: '1',
        mandatory: false,
        typeName: DATATYPE_NAME.DURATION,
        collectedVariable: { id: '1' },
      });
    });
  });
});
