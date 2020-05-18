import * as Response from './response';
import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

export function stateToModel(
  state,
  collectedVariables,
  collectedVariablesStore,
  type,
) {
  let collectedVariablesFinal = collectedVariables;
  if(type == 'MULTIPLE_CHOICE' || type == 'TABLE') {
    collectedVariablesFinal.map(collected=> {
      const find = Object.values(collectedVariablesStore).find(variable=> variable.id == collected);
      if(find && find.type == 'TEXT' && !find.x) {
        collectedVariablesFinal = collectedVariablesFinal.filter(element => element != find.id)
      }
    })
  }
  const responsesModel = collectedVariablesFinal.map(cv =>
    Response.stateToRemote({ ...state, collectedVariable: cv }),
  );

  let attributeModel = [];

  const mappingModel = responsesModel.map(r => {
    const { x, y, isCollected } = collectedVariablesStore[r.CollectedVariableReference];
    // Table : Fix lines and look into columns
    const MappingTarget =
      type === QUESTION_TYPE_ENUM.MULTIPLE_CHOICE ? `${x}` : `${x} ${y}`;
    
      if (isCollected === false ) {
        attributeModel.push({
          "AttributeValue": "NoDataByDefinition",
          "AttributeTarget": MappingTarget
        },)
      }
    return { MappingSource: r.id, MappingTarget };
  });

  if (type == 'TABLE') {
    return {
      Response: responsesModel,
      Mapping: mappingModel,
      Attribute: attributeModel,
    } 
  } else {
    return {
      Response: responsesModel,
      Mapping: mappingModel,
    } 
  };
}