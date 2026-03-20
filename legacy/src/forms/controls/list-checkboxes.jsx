import { Component } from 'react';

import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import ClassSet from 'react-classset';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

import {
  getControlId,
  getValuesFromGenericOptions,
  removeValueInList,
  toggleValueInList,
} from '../../utils/widget-utils';

// PropTypes and defaultProps

export const propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  noValuesMessage: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  inline: PropTypes.bool.isRequired,
};

export const defaultProps = {
  required: false,
  disabled: false,
  children: [],
  noValuesMessage: undefined,
  inline: false,
};

// Component

class ListCheckboxes extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    const values = props.input.value;
    this.state = {
      listCheckValues:
        values !== '' && values.length > 0 ? values.split(',') : [],
      options: getValuesFromGenericOptions(props.children),
    };

    this.toggleCheck = this.toggleCheck.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const newValues = this.props.input.value;
    if (prevProps.input.value !== newValues) {
      // update the [] value into the string one we want to send to the form
      this.setState({
        listCheckValues:
          newValues !== '' && newValues.length > 0 ? newValues.split(',') : [],
      });
    }

    const options = getValuesFromGenericOptions(this.props.children);
    if (!isEqual(prevState.options, options)) {
      this.setState({
        options,
      });

      // check if the options changed and we need to untoggle a value because
      // it does not exist anymore
      let newValues = [...this.state.listCheckValues];
      let hasChanged = false;
      for (const oldOption of prevState.options) {
        // check if this previous option is still present
        let optionStillExist = false;
        for (const newOption of options) {
          if (
            oldOption.label === newOption.label &&
            oldOption.value === newOption.value
          ) {
            optionStillExist = true;
            break;
          }
        }
        if (optionStillExist) continue;

        // option has been removed -> remove it from values
        newValues = removeValueInList(newValues, oldOption.value);
        hasChanged = true;
      }
      if (hasChanged) {
        this.props.input.onChange(newValues.join());
      }
    }
  }

  toggleCheck(checkValue) {
    this.props.input.onChange(
      toggleValueInList(this.state.listCheckValues, checkValue).join(),
    );
  }

  render() {
    const {
      label,
      required,
      disabled,
      noValuesMessage,
      children,
      input,
      meta: { touched, error },
      inline,
    } = this.props;
    const values = getValuesFromGenericOptions(children);

    return (
      <div className="ctrl-list-checkboxes">
        <label
          htmlFor={getControlId(
            'checkbox',
            input.name,
            values[0] && values[0].value,
          )}
        >
          {label}
          {required && <span className="ctrl-required">*</span>}
        </label>
        <div>
          <input type="hidden" name={input.name} />
          {/* No values */}
          {values.length === 0 && noValuesMessage && (
            <div>
              <span>{noValuesMessage}</span>
            </div>
          )}

          {values.map((val) => {
            const { label, value, ...otherProps } = val;
            const id = getControlId('checkbox', input.name, value);

            return (
              <div
                className={ClassSet({
                  ['form-check-inline']: inline,
                })}
                key={id}
              >
                <label htmlFor={id} className="form-check-label">
                  <input
                    {...otherProps}
                    type="checkbox"
                    id={id}
                    value={value}
                    checked={
                      this.state.listCheckValues.indexOf(value) !== -1
                        ? 'checked'
                        : false
                    }
                    onChange={() => {
                      this.toggleCheck(value);
                    }}
                    disabled={disabled}
                  />
                  {label}
                </label>
              </div>
            );
          })}
          {touched && error && <span className="form-error">{error}</span>}
        </div>
      </div>
    );
  }
}

export default ListCheckboxes;
