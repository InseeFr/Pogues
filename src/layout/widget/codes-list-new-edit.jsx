import React, { Component } from 'react';
import { Field, FieldArray, FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';

function renderListCodes({ fields, display }) {
  return (
    <ul style={{ display: display ? 'block' : 'none' }}>
      {fields.map((name, index, fields) => {
        const numCodes = fields.length;
        const showMoveUpButton = index !== 0 && numCodes > 1;
        const showMoveDownButton = index !== numCodes - 1 && numCodes > 1;

        return (
          <li key={index}>
            <Field name={`${name}.id`} type="hidden" component="input" />
            <div className="codes-list__code-code">
              <Field name={`${name}.code`} type="text" component="input" placeholder={Dictionary.code} />
            </div>
            <div className="codes-list__code-label">
              <Field name={`${name}.label`} type="text" component="input" placeholder={Dictionary.codeLabel} />
            </div>
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
                {Dictionary.duplicate}<span className="glyphicon glyphicon-duplicate" />
              </button>
              <button type="button" title={Dictionary.remove} onClick={() => fields.remove(index)}>
                {Dictionary.remove}<span className="glyphicon glyphicon-trash" />
              </button>
            </div>
          </li>
        );
      })}
      <li>
        <div className="codes-list__add-code">
          <button title={Dictionary.addSpecialCode} type="button" onClick={() => fields.push({})}>
            <span className="glyphicon glyphicon-plus" />{Dictionary.addSpecialCode}
          </button>
        </div>
      </li>
    </ul>
  );
}

class codesListNewEdit extends Component {
  constructor() {
    super();

    this.state = {
      showCodesList: false,
    };
    this.toggleCodesList = this.toggleCodesList.bind(this);
  }
  toggleCodesList() {
    const newShowCodesList = !this.state.showCodesList;
    this.setState({
      showCodesList: newShowCodesList,
    });
  }
  render() {
    const toggleButtonClass = this.state.showCodesList ? 'glyphicon glyphicon-eye-close' : 'glyphicon glyphicon-pencil';

    return (
      <div className="codes-list-new-edit">
        <FormSection name="codesList">
          <div className="ctrl-input">
            <label htmlFor="input-label">{Dictionary.newCl}</label>
            <div className="codes-list__name">
              <Field name="label" id="input-label" type="text" component="input" placeholder={Dictionary.newCl} />
              <span className={toggleButtonClass} onClick={() => this.toggleCodesList()}/>
            </div>
          </div>
          <Field name="id" type="hidden" component="input" />
        </FormSection>
        <FieldArray display={this.state.showCodesList} name="codes" component={renderListCodes} />
      </div>
    );
  }
}

renderListCodes.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default codesListNewEdit;
