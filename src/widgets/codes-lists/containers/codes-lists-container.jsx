import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, actions } from 'redux-form';

import CodesLists from '../components/codes-lists';

import { getCurrentSelectorPath } from 'utils/widget-utils';
import {
  DEFAULT_FORM_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH
} from 'constants/pogues-constants';
import { clearSearchResult } from 'actions/search';

// PropTypes and defaultProps

const propTypes = {
  selectorPathParent: PropTypes.string,
  selectorPath: PropTypes.string,
  formName: PropTypes.string
};

export const defaultProps = {
  selectorPathParent: '',
  selectorPath: DEFAULT_CODES_LIST_SELECTOR_PATH,
  formName: DEFAULT_FORM_NAME
};

// Container

export const mapStateToProps = (
  state,
  { selectorPathParent, selectorPath, formName }
) => {
  const selector = formValueSelector(formName);
  const path = `${getCurrentSelectorPath(selectorPathParent)}${selectorPath}.`;
  const currentId = selector(state, `${path}id`);
  const currentLabel = selector(state, `${path}label`);
  const codesListsStore = state.appState.activeCodeListsById;
  let currentCodesListsStore;

  if (codesListsStore[currentId]) {
    currentCodesListsStore = {
      ...codesListsStore,
      [currentId]: { ...codesListsStore[currentId], label: currentLabel }
    };
  } else {
    currentCodesListsStore = codesListsStore;
  }

  return {
    path,
    currentId,
    currentCodesListsStore,
    codesListsStore,
    activePanel: selector(state, `${path}panel`),
    currentCodes: selector(state, `${path}codes`)
  };
};

const mapDispatchToProps = {
  clearSearchResult,
  change: actions.change,
  arrayPush: actions.arrayPush,
  arrayRemoveAll: actions.arrayRemoveAll
};

const CodesListsContainer = connect(mapStateToProps, mapDispatchToProps)(
  CodesLists
);

CodesListsContainer.propTypes = propTypes;
CodesListsContainer.defaultProps = defaultProps;

export default CodesListsContainer;
