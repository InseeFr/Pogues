import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Select from 'layout/forms/controls/select';
import ListRadioButtons from 'layout/forms/controls/list-radio-buttons';

function ComponentSelectorByType({ activeComponentType, label, components, radio }) {
  const componentsRendered = components.map(comp => {
    const style = {
      display: activeComponentType === comp.value ? 'block' : 'none',
    };
    return <div key={comp.id} style={style}>{comp.content}</div>;
  });
  const selector = radio
    ? <Field name="type" component={ListRadioButtons} label={label} radios={components} required />
    : <Field name="type" component={Select} label={label} options={components} required />;

  return (
    <div>
      {selector}
      {componentsRendered}
    </div>
  );
}

ComponentSelectorByType.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  activeComponentType: PropTypes.string,
  radio: PropTypes.bool,
};

ComponentSelectorByType.defaultProps = {
  activeComponentType: '',
  radio: false,
};

export default ComponentSelectorByType;
