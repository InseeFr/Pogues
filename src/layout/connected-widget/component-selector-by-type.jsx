import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import ComponentSelectorByType from 'layout/connected-widget/components/component-selector-by-type';

const mapStateToProps = (state, { components, label, selectorPath, formName }) => {
  formName = formName || 'question';
  const selector = formValueSelector(formName);
  const activeComponentSelectorPath = selectorPath ? `${selectorPath}.type` : '';
  return {
    activeComponentType: selector(state, activeComponentSelectorPath),
    components: components,
    label: label,
  };
};

function ComponentSelectorByTypeContainer({ activeComponentType, label, components, radio }) {
  return (
    <ComponentSelectorByType
      radio={radio}
      label={label}
      components={components}
      activeComponentType={activeComponentType}
    />
  );
}

ComponentSelectorByTypeContainer.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  activeComponentType: PropTypes.string,
  radio: PropTypes.bool,
};

ComponentSelectorByTypeContainer.defaultProps = {
  activeComponentType: '',
  radio: false,
};

export default connect(mapStateToProps)(ComponentSelectorByTypeContainer);
