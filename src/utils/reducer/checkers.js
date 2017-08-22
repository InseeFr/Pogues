import { SET_ACTIVE_COMPONENTS } from 'actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT, REMOVE_COMPONENT, MOVE_COMPONENT } from 'actions/component';
import combineCheckers from 'utils/reducer/combine-checkers';
import checkerQuestionnaireLength from 'utils/reducer/checker-questionnaire-length';
import checkerComponentTarget from 'utils/reducer/checker-component-targets';

export default {
  [SET_ACTIVE_COMPONENTS]: combineCheckers(checkerQuestionnaireLength, checkerComponentTarget),
  [CREATE_COMPONENT]: combineCheckers(checkerQuestionnaireLength),
  [UPDATE_COMPONENT]: combineCheckers(checkerComponentTarget),
  [REMOVE_COMPONENT]: combineCheckers(checkerQuestionnaireLength, checkerComponentTarget),
  [MOVE_COMPONENT]: combineCheckers(checkerComponentTarget),
};
