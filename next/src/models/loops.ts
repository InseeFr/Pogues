/** Type of a questionnaire component that can be the boundary of a loop. */
export enum LoopMemberType {
  Sequence = 'SEQUENCE',
  Subsequence = 'SUBSEQUENCE',
  ExternalElement = 'EXTERNAL_ELEMENT',
}

/** Questionnaire component that can be the boundary of a loop. */
export type LoopMember = {
  id: string
  name: string
  type: LoopMemberType
}

/**
 * Component that can be the initial member of a loop, with the components that
 * can be used as final member when it is selected.
 */
export type InitialLoopMember = LoopMember & {
  /** Possible final members, in questionnaire order (including itself). */
  finalMembers: LoopMember[]
}
