import type { Loop } from '@/models/loops'

import type { LoopDTO } from '../models/loopDTO'

/** Compute loop that can be used in our app from API data. */
export function computeLoop(loopDTO: LoopDTO): Loop {
  const { id, name, initialMember, finalMember } = loopDTO
  const loop = { id, name, initialMember, finalMember }

  if ('basedOn' in loopDTO) {
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

  if ('basedOn' in loop) {
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
