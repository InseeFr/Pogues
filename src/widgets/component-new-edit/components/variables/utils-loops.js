import {
  COMPONENT_TYPE,
  QUESTION_TYPE_ENUM,
  DIMENSION_FORMATS,
} from 'constants/pogues-constants';

const { LOOP, QUESTION } = COMPONENT_TYPE;
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
      .filter(component => component.type === LOOP && !component.basedOn)
      .map(loop => {
        return { id: loop.id, name: loop.nameLoop };
      }),
    ...Object.values(components)
      .filter(
        component =>
          component.type === QUESTION &&
          (component.responseFormat.type === PAIRING ||
            (component.responseFormat.type === TABLE &&
              component.responseFormat.TABLE.PRIMARY.type === LIST)),
      )
      .map(question => ({ id: question.id, name: question.name })),
    ...externalLoops,
  ];
}
