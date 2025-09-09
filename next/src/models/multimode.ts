import type { MultimodeDTO, MultimodeRuleDTO } from '@/api/models/multimodeDTO';

/** The multimode IS_MOVED rule will be triggered when these formula are true. */
export type MultimodeIsMovedRules = {
  /** VTL formula that trigger the IS_MOVED rule from questionnaire variables. */
  questionnaireFormula?: string;
  /** VTL formula that trigger the IS_MOVED rule from roundabout variables. */
  leafFormula?: string;
};

export type Multimode = MultimodeDTO;
export type MultimodeRule = MultimodeRuleDTO;
