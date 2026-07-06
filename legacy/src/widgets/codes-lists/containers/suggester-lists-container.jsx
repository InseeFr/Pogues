import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { arrayRemoveAll, change, formValueSelector } from 'redux-form';

import { loadNomenclaturesIfNeeded } from '../../../actions/metadata';
import {
  DEFAULT_FORM_NAME,
  DEFAULT_NOMENCLATURE_SELECTOR_PATH,
} from '../../../constants/pogues-constants';
import { getCurrentSelectorPath } from '../../../utils/widget-utils';
import {
  NOMENCLATURE_FIELDS,
  SuggesterLists,
} from '../components/suggester-lists';

const propTypes = {
  selectorPathParent: PropTypes.string,
  selectorPath: PropTypes.string,
  formName: PropTypes.string,
};

const defaultProps = {
  selectorPathParent: '',
  selectorPath: DEFAULT_NOMENCLATURE_SELECTOR_PATH,
  formName: DEFAULT_FORM_NAME,
};

const mapDispatchToProps = {
  loadNomenclaturesIfNeeded,
  change: change,
  arrayRemoveAll: arrayRemoveAll,
};

const getSuggesterFormValues = (state, selector, basePath) => {
  const result = {};
  for (const field of NOMENCLATURE_FIELDS) {
    result[field] = selector(state, `${basePath}${field}`);
  }
  return result;
};

const mapStateToProps = (
  state,
  { selectorPathParent, selectorPath, formName },
) => {
  const codesListsStore = state.appState.activeCodeListsById;
  const selector = formValueSelector(formName);
  const path = `${getCurrentSelectorPath(selectorPathParent)}${selectorPath}.`;

  const { id: currentId, label: currentLabel } = getSuggesterFormValues(
    state,
    selector,
    path,
  );

  const currentCodesListsStore =
    currentLabel !== ''
      ? {
          ...codesListsStore,
          [currentId]: {
            ...codesListsStore[currentId],
            ...getSuggesterFormValues(state, selector, path),
          },
        }
      : codesListsStore;
  return {
    nomenclatures: state.metadataByType.nomenclatures,
    path,
    currentId,
    currentLabel,
    selectorPath: DEFAULT_NOMENCLATURE_SELECTOR_PATH,
    codesListsStore,
    currentCodesListsStore,
  };
};

const SuggesterListsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuggesterLists);

SuggesterListsContainer.propTypes = propTypes;
SuggesterListsContainer.defaultProps = defaultProps;

export default SuggesterListsContainer;
