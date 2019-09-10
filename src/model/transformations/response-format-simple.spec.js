import { remoteToState, stateToRemote } from './response-format-simple';
import * as Response from './response';

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
  });
  describe('stateToRemote', () => {
    it('should return the remote representation of an redirection   ', () => {
      Response.stateToRemote = jest.fn();
      Response.stateToRemote.mockReturnValueOnce({ id: '2' });
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
      Response.stateToRemote.mockClear();
    });
  });
});
