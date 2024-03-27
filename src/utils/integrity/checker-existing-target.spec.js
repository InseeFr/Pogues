import checkerExistingTarget from './checker-existing-target';
import { INTEGRITY_TYPES } from '../../constants/pogues-constants';

describe('checkerExistingTarget', () => {
  it('should return an empty array', () => {
    const input = {
      appState: {
        activeComponentsById: {
          1: { name: 'question1', redirections: {} },
          2: { name: 'question', redirections: {} },
        },
        activeQuestionnaire: {
          id: '1',
        },
      },
    };
    const output = {
      1: {
        [INTEGRITY_TYPES.NOT_EXISTING_TARGET]: [],
      },
    };
    expect(checkerExistingTarget(input)).toEqual(output);
  });
  it('should return an array with all errors', () => {
    const input = {
      appState: {
        activeComponentsById: {
          1: {
            name: 'question1',
            redirections: {
              j6p6my1d: {
                cible: 'j3343clt',
                condition: "$READY != '1'",
                id: 'j6p6my1d',
                label: 'Cible1',
              },
            },
          },
          2: { name: 'question', redirections: {} },
        },
        activeQuestionnaire: {
          id: '1',
        },
      },
    };
    const output = {
      1: {
        [INTEGRITY_TYPES.NOT_EXISTING_TARGET]: [
          {
            message: `The following targets of redirections don't exist for the questionnaire : Cible1`,
          },
        ],
      },
    };
    expect(checkerExistingTarget(input)).toEqual(output);
  });
});
