import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';

import OptionalView from './components/optional-view';

const mapStateToProps = (state, { selectorPath, name, formName }) => {
  formName = formName || 'question';
  const selector = formValueSelector(formName);
  return {
    active: selector(state, `${selectorPath}.${name}`) === '1',
  };
};

function OptionalViewContainer({ name, label, view, checkbox, active }) {
  return <OptionalView name={name} label={label} view={view} checkbox={checkbox} active={active} />;
}

OptionalViewContainer.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  view: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  checkbox: PropTypes.bool,
};

OptionalViewContainer.defaultProps = {
  checkbox: false,
};

export default connect(mapStateToProps)(OptionalViewContainer);
