import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { ComponentWithValidation } from 'widgets/component-with-validation';
import Input from 'forms/controls/input';
import { RichTextarea } from 'forms/controls/rich-textarea';
import { fieldArrayMeta } from 'utils/proptypes-utils';
import { WIDGET_CODES_LISTS } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';

const {
  CODE_INPUT_CLASS,
  CODE_INPUT_CODE_CLASS,
  CODE_INPUT_LABEL_CLASS,
  CODE_INPUT_ACTIONS_CLASS,
  CODE_INPUT_ERRORS_CLASS,
} = WIDGET_CODES_LISTS;

// PropTypes and defaultProps

export const propTypes = {
  meta: PropTypes.shape({ ...fieldArrayMeta, error: PropTypes.array }).isRequired,
  push: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

// Componet

class CodesListInputCode extends ComponentWithValidation {
  static propTypes = propTypes;

  constructor(props) {
    const parent = super(props);

    this.state = parent.state;

    this.addCodeIfIsValid = this.addCodeIfIsValid.bind(this);
    this.addCode = this.addCode.bind(this);
  }

  addCodeIfIsValid() {
    this.executeIfValid(this.addCode);
  }

  addCode() {
    const { push, clear } = this.props;

    this.firstField.focus();
    push();
    clear();
  }

  render() {
    const { close } = this.props;

    return (
      <div className={CODE_INPUT_CLASS}>
        <div className={CODE_INPUT_ERRORS_CLASS}>{super.render()}</div>
        <Field
          className={CODE_INPUT_CODE_CLASS}
          name="input-code.code"
          type="text"
          component={Input}
          label={Dictionary.code}
          onKeyDown={e => {
            if (e.key === 'Enter') this.addCodeIfIsValid();
          }}
          reference={node => {
            this.firstField = node;
          }}
          focusOnInit
        />
        <Field
          className={CODE_INPUT_LABEL_CLASS}
          name="input-code.label"
          type="text"
          component={RichTextarea}
          label={Dictionary.label}
          onEnter={this.addCodeIfIsValid}
        />
        <Field name="input-code.parent" type="hidden" component="input" />
        <div className={CODE_INPUT_ACTIONS_CLASS}>
          <button
            className={`${CODE_INPUT_ACTIONS_CLASS}-add`}
            onClick={e => {
              e.preventDefault();
              this.addCodeIfIsValid();
            }}
          >
            {Dictionary.add}
          </button>
          <button className={`${CODE_INPUT_ACTIONS_CLASS}-cancel`} onClick={close}>
            {Dictionary.cancel}
          </button>
        </div>
      </div>
    );
  }
}

export default CodesListInputCode;
