# Integrity checks

This functionality checks the questionnaire integrity after each modification. These checks will generate error messages that will appear at the top of the questionnaire in a dedicated panel.

It has been implemented with the [integrityChecker function](https://github.com/InseeFr/Pogues/blob/5df2bc748fc947b1e92d5ec637dc32ec437b11c9/src/js/reducers/integrity-checker.js#L12), which is called to [build the main reducer](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/reducers/index.js#L29). It takes a reducer as its first argument and a `checker` as its second argument, and returns a dynamically built reducer which will first [call the reducer it was given to process the actions](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/reducers/integrity-checker.js#L28), and then, based on the new state produced by the initial reducer, process some integrity checks implemented by the `checker`.

The initial reducer will be a combination of all the existing reducers. It implements the application logic (for instance, how to update the state when we add a question).

The checker can be built by combining multiple checkers with the [combineCheckers](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/reducers/checkers.js#L16) function. 

The reducer built by `integrityChecker` will add an `errors` key to the application state.

For now, only checks of [goTos consistency](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/utils/goTosChecker.js) and [questionnaire length](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/utils/questionnaireLengthChecker.js) have been implemented.


