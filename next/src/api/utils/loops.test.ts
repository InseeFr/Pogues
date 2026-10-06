import { describe, expect, it } from 'vitest'

import type { Loop } from '@/models/loops'

import type { LoopDTO } from '../models/loopDTO'
import { computeLoop, computeLoopDTO } from './loops'

const cases: { label: string; loop: Loop }[] = [
  {
    label: 'based on a scope',
    loop: {
      id: 'my-loop',
      name: 'MY_LOOP',
      initialMember: 'S1',
      finalMember: 'S2',
      basedOn: 'my-scope',
      filter: '$AGE$ > 18',
    },
  },
  {
    label: 'with a fixed number of occurrences',
    loop: {
      id: 'my-loop',
      name: 'MY_LOOP',
      initialMember: 'S1',
      finalMember: 'S2',
      isFixedLength: true,
      size: '3',
      shouldSplitIterations: true,
    },
  },
  {
    label: 'with a dynamic number of occurrences',
    loop: {
      id: 'my-loop',
      name: 'MY_LOOP',
      initialMember: 'S1',
      finalMember: 'S2',
      isFixedLength: false,
      minimum: '1',
      maximum: '5',
      addButtonLabel: 'Add',
    },
  },
]

describe('computeLoop', () => {
  it.each(cases)('computes a loop $label', ({ loop }) => {
    const loopDTO = { ...loop } as LoopDTO
    expect(computeLoop(loopDTO)).toEqual(loop)
  })

  it('ignores properties of the other kinds of loop', () => {
    const loopDTO = {
      id: 'my-loop',
      name: 'MY_LOOP',
      initialMember: 'S1',
      finalMember: 'S2',
      basedOn: 'my-scope',
      minimum: '1',
    } as LoopDTO

    expect(computeLoop(loopDTO)).toEqual({
      id: 'my-loop',
      name: 'MY_LOOP',
      initialMember: 'S1',
      finalMember: 'S2',
      basedOn: 'my-scope',
    })
  })
})

describe('computeLoopDTO', () => {
  it.each(cases)('computes a loop $label', ({ loop }) => {
    expect(computeLoopDTO(loop)).toEqual(loop)
  })

  it.each([undefined, ''])(
    'computes a loop not based on a scope with basedOn: %j',
    (basedOn) => {
      const loop = {
        id: 'my-loop',
        name: 'MY_LOOP',
        initialMember: 'S1',
        finalMember: 'S1',
        basedOn,
        isFixedLength: true,
        size: '$NBHAB$',
        shouldSplitIterations: false,
      } as Loop

      expect(computeLoopDTO(loop)).toStrictEqual({
        id: 'my-loop',
        name: 'MY_LOOP',
        initialMember: 'S1',
        finalMember: 'S1',
        isFixedLength: true,
        size: '$NBHAB$',
        shouldSplitIterations: false,
      })
    },
  )
})
