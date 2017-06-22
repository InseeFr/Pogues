import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import ComponentSelectorByType from 'layout/connected-widget/components/component-selector-by-type';

const selector = formValueSelector('question');

const mapStateToProps = (state, { components, label, selectorPath }) => ({
  activeComponentType: selector(state, `${selectorPath}.type`),
  components: components,
  label: label,
});

function ComponentSelectorByTypeContainer({ activeComponentType, label, components }) {
  return <ComponentSelectorByType label={label} components={components} activeComponentType={activeComponentType} />;
}

ComponentSelectorByTypeContainer.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  activeComponentType: PropTypes.string,
};

ComponentSelectorByTypeContainer.defaultProps = {
  activeComponentType: '',
};

export default connect(mapStateToProps)(ComponentSelectorByTypeContainer);
