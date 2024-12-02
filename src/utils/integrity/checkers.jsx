import {
  SET_ACTIVE_COMPONENTS,
  SET_ACTIVE_VARIABLES,
} from '../../actions/app-state';
import {
  CREATE_COMPONENT,
  DUPLICATE_COMPONENT,
  MOVE_COMPONENT,
  REMOVE_COMPONENT,
  UPDATE_COMPONENT,
} from '../../actions/component';
import { LOAD_QUESTIONNAIRE_SUCCESS } from '../../actions/questionnaire';
import checkerComponentTarget from './checker-component-targets';
import checkerTargetMode from './checker-declaration-mode';
import checkerExistingTarget from './checker-existing-target';
import checkerQuestionnaireLength from './checker-questionnaire-length';
import checkerUniqueCollectedVariableName from './checker-unique-collected-variable-name';
import checkerUniqueComponentName from './checker-unique-component-name';
import combineCheckers from './combine-checkers';

export default {
  [SET_ACTIVE_COMPONENTS]: combineCheckers(
    checkerQuestionnaireLength,
    checkerComponentTarget,
    checkerUniqueComponentName,
    checkerTargetMode,
  ),
  [SET_ACTIVE_VARIABLES]: combineCheckers(checkerUniqueCollectedVariableName),
  [CREATE_COMPONENT]: combineCheckers(
    checkerQuestionnaireLength,
    checkerUniqueCollectedVariableName,
    checkerUniqueComponentName,
    checkerTargetMode,
  ),
  [UPDATE_COMPONENT]: combineCheckers(
    checkerComponentTarget,
    checkerTargetMode,
    checkerUniqueCollectedVariableName,
    checkerUniqueComponentName,
    checkerExistingTarget,
  ),
  [REMOVE_COMPONENT]: combineCheckers(
    checkerQuestionnaireLength,
    checkerTargetMode,
    checkerComponentTarget,
    checkerUniqueComponentName,
    checkerUniqueCollectedVariableName,
    checkerExistingTarget,
  ),
  [MOVE_COMPONENT]: combineCheckers(checkerComponentTarget),
  [LOAD_QUESTIONNAIRE_SUCCESS]: combineCheckers(checkerExistingTarget),
  [DUPLICATE_COMPONENT]: combineCheckers(
    checkerComponentTarget,
    checkerTargetMode,
    checkerUniqueCollectedVariableName,
    checkerUniqueComponentName,
  ),
  '@@redux-form/DESTROY': combineCheckers(
    checkerComponentTarget,
    checkerUniqueCollectedVariableName,
  ),
};
