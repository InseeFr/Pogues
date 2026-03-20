import { QUESTION_TYPE_ENUM } from '@/constants/pogues-constants';

import {
  type Response,
  stateToRemote as responseStateToRemote,
} from './response';
import type { StateResponse } from './types';

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
  type: QUESTION_TYPE_ENUM,
  response?: Response[],
) {
  let collectedVariablesFinal = collectedVariables;
  if (
    type === QUESTION_TYPE_ENUM.MULTIPLE_CHOICE ||
    type === QUESTION_TYPE_ENUM.TABLE
  ) {
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
    responseStateToRemote({ ...state, collectedVariable: cv }, response),
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
    const MappingTarget =
      type === QUESTION_TYPE_ENUM.MULTIPLE_CHOICE ? `${x}` : `${x} ${y}`;

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
