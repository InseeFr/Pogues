import type { Loop } from '@/models/loops'

import type { LoopDTO } from '../models/loopDTO'

/** Compute loop that can be used in our app from API data. */
export function computeLoop(loopDTO: LoopDTO): Loop {
  const { id, name, initialMember, finalMember } = loopDTO
  const loop = { id, name, initialMember, finalMember }

  if (isBasedOn(loopDTO)) {
    return { ...loop, basedOn: loopDTO.basedOn, filter: loopDTO.filter }
  }

  if (loopDTO.isFixedLength) {
    return {
      ...loop,
      isFixedLength: true,
      size: loopDTO.size,
      shouldSplitIterations: loopDTO.shouldSplitIterations,
    }
  }

  return {
    ...loop,
    isFixedLength: false,
    minimum: loopDTO.minimum,
    maximum: loopDTO.maximum,
    addButtonLabel: loopDTO.addButtonLabel,
  }
}

/** Compute loop that can be sent to the API from our app data. */
export function computeLoopDTO(loop: Loop): LoopDTO {
  const { id, name, initialMember, finalMember } = loop
  const loopDTO = { id, name, initialMember, finalMember }

  if (isBasedOn(loop)) {
    return { ...loopDTO, basedOn: loop.basedOn, filter: loop.filter }
  }

  if (loop.isFixedLength) {
    return {
      ...loopDTO,
      isFixedLength: true,
      size: loop.size,
      shouldSplitIterations: loop.shouldSplitIterations,
    }
  }

  return {
    ...loopDTO,
    isFixedLength: false,
    minimum: loop.minimum,
    maximum: loop.maximum,
    addButtonLabel: loop.addButtonLabel,
  }
}

/**
 * Whether the loop repeats the occurrences of a scope.
 *
 * The value must be checked and not only the presence of the key: the form
 * values of a loop not based on a scope can hold an empty or undefined
 * `basedOn`.
 */
function isBasedOn<T extends Loop | LoopDTO>(
  loop: T,
): loop is Extract<T, { basedOn: string }> {
  return 'basedOn' in loop && !!loop.basedOn
}
