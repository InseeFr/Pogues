// @TODO: Create tests

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    required: false,
    options: [],
  };

  render() {
    const { input, label, required, options } = this.props;

    const listOptions = options.map(op => <option key={op.value} value={op.value}>{op.label}</option>);

    if (!required) {
      listOptions.unshift(<option key="-1" value="-1" />);
    }

    return (
      <div className="ctrl-select">
        <label htmlFor={`select-${input.name}`}>{label}{required ? <span>*</span> : ''}</label>
        <div>
          <select {...input} id={`select-${input.name}`} placeholder={label}>
            {listOptions}
          </select>
        </div>
      </div>
    );
  }
}

export default Select;
