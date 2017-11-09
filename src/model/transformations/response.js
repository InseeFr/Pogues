import { DATATYPE_TYPE_FROM_NAME, UI_BEHAVIOUR } from 'constants/pogues-constants';

export function stateToRemote(state) {
  const {
    mandatory,
    typeName,
    maxLength: MaxLength,
    pattern: Pattern,
    minimum: Minimum,
    maximum: Maximum,
    decimals: Decimals,
    unit: Unit,
    codesListId: CodeListReference,
    visHint: visualizationHint,
    hasSpecialCode,
    specialLabel,
    specialCode,
    specialUiBehaviour,
    specialFollowUpMessage,
    collectedVariable: CollectedVariableReference,
  } = state;

  const model = {
    Datatype: {
      typeName,
      type: DATATYPE_TYPE_FROM_NAME[typeName],
    },
  };

  if (CollectedVariableReference !== undefined) model.CollectedVariableReference = CollectedVariableReference;
  if (CodeListReference !== undefined) model.CodeListReference = CodeListReference;
  if (mandatory !== undefined) model.mandatory = mandatory;
  if (visualizationHint !== undefined) model.Datatype.visualizationHint = visualizationHint;
  if (MaxLength !== undefined) model.Datatype.MaxLength = MaxLength;
  if (Pattern !== undefined) model.Datatype.Pattern = Pattern;
  if (Minimum !== undefined) model.Datatype.Minimum = Minimum;
  if (Maximum !== undefined) model.Datatype.Maximum = Maximum;
  if (Decimals !== undefined) model.Datatype.Decimals = Decimals;
  if (Unit !== undefined) model.Datatype.Unit = Unit;
  if (hasSpecialCode) {
    model.nonResponseModality = {
      value: specialCode,
      label: specialLabel,
      firstIntentionDisplay: specialUiBehaviour === UI_BEHAVIOUR.FIRST_INTENTION,
      invite: specialFollowUpMessage,
    };
  }

  return model;
}
