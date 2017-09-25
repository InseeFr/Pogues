import { SET_ACTIVE_COMPONENTS, SET_ACTIVE_VARIABLES } from 'actions/app-state';
import {
  CREATE_COMPONENT,
  UPDATE_COMPONENT,
  REMOVE_COMPONENT,
  MOVE_COMPONENT,
  DUPLICATE_COMPONENT,
} from 'actions/component';
import combineCheckers from 'utils/reducer/combine-checkers';
import checkerQuestionnaireLength from 'utils/reducer/checker-questionnaire-length';
import checkerComponentTarget from 'utils/reducer/checker-component-targets';
import checkerUniqueVariableName from 'utils/reducer/checker-unique-variable-name';
import checkerUniqueComponentName from 'utils/reducer/checker-unique-component-name';

export default {
  [SET_ACTIVE_COMPONENTS]: combineCheckers(
    checkerQuestionnaireLength,
    checkerComponentTarget,
    checkerUniqueComponentName
  ),
  [SET_ACTIVE_VARIABLES]: combineCheckers(checkerUniqueVariableName),
  [CREATE_COMPONENT]: combineCheckers(
    checkerQuestionnaireLength,
    checkerUniqueVariableName,
    checkerUniqueComponentName
  ),
  [UPDATE_COMPONENT]: combineCheckers(checkerComponentTarget, checkerUniqueVariableName, checkerUniqueComponentName),
  [REMOVE_COMPONENT]: combineCheckers(checkerQuestionnaireLength, checkerComponentTarget, checkerUniqueComponentName),
  [MOVE_COMPONENT]: combineCheckers(checkerComponentTarget),
  [DUPLICATE_COMPONENT]: combineCheckers(checkerComponentTarget, checkerUniqueVariableName, checkerUniqueComponentName),
};
