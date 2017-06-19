import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Select from 'components/forms/controls/select';
import { uuid } from 'utils/data-utils';

function ComponentSelectorByType({ activeComponentType, label, components }) {
  const componentsRendered = components.map(comp => {
    const style = {
      display: activeComponentType === comp.value ? 'block' : 'none',
    };
    return <div key={uuid()} style={style}>{comp.content}</div>;
  });

  return (
    <div>
      <Field name="type" component={Select} label={label} options={components} required />
      {componentsRendered}
    </div>
  );
}

ComponentSelectorByType.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  activeComponentType: PropTypes.string,
};

ComponentSelectorByType.defaultProps = {
  activeComponentType: '',
};

export default ComponentSelectorByType;
