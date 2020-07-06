import * as Response from './response';
import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

export function stateToModel(
  state,
  collectedVariables,
  collectedVariablesStore,
  type,
) {
  let collectedVariablesFinal = collectedVariables;
  if (
    type === QUESTION_TYPE_ENUM.MULTIPLE_CHOICE ||
    type === QUESTION_TYPE_ENUM.TABLE
  ) {
    collectedVariablesFinal.map(collected => {
      const find = Object.values(collectedVariablesStore).find(
        variable => variable.id == collected,
      );
      if (find && find.type == 'TEXT' && !find.x) {
        collectedVariablesFinal = collectedVariablesFinal.filter(
          element => element != find.id,
        );
      }
    });
  }
  const responsesModel = collectedVariablesFinal.map(cv =>
    Response.stateToRemote({ ...state, collectedVariable: cv }),
  );

  const attributeModel = [];

  const mappingModel = responsesModel.map(r => {
    const { x, y, isCollected } = collectedVariablesStore[
      r.CollectedVariableReference
    ];
    // Table : Fix lines and look into columns
    const MappingTarget =
      type === QUESTION_TYPE_ENUM.MULTIPLE_CHOICE ? `${x}` : `${x} ${y}`;

    if (!isCollected) {
      attributeModel.push({
        AttributeValue: 'NoDataByDefinition',
        AttributeTarget: MappingTarget,
      });
    }
    return { MappingSource: r.id, MappingTarget };
  });

  if (type === QUESTION_TYPE_ENUM.TABLE) {
    return {
      Response: responsesModel,
      Mapping: mappingModel,
      Attribute: attributeModel,
    };
  } else {
    return {
      Response: responsesModel,
      Mapping: mappingModel,
    };
  }
}
