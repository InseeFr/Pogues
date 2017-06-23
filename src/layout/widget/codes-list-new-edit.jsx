import React, { Component } from 'react';
import { Field, FieldArray, FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'layout/forms/controls/input';
import { required } from 'layout/forms/validation-rules';

function renderListCodes({ fields }) {
  return (
    <ul>
      {fields.map((name, index, fields) => {
        const numCodes = fields.length;
        const showMoveUpButton = index !== 0 && numCodes > 1;
        const showMoveDownButton = index !== numCodes - 1 && numCodes > 1;

        return (
          <li key={index}>
            <Field name={`${name}.id`} type="hidden" component="input" />
            <Field name={`${name}.code`} type="text" component="input" placeholder="Code" />
            <Field name={`${name}.label`} type="text" component="input" placeholder="Label" />
            <button type="button" title="Remove Member" onClick={() => fields.remove(index)}>Remove</button>
            <button
              type="button"
              title="Remove Member"
              onClick={() => fields.move(index, index - 1)}
              style={{ display: showMoveUpButton ? 'block' : 'none' }}
            >
              Up
            </button>
            <button
              type="button"
              title="Remove Member"
              onClick={() => fields.move(index, index + 1)}
              style={{ display: showMoveDownButton ? 'block' : 'none' }}
            >
              Down
            </button>
          </li>
        );
      })}
      <li>
        <button type="button" onClick={() => fields.push({})}>Ajouter une modalité</button>
      </li>
    </ul>
  );
}

class codesListNewEdit extends Component {
  render() {
    return (
      <div className="code-list-new-edit">
        <FormSection name="codesList">
          <Field
            name="label"
            type="text"
            component={Input}
            label="Libélle de la liste"
            validate={[required]}
            required
          />
          <Field name="id" type="hidden" component="input" />
        </FormSection>
        <FieldArray name="codes" component={renderListCodes} />
      </div>
    );
  }
}

renderListCodes.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default codesListNewEdit;
