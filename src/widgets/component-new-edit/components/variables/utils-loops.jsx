import {
  COMPONENT_TYPE,
  DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
} from '../../../../constants/pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE, LOOP, ROUNDABOUT, EXTERNAL_ELEMENT } =
  COMPONENT_TYPE;
const { TABLE, PAIRING } = QUESTION_TYPE_ENUM;
const { LIST } = DIMENSION_FORMATS;

/**
 * Get questionnaire scoops
 *
 * It finds from a list of components the loops that dont have iterable reference and dynamique table
 *
 * @param  {object} components        List of components
 * @return {array} list components for loop
 */
export function getQuestionnaireScope(components, externalLoops) {
  return [
    ...Object.values(components)
      .filter((component) => component.type === LOOP && !component.basedOn)
      .map((loop) => {
        return { id: loop.id, name: loop.nameLoop };
      }),
    ...Object.values(components)
      .filter(
        (component) =>
          component.type === QUESTION &&
          (component.responseFormat.type === PAIRING ||
            (component.responseFormat.type === TABLE &&
              component.responseFormat.TABLE.PRIMARY.type === LIST)),
      )
      .map((question) => ({ id: question.id, name: question.name })),
    ...externalLoops,
  ];
}

function getQuestionFromSequence(componentsStore, id) {
  const sequenceQuestions = [];
  componentsStore[id].children.forEach((child) => {
    if (componentsStore[child]) {
      if (componentsStore[child].type === QUESTION) {
        sequenceQuestions.push(componentsStore[child]);
      } else {
        componentsStore[child].children.forEach((chil) => {
          sequenceQuestions.push(componentsStore[chil]);
        });
      }
    }
  });
  return sequenceQuestions;
}

function getQuestionFromSubSequence(componentsStore, id) {
  const SubSequenceQuestions = [];
  if (componentsStore[id].children) {
    componentsStore[id].children.forEach((child) => {
      if (componentsStore[child] && componentsStore[child].type === QUESTION) {
        SubSequenceQuestions.push(componentsStore[child]);
      }
    });
  }

  return SubSequenceQuestions;
}


export function findQuestionInLoop(componentsStore) {
  const LoopsQuestions = {};
  Object.values(componentsStore)
    .filter((element) => element.type === LOOP || element.type === ROUNDABOUT)
    .forEach((component) => {
      let LoopQuestions = [];
      if (componentsStore[component.initialMember]) {
        if (
          componentsStore[component.initialMember].type === SEQUENCE ||
          componentsStore[component.initialMember].type === EXTERNAL_ELEMENT
        ) {
          for (
            let i = componentsStore[component.initialMember].weight;
            i <= componentsStore[component.finalMember].weight;
            i++
          ) {
            const sequence = Object.values(componentsStore).find(
              (element) => element.type === SEQUENCE && element.weight === i,
            );
            if (sequence) {
              LoopQuestions = LoopQuestions.concat(
                getQuestionFromSequence(componentsStore, sequence.id),
              );
            }
          }
        } else {
          for (
            let i = componentsStore[component.initialMember].weight;
            i <= componentsStore[component.finalMember].weight;
            i++
          ) {
            const subsequence = Object.values(componentsStore).find(
              (element) =>
                element.type === SUBSEQUENCE &&
                element.weight === i &&
                element.parent ===
                  componentsStore[component.initialMember].parent,
            );
            if (subsequence) {
              LoopQuestions = LoopQuestions.concat(
                getQuestionFromSubSequence(componentsStore, subsequence.id),
              );
            }
          }
        }
      }

      LoopsQuestions[component.id] = LoopQuestions;
    });
  return LoopsQuestions;
}