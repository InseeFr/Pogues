// @TODO: Create tests

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectWithAddNew extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    options: PropTypes.array,
    label: PropTypes.string.isRequired,
    labelButton: PropTypes.string.isRequired,
    required: PropTypes.bool,
  };

  static defaultProps = {
    options: [],
    required: false,
  };

  constructor({ input, options, label, labelButton, required }) {
    super();

    if (!required) {
      options.unshift({ value: '-1', label: '' });
    }

    this.state = {
      showAddNew: false,
      options: options,
    };

    this.name = input.name;
    this.label = label;
    this.labelButton = labelButton;
    this.required = required;
    this.handleOnChange = input.onChange;

    this.handleToggleShowAddNew = this.handleToggleShowAddNew.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
  }

  handleToggleShowAddNew(event) {
    if (event) event.preventDefault();
    const newValue = !this.state.showAddNew;
    this.setState({ showAddNew: newValue });
  }

  handleAddNew(event) {
    event.preventDefault();
    // @TODO: It should persist the new value remotely
    const newOptions = [...this.state.options, { value: '', label: this.input.value }];

    this.setState({ options: newOptions });
    this.handleToggleShowAddNew();
  }

  render() {
    const listOptions = this.state.options.map(op => <option key={op.value} value={op.value}>{op.label}</option>);

    return (
      <div className="ctrl-select-with-add-new">
        <label htmlFor={`select-${this.name}`}>{this.label}{this.required ? <span>*</span> : ''}</label>
        <div>
          {!this.state.showAddNew
            ? <select id={`select-${this.name}`} onChange={this.handleOnChange}>
                {listOptions}
              </select>
            : <input
                type="text"
                ref={v => {
                  this.input = v;
                }}
              />}
        </div>
        {!this.state.showAddNew
          ? <div className="form-actions">
              <button className="btn btn-yellow" onClick={this.handleToggleShowAddNew}>{this.labelButton}</button>
            </div>
          : <div className="form-actions">
              <button className="btn btn-success" onClick={this.handleAddNew}>Create</button>
              <button className="btn btn-danger" onClick={this.handleToggleShowAddNew}>Cancel</button>
            </div>}
      </div>
    );
  }
}

export default SelectWithAddNew;
