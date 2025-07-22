import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { arrayRemoveAll, change, formValueSelector } from 'redux-form';

import { clearSearchResult } from '../../../actions/search';
import {
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DEFAULT_FORM_NAME,
} from '../../../constants/pogues-constants';
import { getCurrentSelectorPath } from '../../../utils/widget-utils';
import CodesLists from '../components/codes-lists';

// PropTypes and defaultProps

const propTypes = {
  selectorPathParent: PropTypes.string,
  selectorPath: PropTypes.string,
  formName: PropTypes.string,
};

export const defaultProps = {
  selectorPathParent: '',
  selectorPath: DEFAULT_CODES_LIST_SELECTOR_PATH,
  formName: DEFAULT_FORM_NAME,
};

// Container

export const mapStateToProps = (
  state,
  { selectorPathParent, selectorPath, formName },
) => {
  const selector = formValueSelector(formName);
  const path = `${getCurrentSelectorPath(selectorPathParent)}${selectorPath}.`;
  const collectedVariables =
    selector(state, `collectedVariables.collectedVariables`) || [];
  const currentId = selector(state, `${path}id`);
  const currentLabel = selector(state, `${path}label`);
  const precisionId = selector(state, `${path}precisionId`);
  const precisionLabel = selector(state, `${path}precisionLabel`);
  const precisionSize = selector(state, `${path}precisionSize`);
  const precisionCodeValue = selector(state, `${path}precisionCodeValue`);
  const isPrecision = selector(state, `${path}isPrecision`);
  const codesListsStore = state.appState.activeCodeListsById;
  const { isSearchDisable } = state;
  let currentCodesListsStore;

  if (codesListsStore[currentId]) {
    currentCodesListsStore = {
      ...codesListsStore,
      [currentId]: {
        ...codesListsStore[currentId],
        label: currentLabel,
        precisionId,
        precisionLabel,
        precisionSize,
      },
    };
  } else {
    currentCodesListsStore = codesListsStore;
  }

  const collectedVariablesIds = new Set();
  for (const collectedVariable of collectedVariables) {
    collectedVariablesIds.add(collectedVariable.id);
  }

  const precision =
    currentId && currentCodesListsStore[currentId]
      ? Object.entries(
          currentCodesListsStore[currentId].precisionByCollectedVariableId,
        ).find(([key]) => collectedVariablesIds.has(key))?.[1]
      : undefined;

  const codeValues =
    currentId && currentCodesListsStore[currentId]?.codes
      ? Object.values(currentCodesListsStore[currentId].codes).map(
          (code) => code.value,
        )
      : [];

  return {
    path,
    currentId,
    currentCodesListsStore,
    codesListsStore,
    codeValues,
    isSearchDisable,
    isPrecision,
    currentCodes: selector(state, `${path}codes`),
    precision,
    precisionCodeValue,
    precisionLabel,
  };
};

const mapDispatchToProps = {
  clearSearchResult,
  change: change,
  arrayRemoveAll: arrayRemoveAll,
};

const CodesListsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodesLists);

CodesListsContainer.propTypes = propTypes;
CodesListsContainer.defaultProps = defaultProps;

export default CodesListsContainer;
