import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';

import OptionalView from './components/optional-view';

const mapStateToProps = (state, { selectorPath, name, formName, checkbox }) => {
  formName = formName || 'component';
  const selector = formValueSelector(formName);
  const active = checkbox
    ? selector(state, `${selectorPath}.${name}`)
    : selector(state, `${selectorPath}.${name}`) === '1';
  return {
    active,
  };
};

function OptionalViewContainer({ name, label, view, checkbox, active }) {
  return <OptionalView name={name} label={label} view={view} checkbox={checkbox} active={active} />;
}

OptionalViewContainer.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  view: PropTypes.object.isRequired,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkbox: PropTypes.bool,
};

OptionalViewContainer.defaultProps = {
  checkbox: false,
  active: false,
};

export default connect(mapStateToProps)(OptionalViewContainer);
