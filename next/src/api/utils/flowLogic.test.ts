import { FlowLogics } from '@/models/questionnaires';

import { FlowLogicEnum } from '../models/pogues';
import { computePoguesFlowLogic } from './flowLogic';

describe('computePoguesFlowLogic', () => {
  it.each([
    [FlowLogics.Filter, FlowLogicEnum.Filter],
    [FlowLogics.Redirection, FlowLogicEnum.Redirection],
  ])('%s -> %s', (input, expected) => {
    expect(computePoguesFlowLogic(input)).toEqual(expected);
  });

  it('works with default', () => {
    expect(computePoguesFlowLogic()).toEqual(FlowLogicEnum.Filter);
  });
});
