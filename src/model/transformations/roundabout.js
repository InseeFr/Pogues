export function stateToRemote(state) {
  const {
    occurrenceLabel: OccurrenceLabel,
    nameLoop,
    excludedOccurrenceLabel: ExcludedOccurrenceLabel,
    startedPersonnalizedFormula: Partial,
    endedPersonnalizedFormula: Complete,
  } = state;
  const roundabout = {
    OccurrenceLabel,
    Loop: {
      IterationReference: nameLoop,
    },
  };
  if (ExcludedOccurrenceLabel)
    roundabout.Loop.ExcludedOccurrenceLabel = ExcludedOccurrenceLabel;
  if (Partial) roundabout.Loop.Partial = Partial;
  if (Complete) roundabout.Loop.Complete = Complete;

  return roundabout;
}
