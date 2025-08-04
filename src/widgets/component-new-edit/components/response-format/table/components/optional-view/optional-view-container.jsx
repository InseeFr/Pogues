import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import { DEFAULT_FORM_NAME } from '../../../../../../../constants/pogues-constants';
import OptionalView from './optional-view';

// PropTypes and defaultProps

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  formName: PropTypes.string,
  checkbox: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

export const defaultProps = {
  formName: DEFAULT_FORM_NAME,
  checkbox: false,
};

// Container

const mapStateToProps = (state, { selectorPath, name, formName, checkbox }) => {
  const selector = formValueSelector(formName);
  return {
    active: checkbox
      ? selector(state, `${selectorPath}.${name}`)
      : selector(state, `${selectorPath}.${name}`) === '1',
  };
};

const OptionalViewContainer = connect(mapStateToProps)(OptionalView);

OptionalViewContainer.propTypes = propTypes;
OptionalViewContainer.defaultProps = defaultProps;

export default OptionalViewContainer;
