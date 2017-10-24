import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValueSelector, actions } from 'redux-form';

import ListWithInputPanel from '../components/list-with-input-panel';

import { DEFAULT_FORM_NAME } from 'constants/pogues-constants';

// Proptypes and defaultProps

const propTypes = {
  formName: PropTypes.string,
  selectorPath: PropTypes.string.isRequired,
};

const defaultProps = {
  formName: DEFAULT_FORM_NAME,
};

// Container

export function mapStateToProps(state, { formName, selectorPath }) {
  const selector = formValueSelector(formName);
  return {
    formName,
    currentValues: selector(state, `${selectorPath}`),
  };
}

const mapDispatchToProps = {
  change: actions.change,
  arrayRemove: actions.arrayRemove,
  arrayPush: actions.arrayPush,
  arrayInsert: actions.arrayInsert,
};

const ListWithInputPanelContainer = connect(mapStateToProps, mapDispatchToProps)(ListWithInputPanel);

ListWithInputPanelContainer.propTypes = propTypes;
ListWithInputPanelContainer.defaultProps = defaultProps;

export default ListWithInputPanelContainer;
