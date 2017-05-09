import { flatten, unflatten } from '../../utils/data-utils'

export function moveComponent(cmpntsById, qrId, origin, dest) {
  let { flat, idToRank } = flatten(cmpntsById, qrId)
  const rankOrigin = idToRank[origin]
  let rankDest = idToRank[dest]
  const { start, end } = flat[rankOrigin]
  const sizeOfOrigin = end-start+1
  // When we move up, we insert before `dest` ; when we move down, we insert after `dest`.
  if (rankDest > rankOrigin) rankDest = rankDest - sizeOfOrigin + 1
   // 1. `dest` is after origin => its rank will be impacted by the removal
   //  (- sizeOrigin) ;
   // 2. we move down within the questionnaire : in this situation, we insert
   //  after `dest` (+ 1).
  const removed = flat.splice(start, sizeOfOrigin)
  Array.prototype.splice.apply(flat, [rankDest, 0].concat(removed))
  return unflatten(flat)
}