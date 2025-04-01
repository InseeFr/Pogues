import { QUESTION_TYPE_ENUM } from '@/constants/pogues-constants';

import * as Response from './response';
import { StateResponse } from './types';

const { TABLE, MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM;

export function stateToModel(
  state: StateResponse,
  collectedVariables: string[],
  collectedVariablesStore: {
    [s: string]: {
      id: string;
      x: number;
      y: number;
      type?: unknown;
      isCollected?: unknown;
      alternativeLabel?: unknown;
    };
  },
  type: keyof typeof QUESTION_TYPE_ENUM,
  response?: Response.Response[],
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
  const attributeModel: {
    AttributeValue: unknown;
    AttributeTarget: unknown;
    Label: unknown;
  }[] = [];
  const mappingModel = responsesModel.map((r) => {
    const { x, y, isCollected, alternativeLabel } =
      collectedVariablesStore[r.CollectedVariableReference!];
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
