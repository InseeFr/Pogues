import checkerMissingStatisticalContext from './checker-missing-statistical-context';
import { INTEGRITY_TYPES } from 'constants/pogues-constants';

describe('checkerMissingStatisticalContext', () => {
  it('should return an empty array', () => {
    const input = {
      appState: {
        activeQuestionnaire: {
          id: '1',
          serie: 'idSerie',
          operation: 'idOperation',
          campaigns: ['idCampaign'],
        },
      },
    };
    const output = {
      1: {
        [INTEGRITY_TYPES.MISSING_STATISTICAL_CONTEXT]: [],
      },
    };
    expect(checkerMissingStatisticalContext(input)).toEqual(output);
  });
  it('should return an array with all errors', () => {
    const input = {
      appState: {
        activeQuestionnaire: {
          id: '1',
          serie: 'idSerie',
          operation: 'idOperation',
          campaigns: [''],
        },
      },
    };
    const output = {
      1: {
        [INTEGRITY_TYPES.MISSING_STATISTICAL_CONTEXT]: [
          {
            message: `The serie, the study unit or the data collection is missing`,
          },
        ],
      },
    };
    expect(checkerMissingStatisticalContext(input)).toEqual(output);
  });
});
