import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, actions } from 'redux-form';

import CodesLists from '../components/codes-lists';

import { getCurrentSelectorPath } from 'utils/widget-utils';
import { DEFAULT_FORM_NAME, DEFAULT_CODES_LIST_SELECTOR_PATH } from 'constants/pogues-constants';

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

export const mapStateToProps = (state, { selectorPathParent, selectorPath, formName }) => {
  const selector = formValueSelector(formName);
  const path = `${getCurrentSelectorPath(selectorPathParent)}${selectorPath}.`

  return {
    path,
    codesListsStore: state.appState.activeCodeListsById,
    activePanel: selector(state, `${path}panel`),
    currentId: selector(state, `${path}id`),
    currentCodes: selector(state, `${path}codes`),
  };
};

const mapDispatchToProps = {
  change: actions.change,
  arrayPush: actions.arrayPush,
};

const CodesListsContainer = connect(mapStateToProps, mapDispatchToProps)(CodesLists);

CodesListsContainer.propTypes = propTypes;
CodesListsContainer.defaultProps = defaultProps;

export default CodesListsContainer;
