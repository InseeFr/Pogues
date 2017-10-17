import React from 'react';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';
/* eslint-disable jsx-a11y/no-static-element-interactions */

// Matches any '${foooo' patterns
const InputRegex = /[[(]?\${\w+\b[\])]?(?!\})/;

class InputWithSuggestions extends React.Component {
  constructor() {
    super();
    this.state = { suggestions: [] };
  }

  // OnChange of the input
  handleChange = e => {
    const matches = e.target.value.match(InputRegex);
    if (matches) {
      this.setState({
        suggestions: this.props.availableSuggestions.filter(suggestion => suggestion.includes(matches[0].substring(2))),
      });
    } else {
      this.setState({ suggestions: [] });
    }

    // Execute default code afterwards
    if (this.props.input.onChange) this.props.input.onChange(e);
  };

  // Replaces first ${xxxx pattern by ${selectedValue}
  replaceFirstTemplateAvailable = t => () => {
    const currentValue = this.props.input.value;
    this.props.input.onChange(currentValue.replace(InputRegex, `\${${t}}`));
    // Reset suggestions afterwards
    this.setState({ suggestions: [] });
  };

  render() {
    const customProps = {
      ref: this.props.reference,
      id: this.props.id !== '' ? `input-${this.props.input.id}` : `input-${this.props.input.name}`,
      placeholder: this.props.placeholder || this.props.label,
      type: this.props.type,
      onChange: this.handleChange,
    };

    if (this.propsavoidSubmitOnEnter) {
      customProps.onKeyPress = e => {
        e.key === 'Enter' && e.preventDefault();
      };
    }

    const helpBlock = this.props.help ? (
      <span className="help-block">
        <span className="glyphicon glyphicon-question-sign" aria-hidden="true" /> {Dictionary.HELP}{' '}
      </span>
    ) : (
      ''
    );
    return (
      <div className="ctrl-input">
        {this.props.label && (
          <label htmlFor={customProps.id}>
            {this.props.label}
            {this.props.required ? <span>*</span> : ''}
            {helpBlock}
          </label>
        )}

        <div>
          <input {...this.props.input} {...customProps} />
          {this.props.meta.touched &&
            ((this.props.meta.error && <span className="form-error">{this.props.meta.error}</span>) ||
              (this.props.meta.warning && <span className="form-warm">{this.props.meta.warning}</span>))}
          {this.state.suggestions.length > 0 && (
            <div className="input-suggestion-wrapper">
              {this.state.suggestions.map(suggest => (
                <div
                  key={`suggestion-key-${suggest}`}
                  onClick={this.replaceFirstTemplateAvailable(suggest)}
                  role="button"
                  className="input-suggestion"
                >
                  {' '}
                  {suggest}{' '}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

InputWithSuggestions.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  avoidSubmitOnEnter: PropTypes.bool,
  meta: PropTypes.object,
  reference: PropTypes.func,
  id: PropTypes.string,
  help: PropTypes.bool,
  placeholder: PropTypes.string,
  availableSuggestions: PropTypes.arrayOf(PropTypes.string),
};

InputWithSuggestions.defaultProps = {
  required: false,
  avoidSubmitOnEnter: true,
  meta: {},
  reference: undefined,
  id: '',
  help: false,
  placeholder: '',
  label: '',
  availableSuggestions: undefined,
};

export default InputWithSuggestions;
