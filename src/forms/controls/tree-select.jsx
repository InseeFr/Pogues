import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ClassSet from 'react-classset';
import debounce from 'lodash.debounce';

import { CONTROL_TREE_SELECT } from 'constants/dom-constants';

const { COMPONENT_CLASS } = CONTROL_TREE_SELECT;

// PropTypes and defaultProps

export const propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  emptyValue: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  meta: PropTypes.object.isRequired,
};

export const defaultProps = {
  required: false,
  options: [],
  emptyValue: '',
};

// Control
const TreeSelect = props => {
  const {
    input,
    label,
    required,
    emptyValue,
    meta: { touched, error },
  } = props;

  const inputSearchRef = useRef(null);

  const filterOptions = (options, q) => {
    return q !== '' ? options.filter(o => o.label.indexOf(q) !== -1) : options;
  };

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [optionsState, setOptionsState] = useState(props.options);
 
	useEffect(() => {
    setFilteredOptions(filterOptions(props.options, ''))
  }, [optionsState]);

  const updateListOptions = () => {
    setFilteredOptions(filterOptions(props.options, inputSearchRef.current.value))
  };

  const selectValue = (value = '') => {
    props.input.onChange(value);
  };
  
  const listOptions = filteredOptions.map(op => {
    const padding = Array(op.depth + 1).join('-');
    const isSelectedValue = op.value === input.value;
    const value = op.value;
    return (
      <li
        key={value}
        className={ClassSet({
          selected: isSelectedValue,
          disabled: op.disabled,
        })}
        onClick={event => {
          event.preventDefault();
          if (!op.disabled) selectValue(value);
        }}
      >
        {`${padding} ${op.label}`}
      </li>
    );
  });

  if (emptyValue !== '') {
    listOptions.unshift(
      <li
        key="-1"
        onClick={event => {
          event.preventDefault();
          selectValue();
        }}
      >
        {emptyValue}
      </li>,
    );
  }

  return (
    <div className={COMPONENT_CLASS}>
      <label htmlFor={`select-${input.name}`}>
        {label}
        {required ? <span>*</span> : ''}
      </label>
      <div>
        <input type="hidden" name={input.name} />
        <input
          type="text"
          onChange={debounce(updateListOptions, 150)}
          ref={inputSearchRef}
        />
        <ul> {listOptions} </ul>

        {touched && (error && <span className="form-error">{error}</span>)}
      </div>
    </div>
  );
}

export default TreeSelect;
