import { COMPONENT_TYPE } from '../constants/pogues-constants'

const { QUESTION, SEQUENCE, GENERIC_INPUT } = COMPONENT_TYPE


// FIXME extract from uri found in res.header.Location
// FIXME use a regular expression to extract id from url. Example of uri :
// http://10.3.4.54:8338/exist/restxq/questionnaire/agence-enquete-QPO-DSFGFD

export const extractId = uri => uri.substr(uri.lastIndexOf('/') + 1)

export const  uuid = () => 
  (+new Date() + Math.floor(Math.random() * 999999)).toString(36)

export function flatten(register, main) {
  let rank = -1
  const idToRank = {}
  const labelToId = {}
  const idToLabel = {}
  const flat = []

  function flatten_(main, depth) {
    const cmpnt = register[main]
    const { type, label } = cmpnt
    idToRank[main] = ++rank
    idToLabel[main] = label
    //HACK `nameToId` should not have an entry for the main sequence
    // of the questionnaire (a questionnaire is a sequence, but for the end
    // user, it should not be offered as an option for operations like control
    // or goTo edition).
    if (rank > 0) labelToId[label] = main
    const k = { id: main, type, label, depth, start: rank }
    flat.push(k)
    if (type === SEQUENCE) {
      depth++
      cmpnt.childCmpnts.forEach(id => flatten_(id, depth))
    }
    k.end = rank
  }

  flatten_(main, 0)

  return {
    flat,
    idToRank,
    labelToId,
    idToLabel
  }
}

const r_ = /^_/
export function removeLeading_(obj) {
  if (obj && typeof obj === 'object') {
    if (Array.isArray(obj)) return obj.map(removeLeading_)
    else return Object.keys(obj).reduce((_, k) => {
      _[k.replace(r_, '')] = removeLeading_(obj[k])
      return _
    }, {})
  }
  else return obj
}

export function putLeading_(obj) {
  if (obj && typeof obj === 'object') {
    if (Array.isArray(obj)) return obj.map(putLeading_)
    return Object.keys(obj).reduce((_, k) => {
      _['_' + k] = putLeading_(obj[k])
      return _
    }, {})
  }
  else return obj
}