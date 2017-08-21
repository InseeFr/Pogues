import { DATATYPE_TYPE_FROM_NAME, UI_BEHAVIOUR } from 'constants/pogues-constants';

function stateToModel(state) {
  const {
    mandatory,
    type,
    [type]: { maxLength: MaxLength, pattern: Pattern, minimum: Minimum, maximum: Maximum, decimals: Decimals },
    codesListId: CodeListReference,
    visHint: visualizationHint,
    hasSpecialCode,
    specialLabel,
    specialCode,
    specialUiBehaviour,
    specialFollowUpMessage,
  } = state;
  const model = {
    Datatype: {
      typeName: type,
      type: DATATYPE_TYPE_FROM_NAME[type],
    },
  };

  if (CodeListReference !== undefined) model.CodeListReference = CodeListReference;
  if (mandatory !== undefined) model.mandatory = mandatory;
  if (visualizationHint !== undefined) model.Datatype.visualizationHint = visualizationHint;
  if (MaxLength !== undefined) model.Datatype.MaxLength = MaxLength;
  if (Pattern !== undefined) model.Datatype.Pattern = Pattern;
  if (Minimum !== undefined) model.Datatype.Minimum = Minimum;
  if (Maximum !== undefined) model.Datatype.Maximum = Maximum;
  if (Decimals !== undefined) model.Datatype.Decimals = Decimals;
  if (hasSpecialCode !== undefined) {
    model.nonResponseModality = {
      value: specialCode,
      label: specialLabel,
      firstIntentionDisplay: specialUiBehaviour === UI_BEHAVIOUR.FIRST_INTENTION,
      invite: specialFollowUpMessage,
    };
  }

  return model;
}

export default {
  stateToModel,
};
