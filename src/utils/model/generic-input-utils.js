import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE } = COMPONENT_TYPE;

// function getQuestionnaireComponentsKeys(component, questionnaireId) {
//   function findComponentsKeys(comps, parent, carry) {
//     Object.keys(comps)
//       .filter(key => {
//         return comps[key].parent === parent;
//       })
//       .forEach(key => {
//         carry.push
//       });
//   }
//   return findComponentsKeys(component, questionnaireId, []);
// }

export function getNewQuestionPlaceholder(components, questionnaireId) {
  if(!questionnaireId || !components[questionnaireId]) return;
  // const questionnaireComponentsKeys = getQuestionnaireComponentsKeys(component, questionnaireId);

  // const sequences = components[questionnaireId].children.filter(key => components[key].type === SEQUENCE);
  // const subsequences = sequences.reduce((carry, key) => {
  //   return [...carry, ...components[key].children.filter(k => components[k].type === SEQUENCE)];
  // }, []);
  // debugger;Ò
}

export default undefined;
