import { flatten } from '../utils/data-utils'

const errorGoToNonExistingTgt = 'errorGoToNonExistingTgt'
const errorGoToUndefinedTgt = 'errorGoToUndefinedTgt'
const errorGoToEarlierTgt = 'errorGoToEarlierTgt'
const errorQuestionnaireTooShort = 'errorQuestionnaireTooShort'
/**
 * A checker analyzes the state and returns a list of error descriptions
 */

//TODO for now we use a closure to avoid unnecessary calls to flatten but the
//questionnaire structure should really be part of the main reducer (we should
//not have to process it) (we could also pass structure to all checkers, but
//we will try to avoid such boilerplate)
export default function (state) {

  const {
    componentById, goToById, appState: { questionnaire, questionnaireById }
  } = state

  if (!questionnaire || !questionnaireById[questionnaire].loaded) return []

  const { flat, idToRank, nameToId, idToName } =
    flatten(componentById, questionnaire)

  function nbQuestionsChecker() {
    if (flat.length < 3) return [{
      params: ['QUESTIONNAIRE'],
      message: errorQuestionnaireTooShort
    }]
    else return []
  }

  function goTosChecker() {
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

  return [nbQuestionsChecker, goTosChecker].reduce((errors, checker) => {
    const check = checker()
    return errors.concat(check)
  }, [] )

}


