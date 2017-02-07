# Integrity checks

This functionality checks the questionnaire integrity after each modification. These checks will generate error messages that will appear at the top of the questionnaire in a dedicated panel.

It has been implemented with the [integrity checker reducer](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/reducers/integrity-checker.js), which is called when [the main reducer is built](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/reducers/index.js#L29). It takes as its first argument the application reducer, so it can [first process]((https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/reducers/integrity-checker.js#L28) the new state to take modifications into account, and a `checker` which, given the new state, will check the questionnaire integrity. The checker can be built by combining multiple checkers with the [combineCheckers](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/reducers/checkers.js#L16) function. 

The integrity checker will add an `errors` key to the application state.

For now, only checks of [goTos consistency](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/utils/goTosChecker.js) and [questionnaire length](https://github.com/InseeFr/Pogues/blob/465665aaf56e835f7b5ae13dff899531d44ed4bd/src/js/utils/questionnaireLengthChecker.js) have been implemented.


