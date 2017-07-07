import React, { Component } from 'react';
import { Field, FieldArray, FormSection } from 'redux-form';

import Dictionary from 'utils/dictionary/dictionary';
import CodesListEditorCodes from './codes-list-editor-codes';

class codesListEditor extends Component {
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
      <div className="codes-list-editor">
        <FormSection name="codesList">
          <div className="ctrl-input">
            <label htmlFor="input-label">{Dictionary.newCl}</label>
            <div className="codes-list__name">
              <Field name="label" id="input-label" type="text" component="input" placeholder={Dictionary.newCl} />
              <span className={toggleButtonClass} onClick={() => this.toggleCodesList()} />
            </div>
          </div>
          <Field name="id" type="hidden" component="input" />
        </FormSection>
        <FieldArray display={this.state.showCodesList} name="codes" component={CodesListEditorCodes} />
      </div>
    );
  }
}

export default codesListEditor;
