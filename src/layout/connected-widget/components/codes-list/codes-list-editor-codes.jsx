import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';
import { required } from 'layout/forms/validation-rules';

const Code = ({ input, label, type, attr, meta: { touched, error, warning } }) =>
  <div className={`codes-list__code-${attr}`}>
    <input {...input} placeholder={label} type={type} />
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
};

function CodesListEditorCodes({ fields, display }) {
  return (
    <ul style={{ display: display ? 'block' : 'none' }}>
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
              validate={[required]}
              label={Dictionary.code}
            />
            <Field
              attr="label"
              name={`${name}.label`}
              type="text"
              component={Code}
              placeholder={Dictionary.codeLabel}
              validate={[required]}
              label={Dictionary.codeLabel}
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
              <button type="button" title={Dictionary.duplicate}>
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
          <button title={Dictionary.addSpecialCode} type="button" onClick={() => fields.push({})}>
            <span className="glyphicon glyphicon-plus" />
            {Dictionary.addSpecialCode}
          </button>
        </div>
      </li>
    </ul>
  );
}

CodesListEditorCodes.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default CodesListEditorCodes;
