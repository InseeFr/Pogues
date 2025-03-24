import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';

import { WIDGET_CODES_LISTS } from '../../../constants/dom-constants';
import { RichEditorWithVariable } from '../../../forms/controls/control-with-suggestions';
import Input from '../../../forms/controls/input';
import Dictionary from '../../../utils/dictionary/dictionary';
import { fieldArrayMeta } from '../../../utils/proptypes-utils';
import { ComponentWithValidation } from '../../component-with-validation';

const {
  CODE_INPUT_CLASS,
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
  filterShow: PropTypes.bool,
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

/** Add, update or remove a precision for a code. */
class PrecisionInput extends ComponentWithValidation {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    const parent = super(props);

    this.state = parent.state;

    this.addCodeIfIsValid = this.addCodeIfIsValid.bind(this);
    this.addCode = this.addCode.bind(this);
    this.initInputCode = this.initInputCode.bind(this);

    this.initInputCode(props.code);
  }

  initInputCode(code) {
    const { path, formName, change, Question, collectedVariablesIds } =
      this.props;

    // Check if we have a "precision" related to our current component collected variables
    let precisionId = '';
    let precisionLabel = '';
    let precisionSize = '';
    if (code.precisionByCollectedVariableId) {
      for (const [key, values] of Object.entries(
        code.precisionByCollectedVariableId,
      )) {
        if (collectedVariablesIds.has(key)) {
          precisionId = values.precisionid;
          precisionLabel = values.precisionlabel;
          precisionSize = values.precisionsize;
          break;
        }
      }
    }

    if (code) {
      change(formName, `${path}value`, code.value);
      change(formName, `${path}label`, code.label);
      if (code.precisionid) {
        // redux form data
        change(formName, `${path}precisionid`, code.precisionid);
        change(formName, `${path}precisionlabel`, code.precisionlabel);
        change(formName, `${path}precisionsize`, code.precisionsize);
      } else if (precisionId) {
        // state data
        change(formName, `${path}precisionid`, precisionId);
        change(formName, `${path}precisionlabel`, precisionLabel);
        change(formName, `${path}precisionsize`, precisionSize);
      } else {
        // default value on create
        change(formName, `${path}precisionid`, `${Question}${code.value}CL`);
        change(formName, `${path}precisionlabel`, `${Dictionary.specify} :`);
        change(formName, `${path}precisionsize`, 249);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { code } = this.props;
    if (
      prevProps.code.label !== code.label ||
      prevProps.code.value !== code.value ||
      prevProps.code.precisionid !== code.precisionid ||
      prevProps.code.precisionlabel !== code.precisionlabel ||
      prevProps.code.precisionsize !== code.precisionsize
    ) {
      this.initInputCode(code);
    }
  }

  addCodeIfIsValid() {
    this.executeIfValid(this.addCode);
  }

  addCode() {
    const { push, clear } = this.props;
    push();
    clear();
  }

  render() {
    const { close, remove } = this.props;

    return (
      <div className={CODE_INPUT_CLASS}>
        <div className={CODE_INPUT_ERRORS_CLASS}>{super.render()}</div>
        <div>
          <Field
            className={CODE_INPUT_CODE_CLASS_PRECISION}
            name="input-code.precisionid"
            type="text"
            component={Input}
            label={Dictionary.precisionId}
            onEnter={this.addCodeIfIsValid}
          />
          <Field
            className={CODE_INPUT_CODE_CLASS_PRECISION}
            name="input-code.precisionlabel"
            type="text"
            component={RichEditorWithVariable}
            label={Dictionary.label}
            onEnter={this.addCodeIfIsValid}
          />
          <Field
            className={CODE_INPUT_CODE_CLASS_PRECISION}
            name="input-code.precisionsize"
            type="number"
            component={Input}
            label={Dictionary.maxLength}
            onEnter={this.addCodeIfIsValid}
          />
          <button
            className={`${CODE_INPUT_ACTIONS_CLASS}-cancel`}
            onClick={remove}
            title={Dictionary.remove}
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
              onClick={(e) => {
                e.preventDefault();
                this.addCodeIfIsValid();
              }}
            >
              {Dictionary.validate}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const selector = formValueSelector('component');

  const collectedVariables =
    selector(state, `collectedVariables.collectedVariables`) || [];
  const collectedVariablesIds = new Set();
  for (const collectedVariable of collectedVariables) {
    collectedVariablesIds.add(collectedVariable.id);
  }

  return {
    collectedVariablesIds,
    Question: selector(state, 'name'),
  };
};

export default connect(mapStateToProps)(PrecisionInput);
