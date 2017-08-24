import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    emptyValue: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object.isRequired,
  };

  static defaultProps = {
    required: false,
    options: [],
    emptyValue: '',
  };

  render() {
    const { input, label, required, options, emptyValue, meta: { touched, error } } = this.props;
    const listOptions = options.map(op =>
      <option key={op.value} value={op.value}>
        {op.label}
      </option>
    );

    if (emptyValue !== '') {
      listOptions.unshift(
        <option key="-1" value="">
          {emptyValue}
        </option>
      );
    }

    return (
      <div className="ctrl-select">
        <label htmlFor={`select-${input.name}`}>
          {label}
          {required ? <span>*</span> : ''}
        </label>
        <div>
          <select {...input} id={`select-${input.name}`} placeholder={label}>
            {listOptions}
          </select>
          {touched &&
            (error &&
              <span className="form-error">
                {error}
              </span>)}
        </div>
      </div>
    );
  }
}

export default Select;
