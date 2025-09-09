import { MultimodeRuleName } from '../models/multimodeDTO';
import {
  computeMultimodeIsMovedRules,
  computePoguesMultimodeFromIsMovedRules,
} from './multimode';

describe('computeMultimodeIsMovedRules', () => {
  it('works with defined rules', () => {
    expect(
      computeMultimodeIsMovedRules({
        questionnaire: {
          rules: [{ name: MultimodeRuleName.isMoved, value: '1+2' }],
        },
        leaf: { rules: [{ name: MultimodeRuleName.isMoved, value: '3+4' }] },
      }),
    ).toEqual({
      questionnaireFormula: '1+2',
      leafFormula: '3+4',
    });
  });

  it('ignores other type of rules', () => {
    expect(
      computeMultimodeIsMovedRules({
        questionnaire: {
          rules: [{ name: MultimodeRuleName.isSplit, value: '1+2' }],
        },
        leaf: { rules: [{ name: MultimodeRuleName.isSplit, value: '3+4' }] },
      }),
    ).toEqual({});
  });

  it('works with default', () => {
    expect(computeMultimodeIsMovedRules({})).toEqual({});
  });
});

describe('computePoguesMultimodeFromIsMovedRules', () => {
  it('works with defined rules', () => {
    expect(
      computePoguesMultimodeFromIsMovedRules({
        questionnaireFormula: '1+2',
        leafFormula: '3+4',
      }),
    ).toEqual({
      questionnaire: {
        rules: [{ name: MultimodeRuleName.isMoved, value: '1+2' }],
      },
      leaf: { rules: [{ name: MultimodeRuleName.isMoved, value: '3+4' }] },
    });
  });

  it('works with default', () => {
    expect(computeMultimodeIsMovedRules({})).toEqual({});
  });
});
