import { ValueTypeEnum } from './poguesModelTypeUtils'

/** @version 1.11.0 */
export type Multimode = {
  questionnaire?: Rules
  leaf?: Rules
}

/** @version 1.11.0 */
type Rules = {
  rules: Rule[]
}

/** @version 1.11.0 */
enum MultimodeRuleNameEnum {
  IsMoved = 'IS_MOVED',
  IsSplit = 'IS_SPLIT',
}

/** @version 1.11.0 */
type Rule = {
  name: MultimodeRuleNameEnum
  /** @efaultValue "number" */
  type?: ValueTypeEnum
  value: string
}
