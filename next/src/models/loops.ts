/**
 * Loop repeating a portion of the questionnaire, between its initial and final
 * members (which are siblings).
 *
 * Its occurrences are either those of an existing scope, or a fixed or dynamic
 * number of occurrences.
 */
export type Loop = {
  id: string
  name: string
  /** Id of the first component repeated by the loop. */
  initialMember: string
  /** Id of the last component repeated by the loop. */
  finalMember: string
  /** Names of the loops using this loop as reference, which prevent its deletion. */
  relatedLoopNames?: string[]
} & (
  | {
      /** Id of the scope whose occurrences are repeated. */
      basedOn: string
      /** VTL formula filtering the occurrences. */
      filter?: string
    }
  | {
      isFixedLength: true
      /** VTL formula of the number of occurrences. */
      size: string
      /** Whether each occurrence is displayed on its own page. */
      shouldSplitIterations: boolean
    }
  | {
      isFixedLength: false
      /** VTL formula of the minimum number of occurrences. */
      minimum: string
      /** VTL formula of the maximum number of occurrences. */
      maximum: string
      addButtonLabel?: string
    }
)

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
