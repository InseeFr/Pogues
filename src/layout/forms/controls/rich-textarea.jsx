import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';

/**
 * Component that will display a TextArea in a react-form Field component. 
 * We can add a help block thankt to the help attribute, and an actions toolbar
 * thanks to a button attribute.
 */
class Select extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    buttons: PropTypes.bool,
    help: PropTypes.bool,
  };

  static defaultProps = {
    required: false,
    buttons: false,
    options: [],
    help: false,
  };

  render() {
    const { input, label, required, buttons, help } = this.props;

    const helpBlock = help
      ? <span className="help-block">
          <span className="glyphicon glyphicon-question-sign" aria-hidden="true" /> {Dictionary.HELP}{' '}
        </span>
      : '';

    const actions = buttons
      ? <ul className="rich-textarea-toolbox">
          <li><button aria-label="bold"><span className="glyphicon glyphicon-bold" aria-hidden="true" /></button></li>
          <li>
            <button aria-label="italic"><span className="glyphicon glyphicon-italic" aria-hidden="true" /></button>
          </li>
          <li><button aria-label="link"><span className="glyphicon glyphicon-link" aria-hidden="true" /></button></li>
          <li><button aria-label="???"><span className="glyphicon glyphicon-comment" aria-hidden="true" /></button></li>
        </ul>
      : '';

    return (
      <div className="ctrl-input">
        <label htmlFor={`select-${input.name}`}>{label}{required ? <span>*</span> : ''} {helpBlock}</label>
        <div>
          <textarea {...input} id={`select-${input.name}`} />
          {actions}
        </div>
      </div>
    );
  }
}

export default Select;
