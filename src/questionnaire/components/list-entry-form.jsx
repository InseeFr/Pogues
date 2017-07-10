import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import PropTypes from 'prop-types';

// import Dictionary from 'utils/dictionary/dictionary';
import Input from 'layout/forms/controls/input';

import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
import ResponseFormatSimple from 'questionnaire/components/response-format/simple/response-format-simple';
import ResponseFormatSingle from 'questionnaire/components/response-format/single/response-format-single';
import Dictionary from 'utils/dictionary/dictionary';
import { QUESTION_TYPE_ENUM } from 'constants/schema';

const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;

function EntryForm(props) {
  const { handleSubmit, pristine, reset, submitting } = props;

  const responseFormatTypes = [
    {
      id: `response-format-${SIMPLE}`,
      label: Dictionary.responseFormatSimple,
      value: SIMPLE,
      content: <ResponseFormatSimple />,
    },
    {
      id: `response-format-${SINGLE_CHOICE}`,
      label: Dictionary.responseFormatSingle,
      value: SINGLE_CHOICE,
      content: <ResponseFormatSingle />,
    },
  ];

  return (
    <div>

      <Field name="label" type="text" component={Input} label="Libellé de l'information mesurée" required />

      <ComponentSelectoryByTypeContainer label={Dictionary.responseFormats} components={responseFormatTypes} checkbox />

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
            <button
              disabled={pristine || submitting}
              className="btn-yellow"
              onClick={() => {
                handleSubmit();
              }}
            >
              {Dictionary.validate}
            </button>
          </li>
          <li><button className="cancel" onClick={reset}>{Dictionary.cancel}</button></li>
        </ul>
      </div>
    </div>
  );
}

EntryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

class ListEntryFrom extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };
  render() {
    const { name } = this.props;
    const EntryFormInstance = reduxForm({ form: name })(EntryForm);
    const submit = values => {
      debugger;
    };

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
          <EntryFormInstance onSubmit={submit} />
        </div>
      </div>
    );
  }
}

export default ListEntryFrom;
