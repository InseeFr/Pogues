import { VTLExpression } from './expression';

export enum LoopType {
  BasedOn,
  DynamicLength,
  FixedLength,
}

export type Loop = BasedOnLoop | IndependantLoop;

/**
 * Common props for every type of loop.
 */
type BaseLoop = {
  id: string;
  name: string;
  initialMemberReference: string;
  finalMemberReference: string;
  isBasedOn: boolean;
};

/**
 * Loop based on another loop or on a dynamic table.
 */
type BasedOnLoop = BaseLoop & {
  type: LoopType.BasedOn;
  isBasedOn: true;
  /** Iterable on which the loop is based. Could be a Roster (dynamic table) or another iteration. */
  iterableReference: string;
  /** Specifies a condition for filter for NOT displaying an iteration. */
  filter?: VTLExpression;
};

/**
 * Loop not based on any loop or dynamic table.
 */
type IndependantLoop = BaseLoop & (FixedLengthLoop | DynamicLengthLoop);

/**
 * Loop with dimension size fixed and defined by a formula.
 */
type FixedLengthLoop = {
  type: LoopType.FixedLength;
  isBasedOn: false;
  isFixedLength: true;
  /** Size of the loop. */
  size: VTLExpression;
  /** It allows to display a loop with one page per iteration. */
  loopSinglePage: boolean;
};

/**
 * Loop with dynamic dimension size between a min and a max.
 */
type DynamicLengthLoop = {
  type: LoopType.DynamicLength;
  isBasedOn: false;
  isFixedLength: false;
  /** Minimum allowed value for the loop dimension. */
  minimum: VTLExpression;
  /** Maximum allowed value for the loop dimension. */
  maximum: VTLExpression;
  /** Label of the button for adding an iteration. */
  addButtonLabel?: string;
};
