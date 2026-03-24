type RemoteRoundabout = {
  OccurrenceLabel: unknown;
  OccurrenceDescription: unknown;
  Locked: unknown;
  Loop: {
    Name: unknown;
    MemberReference: unknown;
    IterableReference: unknown;
    Filter?: unknown;
  };
};

export function stateToRemote(state: {
  occurrenceLabel: unknown;
  occurrenceDescription: unknown;
  nameLoop: unknown;
  initialMember: unknown;
  finalMember: unknown;
  basedOn: unknown;
  filter?: unknown;
  locked: unknown;
}): RemoteRoundabout {
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
  const roundabout: RemoteRoundabout = {
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
