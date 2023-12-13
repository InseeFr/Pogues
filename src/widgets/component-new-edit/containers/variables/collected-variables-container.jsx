import { connect } from 'react-redux';
import { formValueSelector, arrayRemoveAll, arrayPush } from 'redux-form';
import PropTypes from 'prop-types';

import CollectedVariables from '../../components/variables/collected-variables';

import { removeValidationErrors } from '../../../../actions/errors';
import {
  TABS_PATHS,
  DEFAULT_FORM_NAME,
} from '../../../../constants/pogues-constants';

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
  return {
    componentName: selector(state, 'name'),
    responseFormatType,
    reponseFormatValues: selector(
      state,
      `responseFormat.${responseFormatType}`,
    ),
    codesListsStoreStore: state.appState.activeCodeListsById,
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
