import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Select from 'forms/controls/select';
import GenericOption from 'forms/controls/generic-option';

const mapStateToProps = (state, { type }) => ({
  meatadata: Object.keys(state.metadataByType[type] || {}).map(
    key => state.metadataByType[type][key]
  )
});

function SelectMetadataContainer({
  meatadata,
  name,
  label,
  emptyValue,
  mapMetadataFunction
}) {
  return (
    <Field name={name} label={label} emptyValue={emptyValue} component={Select}>
      {emptyValue !== '' && (
        <GenericOption key="" value="">
          {emptyValue}
        </GenericOption>
      )}
      {meatadata.map(mapMetadataFunction).map(m => (
        <GenericOption key={m.value} value={m.value}>
          {m.label}
        </GenericOption>
      ))}
    </Field>
  );
}

SelectMetadataContainer.propTypes = {
  mapMetadataFunction: PropTypes.func.isRequired,
  meatadata: PropTypes.array,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  emptyValue: PropTypes.string
};

SelectMetadataContainer.defaultProps = {
  meatadata: [],
  emptyValue: ''
};

export default connect(mapStateToProps)(SelectMetadataContainer);
