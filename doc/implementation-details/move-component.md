# Move component

TODO

## Rules

When over a component label, the mouse pointer switches to the move cursor (a cross with arrows on the tips) to indicate that the component can be dragged and dropped.
A component can be dragged and dropped after (when dragging down) or before (when dragging up) any other component (the first sequence is a special case, see below). When dragging, a dedicated area will show where the component can be dropped. When we move a sequence, all its children are moved with it. As a consequence, a sequence cannot be moved inside itself: the sequence is folded before dragging (all children are replaced with an ellipsis). When we move a sequence or a subsequence, we do not modify the depth (a sequence stays a sequence, a subsequence stays a subsequence), and we need to find the proper parent based on this rule. For instance, if we move a sequence after a subsequence, the new parent for the moved sequence is still the root of the questionnaire, and not the subsequence where we dropped it. Another example: if we move a subsequence after a subsequence, it will become a child of the sequence containing the subsequence after which we dropped it, and not a child of this subsequence.

When dropped, questions are attached to the closest opened sequence. Hence, its parent can be:
- a subsequence ;
- a sequence if it is dropped in a sequence which does not contain any subsequence, or if it is dropped before the first subsequence of a sequence.

To ensure the aforementioned rules about questionnaire structure (the questionnaire cannot start with questions, the questionnaire has to be represented as a tree and so cannot start with a subsequence) and the above rule about moving a component (we do not change the depth of the moved sequence or a subsequence), we cannot move a subsequence or a question before the first sequence of the questionnaire: there is no drop area before this first sequence.

These rules turned out to be difficult to implement when dealing only with a tree representation of the questionnaire. A three steps process has hence been developed:

- first, the questionnaire is flattened (the questionnaire is seen as an array where each component appears in chronological order with a depth assigned to it);
- then we process this array to move the component;
- eventually, this array is unflattened to build back the questionnaire tree structure.

## Drag'n drop

TODO