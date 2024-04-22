import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValueSelector, formPropTypes } from 'redux-form';

import ComponentNewEdit from '../components/component-new-edit';
import {
  addSubformValidationErrors,
  clearSubformValidationErrors,
} from '../../../actions/errors';
import { TABS_PATHS } from '../../../constants/pogues-constants';

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
    .filter(e => e.path)
    .forEach(e => {
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

export const defaultProps = {
  componentId: '',
};

// Container

const mapStateToProps = (state, { componentId }) => {
  const errorsIntegrity = state.errors.errorsIntegrity[componentId];
  const externalLoopsAvailable =
    state.metadataByType.externalQuestionnairesLoops || {};
  const externalQuestionnnairesId =
    state.appState.activeQuestionnaire.childQuestionnaireRef || [];
  const externalLoopsWanted = Object.keys(externalLoopsAvailable)
    .filter(key => externalQuestionnnairesId.includes(key))
    .reduce((acc, key) => [...acc, ...externalLoopsAvailable[key].loops], []);
  const selector = formValueSelector('component');
  return {
    InitialMember: selector(state, 'initialMember'),
    filterImbriquer: selector(state, 'filterImbriquer'),
    errorsIntegrityByTab: getErrorsIntegrityByTab(errorsIntegrity),
    componentsStore: state.appState.activeComponentsById,
    externalLoopsStore: externalLoopsWanted,
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
ComponentNewEditContainer.defaultProps = defaultProps;

export default ComponentNewEditContainer;
