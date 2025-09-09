/** Model of the multimode returned by the Pogues API's multimode endpoint. */
export type MultimodeDTO = {
  questionnaire?: {
    rules: MultimodeRuleDTO[];
  };
  leaf?: {
    rules: MultimodeRuleDTO[];
  };
};

export type MultimodeRuleDTO = {
  name: MultimodeRuleName;
  /** Formula in VTL. */
  value: string;
};

export enum MultimodeRuleName {
  isMoved = 'IS_MOVED',
  isSplit = 'IS_SPLIT',
}
