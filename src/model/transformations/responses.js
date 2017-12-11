import * as Response from './response';

export function stateToModel(state, collectedVariables, collectedVariablesStore) {
  const responsesModel = collectedVariables.map(cv => Response.stateToRemote({ ...state, collectedVariable: cv }));
  const mappingModel = responsesModel.map(r => ({
    MappingSource: r.id,
    MappingTarget: `${collectedVariablesStore[r.CollectedVariableReference].x} ${
      collectedVariablesStore[r.CollectedVariableReference].y
    }`,
  }));

  return {
    Response: responsesModel,
    Mapping: mappingModel,
  };
}
