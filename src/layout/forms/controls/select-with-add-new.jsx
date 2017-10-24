// @TODO: Create tests

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';

class SelectWithAddNew extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    options: PropTypes.array,
    label: PropTypes.string.isRequired,
    labelButton: PropTypes.string.isRequired,
    required: PropTypes.bool,
    emptyValue: PropTypes.string,
    name: PropTypes.string,
  };

  static defaultProps = {
    options: [],
    required: false,
    emptyValue: '',
    name: '',
  };

  constructor(props) {
    super(props);

    this.handleToggleShowAddNew = this.handleToggleShowAddNew.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);

    this.state = {
      showAddNew: false,
      options: this.addBlankOption(this.props.options),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options && nextProps.options[0].value !== '-1') {
      this.setState({
        options: this.addBlankOption(nextProps.options),
      });
    }
  }

  addBlankOption(options) {
    if (!this.props.required) {
      options.unshift({ value: '-1', label: this.props.emptyValue });
    }
    return options;
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
    const { name, required, label, labelButton, input } = this.props;
    const listOptions = this.state.options.map(op =>
      <option key={op.value} value={op.value}>
        {op.label}
      </option>
    );

    return (
      <div className="ctrl-select-with-add-new">
        <label htmlFor={`select-${name}`}>
          {label}
          {required ? <span>*</span> : ''}
        </label>
        <div>
          {!this.state.showAddNew
            ? <select {...input} id={`select-${name}`}>
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
              <button className="btn btn-yellow" onClick={this.handleToggleShowAddNew}>
                {labelButton}
              </button>
            </div>
          : <div className="form-actions">
              <button className="btn btn-success" onClick={this.handleAddNew}>
                {Dictionary.create}
              </button>
              <button className="btn btn-danger" onClick={this.handleToggleShowAddNew}>
                {Dictionary.cancel}
              </button>
            </div>}
      </div>
    );
  }
}

export default SelectWithAddNew;
