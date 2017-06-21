// @TODO: Create tests

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
  };

  static defaultProps = {
    required: false,
    options: [],
  };

  render() {
    const { input, label, required } = this.props;

    return (
      <div className="ctrl-input">
        <label htmlFor={`select-${input.name}`}>{label}{required ? <span>*</span> : ''}</label>
        <div>
          <textarea {...input} id={`select-${input.name}`}>
          </textarea>
          <ul className="rich-textarea-toolbox">
              <li><button aria-label="bold"><span className="glyphicon glyphicon-bold" aria-hidden="true"></span></button></li>
              <li><button aria-label="italic"><span className="glyphicon glyphicon-italic" aria-hidden="true"></span></button></li>
              <li><button aria-label="link"><span className="glyphicon glyphicon-link" aria-hidden="true"></span></button></li>
              <li><button aria-label="???"><span className="glyphicon glyphicon-comment" aria-hidden="true"></span></button></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Select;
