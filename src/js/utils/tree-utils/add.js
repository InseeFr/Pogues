import { COMPONENT_TYPE } from '../../constants/pogues-constants'
const { QUESTION, SEQUENCE } = COMPONENT_TYPE

/**
 * Append a component to a sequence
 *
 * This function takes care of adding its `id` at the right position in the
 * child components of a sequence upper in the hierarchy, and add the component
 * in the newly created dictionary of components (the component to add is not
 * supposed to be already present in the cmpnts).
 *
 * It takes care of unconsistencies about depth (for instance, adding a question
 * at depth `3` when there is no opened sequence) by ignoring the operation (by
 * returning { parentId: undefined })
 *
 * `cmpnts` will not be modifed, so we do not need to make a copy of it before
 * calling this function.
 *
 * @param  {string} main   id of the main sequence
 * @param  {object} cmpnt  the component to append
 * @param  {object} cmpnts dictionary with all the components
 * @param  {number} depth  where to add the component
 * @return {object}        a dictionary with all the components after the update
 */
export function appendComponent(main, cmpnt, cmpnts, depth) {
  let parentId, grandParentId

  //We append to the main sequence. We are looking for the right parent
  //sequence based on depth.
  switch (depth) {
    case 1:
      // only a sequence can be created at the root of the questionnaire
      if (cmpnt.type === SEQUENCE) parentId = main
      break;
    case 2:
      // If there is an opened sequence in main, we append to this sequence. If
      // not, we append to the main sequence.
      parentId = cmpnts[main].childCmpnts.slice(-1).pop()
      // We cannot create at depth 2 if there is no opened sequence
      if (!parentId || cmpnts[parentId].type !== SEQUENCE) parentId = undefined
      break;
    case 3:
      // Only a question can have a depth of 3. It there is no grand parent and
      // parent for this question, do nothing
      if (cmpnt.type === QUESTION) {
        grandParentId = cmpnts[main].childCmpnts.slice(-1).pop()
        if (grandParentId && cmpnts[grandParentId].type === SEQUENCE) {
          parentId = cmpnts[grandParentId].childCmpnts.slice(-1).pop()
          if (!parentId || cmpnts[parentId].type !== SEQUENCE)
            parentId = undefined
        }
      }
  }
  if (!parentId) return {
    parentId: undefined
  }
  const parent = cmpnts[parentId]
  return {
    parentId,
    childCmpnts: [...parent.childCmpnts, cmpnt.id]
  }
}
