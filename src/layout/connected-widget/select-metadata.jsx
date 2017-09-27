import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Select from 'layout/forms/controls/select';

const mapStateToProps = (state, { type }) => ({
  meatadata: state.metadataByType[type] || [],
});

function SelectMetadataContainer({ meatadata, name, label, emptyValue, mapMetadataFunction }) {
  return (
    <Field
      name={name}
      label={label}
      emptyValue={emptyValue}
      component={Select}
      options={meatadata.map(mapMetadataFunction)}
    />
  );
}

SelectMetadataContainer.propTypes = {
  mapMetadataFunction: PropTypes.func.isRequired,
  meatadata: PropTypes.array,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  emptyValue: PropTypes.string,
};

SelectMetadataContainer.defaultProps = {
  meatadata: [],
  emptyValue: '',
};

export default connect(mapStateToProps)(SelectMetadataContainer);
