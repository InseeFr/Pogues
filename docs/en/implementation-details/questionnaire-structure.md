# Processing the questionnaire structure

Processing the questionnaire structure is not trivial: it needs to comply to some complex rules. These rules can sometimes be more easily expressed when working with a flat representation of the questionnaire (an array where each component appears in chronological order), instead of a nested tree structure. For instance:
- to process [on the fly checks](https://github.com/InseeFr/Pogues/blob/4ef8d01e46cecc9343bede2a3f9a0d1406abfdf7/src/js/components/goto-panel.js#L89) and [integrity checks](https://github.com/InseeFr/Pogues/blob/master/src/js/utils/goTosChecker.js) on goTos;
- when we modify the questionnaire structure ([component removal](https://github.com/InseeFr/Pogues/blob/4ef8d01e46cecc9343bede2a3f9a0d1406abfdf7/src/js/components/delete-activator.js), [drag and drop](https://github.com/InseeFr/Pogues/blob/4ef8d01e46cecc9343bede2a3f9a0d1406abfdf7/src/js/components/question-or-sequence.js#L36));
- to [attach page breaks](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/reducers/page-break-by-id.js#L32-L45) to the right component when the questionnaire structure changes.

## Example - Moving a component

This flat representation of the questionnaire is used when moving a question or a sequence (by the `QuestionOrSequence` component), to [determine](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/components/question-or-sequence.js#L40-L42) what was the question or the sequence before the question or sequence to be moved. This information is needed by the [moveComponent](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/actions/component.js#L49-L57) action creator:

```javascript
export const moveComponent = (qrId, origin, dest, previous) => ({
  type: MOVE_COMPONENT,
  payload: {
    origin,
    dest,
    //It needs to know what was the previous component.
    //Determining the previous component is not trivial. It can
    //for instance be the last component in the previous //sequence).
    previous,
    qrId
  }
})
```

In order to do that, a flat representation of the questionnaire is [passed as a prop](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/components/question-or-sequence.js#L131) to the `QuestionOrSequence` component.

## Flatten the questionnaire

The [flatten function](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/utils/data-utils.js#L31) is used to process this flat chronological representation of the questionnaire.

In the long run, this information could be part of the application state: this representation of the questionnaire is useful and more optimal for many operations. But for now, it's just calculated by the components that need it. We use a simple [memoization](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/utils/data-utils.js#L80-L85) technique to avoid processing multiple times this information if the questionnaire structure has not changed.

## Utility functions

Some [utility functions](https://github.com/InseeFr/Pogues/tree/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/utils/tree-utils) rely on this `flatten` function to add, move or remove a question or a sequence. 
