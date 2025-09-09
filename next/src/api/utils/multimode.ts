import { type MultimodeIsMovedRules } from '@/models/multimode';

import {
  type MultimodeDTO,
  MultimodeRuleDTO,
  MultimodeRuleName,
} from '../models/multimodeDTO';

export function computeMultimodeIsMovedRules(
  multimodeDTO: MultimodeDTO,
): MultimodeIsMovedRules {
  const questionnaireFormula =
    multimodeDTO.questionnaire?.rules?.find(isRuleIsMoved)?.value;
  const leafFormula = multimodeDTO.leaf?.rules?.find(isRuleIsMoved)?.value;

  return {
    questionnaireFormula,
    leafFormula,
  };
}

function isRuleIsMoved(rule: MultimodeRuleDTO): boolean {
  return rule.name === MultimodeRuleName.isMoved;
}

export function computePoguesMultimodeFromIsMovedRules(
  isMovedRules: MultimodeIsMovedRules,
): MultimodeDTO {
  const res: MultimodeDTO = {};
  if (isMovedRules.questionnaireFormula) {
    res.questionnaire = {
      rules: [
        {
          name: MultimodeRuleName.isMoved,
          value: isMovedRules.questionnaireFormula,
        },
      ],
    };
  }
  if (isMovedRules.leafFormula) {
    res.leaf = {
      rules: [
        {
          name: MultimodeRuleName.isMoved,
          value: isMovedRules.leafFormula,
        },
      ],
    };
  }
  return res;
}
