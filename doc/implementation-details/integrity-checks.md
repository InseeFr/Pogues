# Integrity checks

TODO

This functionality checks the questionnaire integrity after each modification. For now, only checks of goTos consistency have been implemented, but this functionality is modular and other checks can be added easily. A supplementary check of the questionnaire length has been implemented as an example of how to extend this functionality.

These checks will generate error messages that will appear at the top of the questionnaire in a dedicated panel. This panel can be folded and unfolded to show or hide these messages.

For now, some redundant checks of goTos consistency are implemented at the user interface level. These checks allow to tag inconsistencies (target not defined, not existing or earlier in the questionnaire) directly in front of the entity concerned. In the long run, these checks should disappear and tagging entities with errors should rely on the global integrity checks produced by this functionality.


To check integrity, we need to analyze simultaneously multiple entities. For instance, to check if a goTo is valid, we need to know where the component holding this goTo and where the target defined by this goTo stand within the questionnaire. For that, we need, in addition to the information about the goTo, information about the questionnaire structure which is held by the componentById reducer.

These checks have been implemented in a reducer that enhances the former main reducer by adding an integrity property to it. The code of this reducer is executed after an action has been processed by the former main reducer, so it knows everything it needs about the questionnaire.