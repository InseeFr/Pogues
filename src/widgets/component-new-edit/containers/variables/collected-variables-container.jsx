import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { arrayPush, arrayRemoveAll, formValueSelector } from 'redux-form';

import { removeValidationErrors } from '../../../../actions/errors';
import {
  DEFAULT_FORM_NAME,
  TABS_PATHS,
} from '../../../../constants/pogues-constants';
import CollectedVariables from '../../components/variables/collected-variables';

// Prop types and default Props

export const propTypes = {
  formName: PropTypes.string,
  selectorPath: PropTypes.string,
  errors: PropTypes.array,
  addErrors: PropTypes.func.isRequired,
};

export const defaultProps = {
  formName: DEFAULT_FORM_NAME,
  selectorPath: TABS_PATHS.COLLECTED_VARIABLES,
  errors: [],
};

// Container

const mapStateToProps = (state, { formName }) => {
  const selector = formValueSelector(formName);
  const responseFormatType = selector(state, 'responseFormat.type');

  const collectedVariables =
    selector(state, `collectedVariables.collectedVariables`) || [];
  const collectedVariablesIds = new Set();
  for (const collectedVariable of collectedVariables) {
    collectedVariablesIds.add(collectedVariable.id);
  }

  return {
    componentName: selector(state, 'name'),
    collectedVariablesIds,
    responseFormatType,
    reponseFormatValues: selector(
      state,
      `responseFormat.${responseFormatType}`,
    ),
    codesListsStore: state.appState.activeCodeListsById,
    referencedCodeList: selector(state, 'collectedVariables.codeListReference'),
    isVariableCollected: selector(state, 'collectedVariables.isCollected'),
  };
};

const mapDispatchToProps = {
  arrayRemoveAll: arrayRemoveAll,
  arrayPush: arrayPush,
  removeValidationErrors,
};

const CollectedVariablesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectedVariables);

CollectedVariablesContainer.propTypes = propTypes;
CollectedVariablesContainer.defaultProps = defaultProps;

export default CollectedVariablesContainer;
