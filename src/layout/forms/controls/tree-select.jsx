import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassSet from 'react-classset';
import isEqual from 'lodash.isequal';

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

  constructor(props) {
    super(props);

    this.state = {
      selectedValue: '',
    };

    this.items = {};

    this.selectValue = this.selectValue.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      const selectedValue = nextProps.input.value;
      const id = selectedValue !== '' ? selectedValue : '-1';
      this.setState({ selectedValue });
      this.items[id].scrollIntoView();
    }
  }

  selectValue(value = '') {
    this.props.input.onChange(value);
    this.setState({
      selectedValue: value,
    });
  }

  render() {
    const { input, label, required, options, emptyValue, meta: { touched, error } } = this.props;
    const listOptions = options.map(op => {
      const padding = Array(op.depth + 1).join('-');
      const isSelectedValue = op.value === this.state.selectedValue;
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
          ref={node => {
            this.items[value] = node;
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
          ref={node => {
            this.items['-1'] = node;
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
          <ul>
            {' '}{listOptions}{' '}
          </ul>

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

export default TreeSelect;
