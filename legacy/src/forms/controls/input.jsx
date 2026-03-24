import { Component } from 'react';

import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import { getControlId } from '../../utils/widget-utils';

// PropTypes and defaultProps

export const propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  focusOnInit: PropTypes.bool,
  reference: PropTypes.func,
  onEnter: PropTypes.func,
};

export const defaultProps = {
  label: '',
  placeholder: '',
  className: '',
  required: false,
  disabled: false,
  focusOnInit: false,
  reference: undefined,
  onEnter: undefined,
};

class Input extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  componentDidMount() {
    if (this.props.focusOnInit) this.input.focus();
    if (this.props.reference) this.props.reference(this.input);
  }

  render() {
    const {
      className,
      type,
      label,
      placeholder,
      required,
      disabled,
      input,
      // eslint-disable-next-line no-unused-vars
      focusOnInit,
      meta: { touched, error },
      onEnter,
      ...otherProps
    } = this.props;
    const id = getControlId('input', input.name);
    return (
      <div className={`ctrl-input ${className}`}>
        <label htmlFor={id}>
          {label}
          {required && <span className="ctrl-required">*</span>}
        </label>

        <div>
          <input
            {...otherProps}
            {...input}
            type={type}
            id={id}
            placeholder={placeholder !== '' || label}
            disabled={disabled}
            ref={(node) => {
              this.input = node;
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && onEnter) {
                onEnter(event);
              }
            }}
          />

          {touched && error && <span className="form-error">{error}</span>}
        </div>
      </div>
    );
  }
}

export default Input;
