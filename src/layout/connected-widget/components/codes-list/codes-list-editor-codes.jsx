import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';
import TextArea from 'layout/forms/controls/rich-textarea';

const Code = ({ input, autoFocus, label, type, attr, meta: { touched, error, warning } }) =>
  <div className={`codes-list__code-${attr} `}>
    <input
      {...input}
      placeholder={label}
      type={type}
      autoFocus={autoFocus}
      onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
    />
    {touched &&
      ((error &&
        <span className="form-error">
          {error}
        </span>) ||
        (warning &&
          <span className="form-warm">
            {warning}
          </span>))}
  </div>;

Code.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  attr: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  autoFocus: PropTypes.bool,
};
Code.defaultProps = {
  autoFocus: false,
};

class CodesListEditorCodes extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    display: PropTypes.bool.isRequired,
    meta: PropTypes.object.isRequired,
  };
  componentWillReceiveProps(nextProps) {
    const { display, fields } = nextProps;
    if (display && fields.length === 0) {
      fields.push({});
    } else if (!display && fields.length === 1 && !fields.get(0).code) {
      fields.removeAll();
    }
  }
  render() {
    const { fields, display, meta: { error } } = this.props;

    return (
      <div>
        {error &&
          <p className="error-block">
            {Dictionary.codeUnicity}
          </p>}
        <ul className={display ? '' : 'hide'}>
          {fields.map((name, index, fields) => {
            const numCodes = fields.length;
            const showMoveUpButton = index !== 0 && numCodes > 1;
            const showMoveDownButton = index !== numCodes - 1 && numCodes > 1;

            return (
              <li key={index}>
                <Field name={`${name}.id`} type="hidden" component="input" />
                <Field
                  attr="code"
                  name={`${name}.code`}
                  type="text"
                  component={Code}
                  placeholder={Dictionary.code}
                  label={Dictionary.code}
                  autoFocus={display && index === 0}
                />
                <Field
                  attr="label"
                  name={`${name}.label`}
                  type="text"
                  component={TextArea}
                  buttons
                  identifier={fields.get(index).code}
                />
                <div className="codes-list__code-actions">
                  <button
                    type="button"
                    title={Dictionary.moveup}
                    onClick={() => fields.move(index, index - 1)}
                    disabled={!showMoveUpButton}
                  >
                    <span className="glyphicon glyphicon-arrow-up" />
                  </button>
                  <button
                    type="button"
                    title={Dictionary.movedown}
                    onClick={() => fields.move(index, index + 1)}
                    disabled={!showMoveDownButton}
                  >
                    <span className="glyphicon glyphicon-arrow-down" />
                  </button>
                  <button
                    type="button"
                    title={Dictionary.duplicate}
                    onClick={() => fields.insert(index + 1, Object.assign({}, fields.get(index)))}
                  >
                    {Dictionary.duplicate}
                    <span className="glyphicon glyphicon-duplicate" />
                  </button>
                  <button type="button" title={Dictionary.remove} onClick={() => fields.remove(index)}>
                    {Dictionary.remove}
                    <span className="glyphicon glyphicon-trash" />
                  </button>
                </div>
              </li>
            );
          })}
          <li>
            <div className="codes-list__add-code">
              <button title={Dictionary.addCode} type="button" onClick={() => fields.push({})}>
                <span className="glyphicon glyphicon-plus" />
                {Dictionary.addCode}
              </button>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
export default CodesListEditorCodes;
