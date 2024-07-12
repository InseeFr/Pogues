export function stateToRemote(state) {
  const {
    occurrenceLabel: OccurrenceLabel,
    occurrenceDescription: OccurrenceDescription,
    nameLoop,
    initialMember,
    finalMember,
    basedOn,
    filter,
    locked,
  } = state;
  const roundabout = {
    OccurrenceLabel,
    OccurrenceDescription,
    Locked: !!locked,
    Loop: {
      Name: nameLoop,
      MemberReference: [initialMember, finalMember],
      IterableReference: basedOn,
    },
  };
  if (filter) roundabout.Loop.Filter = filter;

  return roundabout;
}
