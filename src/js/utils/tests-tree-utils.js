/**
 * Utility functions to experiment with tree like structures
 */

const levels = []
const QUESTION = 'QUESTION'
const SEQUENCE = 'SEQUENCE'


/**
 * Create a tree from an array of strings
 *
 *  Each string represents a component. Indentation indicates the parent/child
 *  relationship. A component can be a question or a sequence. Both have an
 *  `id` and a `label`. Sequences have a `childCmpnts` entry (an array with the
 *  children of the sequence).
 *
 * It returns the main sequence of the questionnaire, with `root` as `id`
 *
 * @param  {array} arr  array of strings that represent components
 * @return {object}     the main sequence of the questionnaire
 */
function createTree(arr) {
  const root = { id: 'root', label: 'root', childCmpnts: [], type: SEQUENCE }
  const path = [root]
  arr.forEach(child => {
    let _nb = nbLeadingSpaces(child)
    //let rawNameArr = child.trim().match(/^([q-s]?)(?:\/([^\/\n]*))*/)
    let rawNameArr = child.trim().split('/')
    //if (rawNameArr.length !==3) console.error('wrong data')
    let type = rawNameArr[0] === 'q' ? QUESTION : SEQUENCE
    let id = rawNameArr[1]
    let label = rawNameArr[2]
    let current = { id, label, type }
    if (type === SEQUENCE) current.childCmpnts = []
    let delta = _nb - path.length + 1
    if (delta > 0) console.error('wrong data')
    if (delta < 0) path.splice(delta)
    path[path.length - 1].childCmpnts.push(current)
    path.push(current)
  })
  return path[0]
}

/**
 * Creates a dictionary with all the components of the questionnaire
 *
 * It takes a sequence, and recursively extracts each component to replace it
 * with its `id`, in order to build a database like representation of the
 * questionnaire.
 *
 * @param  {object} tree      sequence which serves as an entry point
 * @param  {object} cmpnts    dictionary with all the components within the
 *                            questionnaire at this point
 * @return {object}           dictionary with all teh components within the
 *                            questionnaire
 */
function normalizeTree(tree, cmpnts={}) {
  cmpnts[tree.id] = {
    ...tree,
  }
  if (tree.type === SEQUENCE) {
    cmpnts[tree.id].childCmpnts = tree.childCmpnts.map(child => {
      normalizeTree(child, cmpnts)
      return child.id
    })
  }
  return cmpnts
}

let r = /^\s+/g
function nbLeadingSpaces(str) {
  let hasLeadingSpaces = str.match(r)
  return hasLeadingSpaces ? hasLeadingSpaces[0].length : 0
}
/**
 * Creates a questionnaire from a string representation
 *
 * It takes a string representation of the questionnaire :
 * ([s|q]/id/name/(goto)*\n)*
 * (`q` indicates a question, `s` indicates a sequence, indentation indicates
 * the parent/child relationship, goto indicates the `id` of the target
 * referenced by the goTo)
 *
 * Example:
 * s/SEQ1/Séquence sur le thème 1
 *  q/Q11/Plutôt 1a ou 1b ?/SSEQ1A/SSEQ1B
 *  s/SSEQ1A/Sous-séquence sur le sujet 1a
 *  s/SSEQ1B/Sous-séquence sur le sujet 1b
 *   q/Q1B1/Est-ce que 1b1 ?
 *   q/Q1B2/Est-ce que 1b2 ?
 *  s/SSEQ1C/Sous-séquence sur le sujet 1c (...)
 *
 * @param  {string} txt a string representation of the questionnaire
 * @return {object}     a questionnaire object
 */
export function createQuestionnaireFromText(txt) {
  // remove empty lines
  return normalizeTree(createTree(txt.split('\n').filter(s => s)))
}

/**
 * Deep comparison of objects
 *
 *
 * @param  {object} obj1 reference object
 * @param  {object} obj2 object for comparison
 * @return {array}       differences between `obj1` and `obj2`
 */
export function compareObjects(obj1, obj2) {
  function complexCompare(obj1, obj2, path, differences) {
    const sharedKeys =[]
    const nonSharedKeys = []
    // compare keys
    const keys1 = Object.keys(obj1).sort()
    const keys2 = Object.keys(obj2).sort()

    let i1 = 0
    let l1 = keys1.length
    let i2 = 0
    let l2 = keys2.length
    while (i1 < l1 || i2 < l2) {
      if (i1 >= l1) differences.push({
          error: 'KEY_DIFF',
          key: keys2[i2++],
          path,
          missing: 'left',
          obj1,
          obj2
        })
      else if (i2 >= l2) differences.push({
          error: 'KEY_DIFF',
          key: keys1[i1++],
          path,
          missing: 'right',
          obj1,
          obj2
        })
      else if (keys1[i1] === keys2[i2]) {
        sharedKeys.push(keys1[i1])
        i1++
        i2++
      }
      else {
        if (keys1[i1] < keys2[i2]) differences.push({
          error: 'KEY_DIFF',
          key: keys1[i1++],
          path,
          missing: 'right',
          obj1,
          obj2
        })
        else differences.push({
          error: 'KEY_DIFF',
          key: keys2[i2++],
          path,
          missing: 'left',
          obj1,
          obj2
        })
      }
    }
    // compare values
    sharedKeys.forEach(k => diff(obj1[k], obj2[k], path + '.' + k, differences))
  }

  function primitiveCompare(obj1, obj2, path, differences) {
    if (obj1 !== obj2) differences.push({
      error: 'PRIMITIVE_DIFF',
      path,
      obj1,
      obj2
    })
  }

  function whichType(obj) {
    if (obj === null) return null
    if (Array.isArray(obj)) return 'array'
    else return typeof obj
  }

  function diff(obj1, obj2, path='', differences=[]) {
    const type1 = whichType(obj1)
    const type2 = whichType(obj2)
    if (type1 !== type2) {
      differences.push({
        error: 'TYPE_DIFF',
        path,
        type1,
        type2,
        obj1,
        obj2
      })
    }
    else {
      let compare
      if (type1 === 'array' || type1 === 'object') compare = complexCompare
      else compare = primitiveCompare
      compare(obj1, obj2, path, differences)
    }
    return differences
  }

  function printError(difference) {
    const { error, path, type1, type2, obj1, obj2, key, missing } = difference
    let objWith
    let objWithout
    switch (error) {
      case 'TYPE_DIFF':
        return `${error} - ${path} - ${type1} vs ${type2} - ${obj1} vs ${obj2}`
      case 'PRIMITIVE_DIFF':
        return `${error} - ${path} - ${obj1} vs ${obj2}`
      case 'KEY_DIFF':
        [objWith, objWithout] = missing === 'right' ? [obj1, obj2] : [obj2, obj1]
        return `${error} - ${path} - key ${key} missing in ${missing}`
    }
    return `${error} - ${path} - ${type1} vs ${type2} - ${obj1} vs ${obj2}`
  }
  console.error('differences: \n', diff(obj1, obj2).map(printError).join('\n'))

}
