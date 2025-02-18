import { TargetModes } from '@/models/questionnaires';

import { SurveyModeEnum } from '../models/pogues';
import { computePoguesTargetModes, computeTargetModes } from './targetModes';

describe('computeTargetModes', () => {
  it.each([
    [SurveyModeEnum.CAPI, TargetModes.CAPI],
    [SurveyModeEnum.CATI, TargetModes.CATI],
    [SurveyModeEnum.CAWI, TargetModes.CAWI],
    [SurveyModeEnum.PAPI, TargetModes.PAPI],
  ])('%s -> %s', (input, expected) => {
    expect(computeTargetModes([input])).toEqual(new Set([expected]));
  });

  it('works with default', () => {
    expect(computeTargetModes()).toEqual(new Set());
  });

  it('works with multiple target modes', () => {
    expect(
      computeTargetModes([SurveyModeEnum.CAPI, SurveyModeEnum.PAPI]),
    ).toEqual(new Set([TargetModes.CAPI, TargetModes.PAPI]));
  });
});

describe('computePoguesTargetModes', () => {
  it.each([
    [TargetModes.CAPI, SurveyModeEnum.CAPI],
    [TargetModes.CATI, SurveyModeEnum.CATI],
    [TargetModes.CAWI, SurveyModeEnum.CAWI],
    [TargetModes.PAPI, SurveyModeEnum.PAPI],
  ])('%s -> %s', (input, expected) => {
    expect(computePoguesTargetModes(new Set([input]))).toEqual([expected]);
  });

  it('works with default', () => {
    expect(computePoguesTargetModes()).toEqual([]);
  });

  it('works with multiple target modes', () => {
    expect(
      computePoguesTargetModes(new Set([TargetModes.CAPI, TargetModes.PAPI])),
    ).toEqual([SurveyModeEnum.CAPI, SurveyModeEnum.PAPI]);
  });
});
