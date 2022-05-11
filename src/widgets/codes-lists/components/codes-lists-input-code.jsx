import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Field, formValueSelector } from 'redux-form';

import { ComponentWithValidation } from 'widgets/component-with-validation';
import Input from 'forms/controls/input';
import { fieldArrayMeta } from 'utils/proptypes-utils';
import { WIDGET_CODES_LISTS } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { RichEditorWithVariable } from 'forms/controls/control-with-suggestions';

const {
  CODE_INPUT_CLASS,
  CODE_INPUT_CODE_CLASS,
  CODE_INPUT_LABEL_CLASS,
  CODE_INPUT_ACTIONS_CLASS,
  CODE_INPUT_ERRORS_CLASS,
  CODE_INPUT_CODE_CLASS_PRECISION,
} = WIDGET_CODES_LISTS;

// PropTypes and defaultProps

export const propTypes = {
  code: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  meta: PropTypes.shape({ ...fieldArrayMeta, error: PropTypes.array })
    .isRequired,
  path: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

const defaultProps = {
  code: {
    value: '',
    label: '',
    precisionid: '',
    precisionlabel: '',
    precisionsize: '',
  },
};

// Componet

class CodesListInputCode extends ComponentWithValidation {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    const parent = super(props);

    this.state = parent.state;

    this.addCodeIfIsValid = this.addCodeIfIsValid.bind(this);
    this.addCodeIfIsValid1 = this.addCodeIfIsValid1.bind(this);
    this.addCode = this.addCode.bind(this);
    this.addCode1 = this.addCode1.bind(this);
    this.initInputCode = this.initInputCode.bind(this);
  }

  initInputCode(code) {
    const { path, formName, change, precisionShow, Question } = this.props;
    if (code) {
      change(formName, `${path}value`, code.value);
      change(formName, `${path}label`, code.label);
      if (code.precisionid !== undefined && code.precisionid !== '') {
        change(formName, `${path}precisionid`, code.precisionid);
        change(formName, `${path}precisionlabel`, code.precisionlabel);
        change(formName, `${path}precisionsize`, code.precisionsize);
      } else if (precisionShow) {
        change(formName, `${path}precisionid`, `${Question}${code.value}CL`);
        change(formName, `${path}precisionlabel`, `${Dictionary.specify} :`);
        change(formName, `${path}precisionsize`, '249');
      } else {
        change(formName, `${path}precisionid`, '');
        change(formName, `${path}precisionlabel`, '');
        change(formName, `${path}precisionsize`, '');
      }
    }
  }

  UNSAFE_componentWillMount() {
    this.initInputCode(this.props.code);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.code.label !== this.props.code.label ||
      nextProps.code.value !== this.props.code.value ||
      nextProps.code.precisionid !== this.props.code.precisionid ||
      nextProps.code.precisionlabel !== this.props.code.precisionlabel ||
      nextProps.code.precisionsize !== this.props.code.precisionsize
    ) {
      this.initInputCode(nextProps.code);
    }
  }

  addCodeIfIsValid() {
    this.executeIfValid(this.addCode);
  }

  addCodeIfIsValid1() {
    this.executeIfValid(this.addCode1);
  }

  addCode1() {
    const { push, clear } = this.props;

    this.firstField.focus();
    push();
    clear();
  }

  addCode() {
    const { push, clear } = this.props;

    this.firstField.focus();
    push();
    clear();
  }

  render() {
    const { close, precisionShow, remove } = this.props;
    return (
      <div className={CODE_INPUT_CLASS}>
        <div className={CODE_INPUT_ERRORS_CLASS}>{super.render()}</div>

        <div
          className="Precision"
          style={{ display: precisionShow ? 'none' : 'block' }}
        >
          <Field
            className={CODE_INPUT_CODE_CLASS}
            name="input-code.value"
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
            component={RichEditorWithVariable}
            label={Dictionary.label}
            onEnter={this.addCodeIfIsValid}
          />
          <Field name="input-code.parent" type="hidden" component="input" />
          <div className={CODE_INPUT_ACTIONS_CLASS}>
            <button
              className={`${CODE_INPUT_ACTIONS_CLASS}-cancel`}
              onClick={close}
            >
              {Dictionary.cancel}
            </button>
            <button
              className={`${CODE_INPUT_ACTIONS_CLASS}-validate`}
              onClick={e => {
                e.preventDefault();
                this.addCodeIfIsValid();
              }}
            >
              {Dictionary.validate}
            </button>
          </div>
        </div>
        {precisionShow ? (
          <div className="Precision">
            <Field
              className={CODE_INPUT_CODE_CLASS_PRECISION}
              name="input-code.precisionid"
              type="text"
              component={Input}
              label={Dictionary.precisionId}
              onEnter={this.addCodeIfIsValid1}
            />
            <Field
              className={CODE_INPUT_CODE_CLASS_PRECISION}
              name="input-code.precisionlabel"
              type="text"
              component={RichEditorWithVariable}
              label={Dictionary.label}
              onEnter={this.addCodeIfIsValid1}
            />
            <Field
              className={CODE_INPUT_CODE_CLASS_PRECISION}
              name="input-code.precisionsize"
              type="number"
              component={Input}
              label={Dictionary.maxLength}
              onEnter={this.addCodeIfIsValid1}
            />
            <button
              className={`${CODE_INPUT_ACTIONS_CLASS}-cancel`}
              onClick={remove}
              aria-label={Dictionary.remove}
            >
              <span className="glyphicon glyphicon-trash" aria-hidden="true" />
            </button>

            <div className={CODE_INPUT_ACTIONS_CLASS}>
              <button
                className={`${CODE_INPUT_ACTIONS_CLASS}-cancel`}
                onClick={close}
              >
                {Dictionary.cancel}
              </button>
              <button
                className={`${CODE_INPUT_ACTIONS_CLASS}-validate`}
                onClick={e => {
                  e.preventDefault();
                  this.addCodeIfIsValid1();
                }}
              >
                {Dictionary.validate}
              </button>
            </div>
          </div>
        ) : (
          false
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const selector = formValueSelector('component');
  return {
    Question: selector(state, 'name'),
  };
};

export default connect(mapStateToProps)(CodesListInputCode);
