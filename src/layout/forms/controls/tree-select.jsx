import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassSet from 'react-classset';
import isEqual from 'lodash.isequal';
import debounce from 'lodash.debounce';

class TreeSelect extends Component {
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

  static filterOptions = (options, q) => {
    return q !== '' ? options.filter(o => o.label.indexOf(q) !== -1) : options;
  };

  constructor(props) {
    super(props);

    this.state = {
      filteredOptions: [],
    };

    this.selectValue = this.selectValue.bind(this);
    this.updateListOptions = this.updateListOptions.bind(this);
  }

  componentWillMount() {
    this.setState({
      filteredOptions: TreeSelect.filterOptions(this.props.options, ''),
    });
  }

  updateListOptions() {
    this.setState({
      ...this.state,
      filteredOptions: TreeSelect.filterOptions(this.props.options, this.inputSearch.value),
    });
  }

  selectValue(value = '') {
    this.props.input.onChange(value);
  }

  render() {
    const { input, label, required, emptyValue, meta: { touched, error } } = this.props;
    const listOptions = this.state.filteredOptions.map(op => {
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
            if (!op.disabled) this.selectValue(value);
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
            this.selectValue();
          }}
        >
          {emptyValue}
        </li>
      );
    }

    return (
      <div className="ctrl-tree-select">
        <label htmlFor={`select-${input.name}`}>
          {label}
          {required ? <span>*</span> : ''}
        </label>
        <div>
          <input type="hidden" name={input.name} />
          <input
            type="text"
            onChange={debounce(this.updateListOptions, 150)}
            ref={inputSearch => {
              this.inputSearch = inputSearch;
            }}
          />
          <ul> {listOptions} </ul>

          {touched && (error && <span className="form-error">{error}</span>)}
        </div>
      </div>
    );
  }
}

export default TreeSelect;
