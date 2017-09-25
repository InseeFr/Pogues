import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Select from 'layout/forms/controls/select';

const mapStateToProps = (state, { type }) => ({
  dataList: state.dataByType[type] || [],
});

function SelectDataContainer({ dataList, name, id, label, emptyValue, mapDataFunction }) {
  return (
    <Field
      name={name}
      // id={id}
      label={label}
      emptyValue={emptyValue}
      component={Select}
      options={dataList.map(mapDataFunction)}
    />
  );
}

SelectDataContainer.propTypes = {
  mapDataFunction: PropTypes.func.isRequired,
  dataList: PropTypes.array,
  name: PropTypes.string.isRequired,
  // id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  emptyValue: PropTypes.string,
};

SelectDataContainer.defaultProps = {
  dataList: [],
  emptyValue: '',
};

export default connect(mapStateToProps)(SelectDataContainer);
