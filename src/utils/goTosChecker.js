import { flatten } from '../utils/data-utils'

const errorGoToNonExistingTgt = 'errorGoToNonExistingTgt'
const errorGoToUndefinedTgt = 'errorGoToUndefinedTgt'
const errorGoToEarlierTgt = 'errorGoToEarlierTgt'

export default function goTosChecker({
    componentById, goToById, appState: { questionnaire, questionnaireById }
  }) {

  if (!questionnaire || !questionnaireById[questionnaire].loaded) return []

  const {
    flat, idToRank, nameToId
  } = flatten(componentById, questionnaire)

  return flat.reduce((errors, { cmpnt }, rank) => {
    const { name } = cmpnt
    cmpnt.goTos.forEach(goToId => {
      const { ifTrue, ifTrueIsAName } = goToById[goToId]
      if (!ifTrue) errors.push({
        params: [name],
        message: errorGoToUndefinedTgt,
      })
      else if (ifTrueIsAName) {
        const id = nameToId[ifTrue]
        if (!id) {
          errors.push({
            params: [name],
            message: errorGoToNonExistingTgt
          })
        }
        else {
          if (idToRank[id] < rank) {
            errors.push({
              params: [name],
              message: errorGoToEarlierTgt
            })
          }
        }
      }
      else if (idToRank[ifTrue] < rank) {
        errors.push({
          params: [name],
          message: errorGoToEarlierTgt
        })
      }
    })
    return errors
  }, [])
}
