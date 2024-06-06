export function stateToRemote(state) {
  const {
    occurrenceLabel: OccurrenceLabel,
    nameLoop,
    initialMember,
    finalMember,
    basedOn,
    filter,
    excludedOccurrenceLabel,
  } = state;
  const roundabout = {
    OccurrenceLabel,
    Loop: {
      Name: nameLoop,
      MemberReference: [initialMember, finalMember],
      IterableReference: basedOn,
    },
  };
  if (filter) roundabout.Loop.Filter = filter;
  if (excludedOccurrenceLabel)
    roundabout.Loop.ExcludedOccurrenceLabel = excludedOccurrenceLabel;

  return roundabout;
}
