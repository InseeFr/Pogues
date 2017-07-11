import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';

class ListEntryForm extends Component {
  static propTypes = {
    inputView: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };
  render() {
    const { inputView, submit, reset } = this.props;

    return (
      <div className="list-entry-form">
        <ul className="list-entry-form_list">
          <li>
            <button className="btn btn-link">
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
            </button>
          </li>
          <li>
            <button className="btn btn-link">
              <span className="glyphicon glyphicon-plus" aria-hidden="true" />
              Ajouter une information mesurée
            </button>
          </li>
        </ul>
        <div className="list-entry-form_form">

          {inputView}

          <div className="list-entry-form_form-actions">
            <ul className="form-footer">
              <li>
                <button disabled className="btn btn-link">
                  <span className="glyphicon glyphicon-trash" aria-hidden="true" />
                  {Dictionary.remove}
                </button>
              </li>
              <li>
                <button disabled className="btn btn-link">
                  <span className="glyphicon glyphicon-file" aria-hidden="true" />
                  {Dictionary.duplicate}
                </button>
              </li>
              <li>
                <button className="btn-yellow" onClick={submit}>
                  {Dictionary.validate}
                </button>
              </li>
              <li>
                <button className="cancel" onClick={reset}>
                  {Dictionary.cancel}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ListEntryForm;
