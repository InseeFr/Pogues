import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { arrayRemoveAll, change, formValueSelector } from 'redux-form';

import {
  loadNomenclature,
  loadNomenclaturesIfNeeded,
} from '../../../actions/metadata';
import {
  DEFAULT_FORM_NAME,
  DEFAULT_NOMENCLATURE_SELECTOR_PATH,
} from '../../../constants/pogues-constants';
import { getCurrentSelectorPath } from '../../../utils/widget-utils';
import { SuggesterLists } from '../components/suggester-lists';

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
  loadNomenclature,
  change: change,
  arrayRemoveAll: arrayRemoveAll,
};

const mapStateToProps = (
  state,
  { selectorPathParent, selectorPath, formName },
) => {
  const codesListsStore = state.appState.activeCodeListsById;
  const selector = formValueSelector(formName);
  const path = `${getCurrentSelectorPath(selectorPathParent)}${selectorPath}.`;
  const currentId = selector(state, `${path}id`);
  const currentLabel = selector(state, `${path}label`);
  const currentName = selector(state, `${path}name`);
  const currentUrn = selector(state, `${path}urn`);
  const currentSuggesterParameters = selector(
    state,
    `${path}suggesterParameters`,
  );

  const currentCodesListsStore =
    currentLabel !== ''
      ? {
          ...codesListsStore,
          [currentId]: {
            ...codesListsStore[currentId],
            name: currentName,
            label: currentLabel,
            urn: currentUrn,
            suggesterParameters: currentSuggesterParameters,
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
