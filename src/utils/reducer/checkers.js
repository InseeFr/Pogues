import { SET_ACTIVE_COMPONENTS, SET_ACTIVE_COLLECTED_VARIABLES } from 'actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT, REMOVE_COMPONENT, MOVE_COMPONENT } from 'actions/component';
import combineCheckers from 'utils/reducer/combine-checkers';
import checkerQuestionnaireLength from 'utils/reducer/checker-questionnaire-length';
import checkerComponentTarget from 'utils/reducer/checker-component-targets';
import checkerCollectedVariables from 'utils/reducer/checker-collected-variables';

export default {
  [SET_ACTIVE_COMPONENTS]: combineCheckers(checkerQuestionnaireLength, checkerComponentTarget),
  [SET_ACTIVE_COLLECTED_VARIABLES]: combineCheckers(checkerCollectedVariables),
  [CREATE_COMPONENT]: combineCheckers(checkerQuestionnaireLength, checkerCollectedVariables),
  [UPDATE_COMPONENT]: combineCheckers(checkerComponentTarget, checkerCollectedVariables),
  [REMOVE_COMPONENT]: combineCheckers(checkerQuestionnaireLength, checkerComponentTarget, checkerCollectedVariables),
  [MOVE_COMPONENT]: combineCheckers(checkerComponentTarget),
};
