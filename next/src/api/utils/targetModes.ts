import { TargetModes } from '@/models/questionnaires';

import { SurveyModeEnum } from '../models/pogues';

export function computeTargetModes(
  targetModes: SurveyModeEnum[] = [],
): Set<TargetModes> {
  const res = new Set<TargetModes>();
  if (!targetModes) return res;

  for (const targetMode of targetModes) {
    switch (targetMode) {
      case SurveyModeEnum.CAWI:
        res.add(TargetModes.CAWI);
        break;
      case SurveyModeEnum.CAPI:
        res.add(TargetModes.CAPI);
        break;
      case SurveyModeEnum.CATI:
        res.add(TargetModes.CATI);
        break;
      case SurveyModeEnum.PAPI:
        res.add(TargetModes.PAPI);
        break;
    }
  }
  return res;
}

export function computePoguesTargetModes(
  targetModes: Set<TargetModes> = new Set(),
): SurveyModeEnum[] {
  const res: SurveyModeEnum[] = [];
  for (const targetMode of targetModes) {
    switch (targetMode) {
      case TargetModes.CAWI:
        res.push(SurveyModeEnum.CAWI);
        break;
      case TargetModes.CAPI:
        res.push(SurveyModeEnum.CAPI);
        break;
      case TargetModes.CATI:
        res.push(SurveyModeEnum.CATI);
        break;
      case TargetModes.PAPI:
        res.push(SurveyModeEnum.PAPI);
        break;
    }
  }
  return res;
}
