import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formPropTypes, formValueSelector } from 'redux-form';

import {
  addSubformValidationErrors,
  clearSubformValidationErrors,
} from '../../../actions/errors';
import { TABS_PATHS } from '../../../constants/pogues-constants';
import ComponentNewEdit from '../components/component-new-edit';

// Utils

function getErrorsIntegrityByTab(integrityErrors = {}) {
  const errorsByTab = Object.keys(TABS_PATHS).reduce((acc, key) => {
    return {
      ...acc,
      [TABS_PATHS[key]]: [],
    };
  }, {});

  Object.keys(integrityErrors)
    .reduce((acc, key) => {
      return [...acc, ...integrityErrors[key]];
    }, [])
    .filter((e) => e.path)
    .forEach((e) => {
      const matches = e.path.match(/^(.+?)\./);

      if (matches) {
        errorsByTab[matches[1]].push(e);
      }
    });

  return errorsByTab;
}

// Prop types and default props

export const propTypes = {
  ...formPropTypes,
  componentType: PropTypes.string.isRequired,
  componentId: PropTypes.string,
};

// Container

const mapStateToProps = (state, { componentId = '' }) => {
  const errorsIntegrity = state.errors.errorsIntegrity[componentId];
  const externalLoopsAvailable =
    state.metadataByType.externalQuestionnairesLoops || {};
  const externalQuestionnnairesId =
    state.appState.activeQuestionnaire.childQuestionnaireRef || [];
  const externalLoopsWanted = Object.keys(externalLoopsAvailable)
    .filter((key) => externalQuestionnnairesId.includes(key))
    .reduce((acc, key) => [...acc, ...externalLoopsAvailable[key].loops], []);
  const selector = formValueSelector('component');
  const label = selector(state, 'label') || '';
  const name = selector(state, 'name') || '';
  // Mirror validate-rules `required`: empty / whitespace-only / punctuation-only
  // must keep VALIDER disabled (antlr-editor ≥ 2.9.4 no longer errors on empty).
  const isBlankRequiredField = (value) =>
    value.trim().replace(/[^\w\s]/gi, '') === '';

  return {
    InitialMember: selector(state, 'initialMember'),
    errorsIntegrityByTab: getErrorsIntegrityByTab(errorsIntegrity),
    componentsStore: state.appState.activeComponentsById,
    externalLoopsStore: externalLoopsWanted,
    redirectionNeeded:
      state.appState.activeQuestionnaire.dynamiqueSpecified !== 'Filtres',
    activeQuestionnaire: state.appState.activeQuestionnaire,
    missingRequiredIdentity:
      isBlankRequiredField(label) || isBlankRequiredField(name),
  };
};

const mapDispatchToProps = {
  addSubformValidationErrors,
  clearSubformValidationErrors,
};

const ComponentNewEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentNewEdit);

ComponentNewEditContainer.propTypes = propTypes;

export default ComponentNewEditContainer;
