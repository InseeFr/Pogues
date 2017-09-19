import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import TreeSelect from 'layout/forms/controls/tree-select';
import Dictionary from 'utils/dictionary/dictionary';

function TreeSelectGoto({ listGotos, emptyValue }) {
  return (
    <Field
      name="cible"
      id="redirection_cible"
      component={TreeSelect}
      label={Dictionary.target}
      options={listGotos}
      emptyValue={emptyValue}
    />
  );
}

TreeSelectGoto.propTypes = {
  listGotos: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyValue: PropTypes.string,
};

TreeSelectGoto.defaultProps = {
  emptyValue: '',
};

export default TreeSelectGoto;
