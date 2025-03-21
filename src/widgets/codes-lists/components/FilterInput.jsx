import React from 'react';

import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { WIDGET_CODES_LISTS } from '../../../constants/dom-constants';
import { RichEditorWithVariable } from '../../../forms/controls/control-with-suggestions';
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
  codeFilters: PropTypes.arrayOf(
    PropTypes.shape({
      codeValue: PropTypes.string.isRequired,
      codeListId: PropTypes.string.isRequired,
      conditionFilter: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const defaultProps = {
  code: {
    value: '',
  },
};

/** Add, update or remove a filter for a code. */
class FilterInput extends ComponentWithValidation {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    const parent = super(props);

    this.state = parent.state;

    this.addCodeIfIsValid = this.addCodeIfIsValid.bind(this);
    this.addCode = this.addCode.bind(this);
    this.initInputCode = this.initInputCode.bind(this);

    this.initInputCode();
  }

  initInputCode() {
    const { formName, change, codeFilters } = this.props;

    change(formName, `codeFilters`, codeFilters);
  }

  componentDidUpdate(prevProps) {
    const { code } = this.props;
    if (prevProps.code.value !== code.value) {
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
    console.debug(this.props);
    const { close, remove } = this.props;

    return (
      <div className={CODE_INPUT_CLASS}>
        <div className={CODE_INPUT_ERRORS_CLASS}>{super.render()}</div>
        <div className="Precision">
          <div>
            La modalité ne s'affichera que si la condition suivante est vraie :
          </div>
          <Field
            className={CODE_INPUT_CODE_CLASS_PRECISION}
            name="input-code.conditionFilter"
            type="text"
            component={RichEditorWithVariable}
            label={Dictionary.label}
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

export default FilterInput;
