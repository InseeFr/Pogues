## Release notes

## 09/04/21

Dear Pogues users,

A new version of Pogues is now available in production.

Here are the main new features:

1. New input conditions
- It is now mandatory to declare a minimum and a maximum for any number field, whether it is collected, external or calculated. 

-Statements: 
                -until now the possible statement types were Help, Warning, Instruction and Comment. On the web or on paper, they were not really distinguished. This list has been revised in order to take into account the collection by interviewer. From now on, the modalities will be :
                                - Help (when it concerns the respondent, whatever the mode: paper, web, with interviewer) ;
                                - Instruction (when it must be seen only by the interviewer);
                                - Code-card (for questions where the interviewer will have to present a code-card to the respondent): the choice of such a deposit should lead to a particular visual (an icon a priori) on the future Queen interviewer station.
                -an attribute has also been to a statement: the collection mode. It is now important to enter the collection mode of a statement since it will soon be used to decide whether or not to display a statement on the questionnaires, which will make it possible to have statements specific to the interviewer modes (CAPI and CATI), for example, which will not be displayed on the web or on paper. 

-It is now possible to redirect the respondent to the end of the questionnaire by choosing the target QUESTIONNAIRE_END in the Target field of the Goto tab. 

2. New features and bug fixes
- the "Modifications not validated" pop-up that warns you when you have consulted and possibly modified a tab without validating it, can now be bypassed without having to revalidate or cancel all the previously consulted tabs. Two buttons have therefore been added to the pop-up:
"Validate as is" to allow you to validate all your validated changes to the item
"Back" if you prefer to validate your last updates on the tabs before validating;

-The specifications have been enriched and contain the tooltips, filters (start, end, conditions) and loops (content, loop type) described for the questionnaire. In case of redirection, the filtered variables are also shown with the mention "filter";

-Code list : 
            -It is now possible to create a list of codes by importing a csv file, encoded in utf8, respecting the format of the following example:
Parent;Value;Label;
;code1;label1;
;code2;label2;
;code3;label3;
;code4;label4;
;code5;label5;
;code6;label6;
;code7;label7;
;code8;label8;
;code9;label9;
;code10;label10;
Parent will store the parent code when the code list is hierarchical and will therefore be empty in general
Value will store the code of each modality
Label will store the label of each modality
            -A "Duplicate Code List" button allows you, when checked, to duplicate a code list to create a variant. The title of the initial list will be suffixed by _2 at first for the duplicated list and then will be modifiable by your care in Pogues;

-Loops: in the case of a loop that does not rely on a dynamic array or another loop, it will now be possible to indicate in the GUI the minimum number of loop occurrences displayed by default (until now it was always 1 and the user only indicated the maximum number of loop occurrences) ;

-It is now possible to merge two questionnaires by clicking from the initial questionnaire on the +Questionnaire button (at the bottom of the GUI and to the right of Visualize). You can then choose among the questionnaires you own, the one you wish to add to it. Warning: make sure you define the same collection modes for the initial questionnaire and the questionnaire to be added to it! If some elements (sequences, sub-sequences, questions, variables, loops, code list) share the same identifier, the identifier of the second occurrence will be suffixed by _2 ;

-The default size of text responses has been changed from 255 characters (long field) to 249: this choice is more consistent with the transformations performed by Eno (limit of passage between a long field and a short field on the paper for example);

-The filter identifiers have been removed, as they have no use of their own;

-An error message will indicate, if necessary, all the redirections in error (cf. redirection target modified or deleted after having specified the redirection);

-The text alternatives for the paper mode to the redirections or filters referencing external, calculated or collected variables will now be correctly personalised on the pdf;

-Bugs on calculated variables with a dynamic table scope have been fixed.

Sincerely yours,

The Pogues team




## 01/03/21


Dear Pogues users,

The new version of Pogues in production contains the following enhancements:

- It is now possible to **duplicate a questionnaire** you own via a Duplicate button accessible from the home page listing all your questionnaires;

- the "Collected" boolean, accessible for variables collected within a table, and allowing you to indicate that a table cell will not be collected, is now accessible for variables collected within multiple choice questions;

- the **"End if" of a filter**, recalling the last element composing a filter, is now systematically displayed even when the filter is composed of a single element;

- **The front office has been refactoring** so that the set of questionnaires owned by the user when accessing the Pogues home page is no longer loaded into the store as it is today, but only the metadata of the questionnaires on the home page. The loading of a questionnaire in the store is now done when the user explicitly accesses the questionnaire;

- Matching of scope and IterableReference of loops when the "Based on" field (optional) of a loop is modified.

See you soon,

The Pogues team
