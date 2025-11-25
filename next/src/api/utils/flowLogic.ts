import { FlowLogics } from '@/models/questionnaires';

import { FlowLogicEnum } from '../models/poguesModel';

export function computePoguesFlowLogic(flowLogic?: FlowLogics): FlowLogicEnum {
  switch (flowLogic) {
    case FlowLogics.Redirection:
      return FlowLogicEnum.Redirection;
    case FlowLogics.Filter:
    default:
      return FlowLogicEnum.Filter;
  }
}
