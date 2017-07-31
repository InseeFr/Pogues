import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';

import Dictionary from 'utils/dictionary/dictionary';
import Select from 'layout/forms/controls/select';
import Textarea from 'layout/forms/controls/rich-textarea';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { defaultDeclarationForm } from 'utils/transformation-entities/declaration';

function InputDeclaration() {
  const types = [
    {
      value: 'INSTRUCTION',
      label: Dictionary.INSTRUCTION,
    },
    {
      value: 'COMMENT',
      label: Dictionary.COMMENT,
    },
    {
      value: 'HELP',
      label: Dictionary.HELP,
    },
    {
      value: 'WARNING',
      label: Dictionary.WARNING,
    },
  ];

  const positions = [
    {
      value: 'AFTER_QUESTION_TEXT',
      label: Dictionary.dclPosAfterQuestion,
    },
    {
      value: 'AFTER_RESPONSE',
      label: Dictionary.dclPosAfterAnswer,
    },
    {
      value: 'BEFORE_QUESTION_TEXT',
      label: Dictionary.dclPosBeforeText,
    },
    {
      value: 'DETACHABLE',
      label: Dictionary.dclPosDetachable,
    },
  ];

  return (
    <div>
      <Field name="label" id="declaration_text" component={Textarea} buttons label={Dictionary.declaration_label} />

      <Field name="type" id="declaration_type" component={Select} label={Dictionary.type} options={types} required />

      <Field
        name="position"
        id="declaration_position"
        component={Select}
        label={Dictionary.declaration_position}
        options={positions}
        required
      />
    </div>
  );
}
class Declarations extends Component {
  static selectorPath = 'declarations';

  render() {
    const { declarations, ...initialInputValues } = defaultDeclarationForm;
    const inputDeclarationView = <InputDeclaration />;

    return (
      <FormSection name={Declarations.selectorPath} className="declaratations">
        <ListEntryFormContainer
          inputView={inputDeclarationView}
          initialInputValues={initialInputValues}
          selectorPath={Declarations.selectorPath}
          listName="declarations"
          submitLabel="addDeclaration"
          noValueLabel="noDeclarationYet"
        />
      </FormSection>
    );
  }
}
export default Declarations;
