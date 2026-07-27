import { FlowLogics } from '@/models/questionnaires'

import { FlowLogicEnum } from '../models/poguesModel'

export function computeFlowLogic(
  flowLogic?: FlowLogicEnum,
): FlowLogics | undefined {
  switch (flowLogic) {
    case FlowLogicEnum.Redirection:
      return FlowLogics.Redirection
    case FlowLogicEnum.Filter:
      return FlowLogics.Filter
    default:
      return undefined
  }
}

export function computePoguesFlowLogic(flowLogic?: FlowLogics): FlowLogicEnum {
  switch (flowLogic) {
    case FlowLogics.Redirection:
      return FlowLogicEnum.Redirection
    case FlowLogics.Filter:
    default:
      return FlowLogicEnum.Filter
  }
}
