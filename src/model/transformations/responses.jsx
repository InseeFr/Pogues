import { QUESTION_TYPE_ENUM } from '../../constants/pogues-constants';
import * as Response from './response';

const { TABLE, MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM;

export function stateToModel(
  state,
  collectedVariables,
  collectedVariablesStore,
  type,
  response,
) {
  let collectedVariablesFinal = collectedVariables;
  if (type === MULTIPLE_CHOICE || type === TABLE) {
    collectedVariables.forEach((collected) => {
      const find = Object.values(collectedVariablesStore).find(
        (variable) => variable.id === collected,
      );
      if (find && find.type === 'TEXT' && !find.x) {
        collectedVariablesFinal = collectedVariablesFinal.filter(
          (element) => element !== find.id,
        );
      }
    });
  }

  const responsesModel = collectedVariablesFinal.map((cv) =>
    Response.stateToRemote({ ...state, collectedVariable: cv }, response),
  );
  const attributeModel = [];
  const mappingModel = responsesModel.map((r) => {
    const { x, y, isCollected, alternativeLabel } =
      collectedVariablesStore[r.CollectedVariableReference];
    // Table : Fix lines and look into columns
    const MappingTarget = type === MULTIPLE_CHOICE ? `${x}` : `${x} ${y}`;

    if (isCollected === '0') {
      attributeModel.push({
        AttributeValue: 'NoDataByDefinition',
        AttributeTarget: MappingTarget,
        Label: alternativeLabel,
      });
    }
    return { MappingSource: r.id, MappingTarget };
  });

  return {
    Response: responsesModel,
    Mapping: mappingModel,
    Attribute: attributeModel,
  };
}
