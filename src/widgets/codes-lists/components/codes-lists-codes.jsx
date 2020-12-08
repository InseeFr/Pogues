import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import CodesListsInputCodeContainer from '../containers/codes-lists-input-code-container';
import CodesListsActions from './codes-lists-actions';
import { ACTIONS } from '../constants';
import { getNewCodeWeight, resetListCodes } from '../utils/utils';
import { getDisabledActions } from '../utils/actions';
import { moveUp, moveDown, moveLeft, moveRight } from '../utils/movement';

import { fieldArrayFields, fieldArrayMeta } from 'utils/proptypes-utils';
import { WIDGET_CODES_LISTS } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { getIndexItemsByAttrs } from 'utils/widget-utils';
import { markdownVtlToHtml } from 'forms/controls/rich-textarea';

const { CODES_CLASS, LIST_CLASS, LIST_ITEM_CLASS } = WIDGET_CODES_LISTS;

// PropTypes and defaultProps

export const propTypes = {
  fields: PropTypes.shape(fieldArrayFields).isRequired,
  meta: PropTypes.shape({ ...fieldArrayMeta, error: PropTypes.array })
    .isRequired,
  currentValue: PropTypes.string,
  currentLabel: PropTypes.string,

  currentPrecisionid: PropTypes.string,
  currentPrecisionlabel: PropTypes.string,
  currentPrecisionsize: PropTypes.string,

  formName: PropTypes.string.isRequired,
  inputCodePath: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export const defaultProps = {
  currentValue: '',
  currentLabel: '',
  currentPrecisionid: '',
  currentPrecisionlabel: '',
  currentPrecisionsize: '',
};

// Componet

class CodesListsCodes extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      showInputCode: false,
      activeCodeIndex: undefined,
      editing: false,
      showPrecision: false,
    };

    this.renderInputCode = this.renderInputCode.bind(this);
    this.pushCode = this.pushCode.bind(this);
    this.clearInputCode = this.clearInputCode.bind(this);
    this.removePrecision = this.removePrecision.bind(this);
    this.renderCode = this.renderCode.bind(this);
    this.renderCodes = this.renderCodes.bind(this);
  }

  removePrecision() {
    this.setState({
      showInputCode: false,
      activeCodeIndex: undefined,
      showPrecision: false,
    });
    const {
      currentValue,
      currentLabel,
      fields: { push, remove, get },
    } = this.props;
    const { activeCodeIndex } = this.state;
    const code = get(activeCodeIndex);

    const values = {
      value: currentValue,
      label: currentLabel,
      precisionid: undefined,
      precisionlabel: undefined,
      precisionsize: undefined,
      parent: code.parent,
      weight: code.weight,
      depth: code.depth,
    };
    this.setState({
      showInputCode: false,
      activeCodeIndex: undefined,
      showPrecision: false,
    });
    remove(activeCodeIndex);

    push(values);
    this.clearInputCode();
  }

  clearInputCode() {
    const { inputCodePath, formName, change } = this.props;
    change(formName, `${inputCodePath}value`, '');
    change(formName, `${inputCodePath}label`, '');
    change(formName, `${inputCodePath}precisionid`, '');
    change(formName, `${inputCodePath}precisionlabel`, '');
    change(formName, `${inputCodePath}precisionsize`, '');
  }

  pushCode() {
    const {
      currentValue,
      currentLabel,
      currentPrecisionid,
      currentPrecisionlabel,
      currentPrecisionsize,
      fields: { get, getAll, remove, push },
    } = this.props;
    const { activeCodeIndex, editing } = this.state;
    const allCodes = getAll() || [];
    let values;

    if (activeCodeIndex !== undefined) {
      values = {
        value: currentValue,
        label: currentLabel,
        precisionid: currentPrecisionid,
        precisionlabel: currentPrecisionlabel,
        precisionsize: currentPrecisionsize,
      };
      this.setState({
        showInputCode: false,
        activeCodeIndex: undefined,
        editing: false,
      });
      if (editing) {
        const code = get(activeCodeIndex);
        remove(activeCodeIndex);
        values = {
          ...values,
          parent: code.parent,
          weight: code.weight,
          depth: code.depth,
        };
      } else {
        values = {
          ...values,
          parent: '',
          weight: getNewCodeWeight(allCodes),
          depth: 1,
        };
      }
    } else {
      values = {
        precisionid: currentPrecisionid,
        precisionlabel: currentPrecisionlabel,
        precisionsize: currentPrecisionsize,
        value: currentValue,
        label: currentLabel,
        parent: '',
        weight: getNewCodeWeight(allCodes),
        depth: 1,
      };
    }
    push(values);
    this.clearInputCode();
  }

  renderInputCode() {
    const {
      inputCodePath,
      formName,
      change,
      fields: { get, getAll },
    } = this.props;
    const { activeCodeIndex, editing, showPrecision } = this.state;
    const code = get(activeCodeIndex);
    const allCodes = getAll();

    return (
      <CodesListsInputCodeContainer
        meta={this.props.meta}
        close={() => {
          this.clearInputCode();
          this.setState({
            showInputCode: false,
            activeCodeIndex: undefined,
            showPrecision: false,
          });
        }}
        clear={this.clearInputCode}
        push={this.pushCode}
        remove={this.removePrecision}
        change={change}
        path={inputCodePath}
        formName={formName}
        code={code}
        precisionShow={showPrecision}
        codes={allCodes}
        editing={editing}
      />
    );
  }

  renderCode(code) {
    const {
      showInputCode,
      activeCodeIndex,
      editing,
      showPrecision,
    } = this.state;
    const {
      fields: { getAll, remove, removeAll, push },
    } = this.props;
    const allCodes = getAll() || [];
    const indexCode = getIndexItemsByAttrs({ value: code.value }, allCodes);
    const actions = {
      remove: () => {
        remove(indexCode);
      },
      edit: () => {
        this.setState({
          showInputCode: true,
          showPrecision: false,
          activeCodeIndex: indexCode,
          editing: true,
        });
      },
      duplicate: () => {
        this.setState({ showInputCode: true, activeCodeIndex: indexCode });
      },
      moveUp: () => {
        resetListCodes(moveUp(code.value, allCodes), removeAll, push);
      },
      moveDown: () => {
        resetListCodes(moveDown(code.value, allCodes), removeAll, push);
      },
      moveLeft: () => {
        resetListCodes(moveLeft(code.value, allCodes), removeAll, push);
      },
      moveRight: () => {
        resetListCodes(moveRight(code.value, allCodes), removeAll, push);
      },
      precision: () => {
        this.setState(
          {
            showPrecision: true,
            activeCodeIndex: indexCode,
            editing: true,
          },
          () => {},
        );
      },
      setPrecision: () => {
        this.setState(
          {
            showPrecision: true,
            activeCodeIndex: indexCode,
            editing: true,
          },
          () => {},
        );
      },
    };

    return (
      <div key={code.value}>
        {showInputCode && editing && activeCodeIndex === indexCode ? (
          this.renderInputCode()
        ) : (
          <div
            className={`${LIST_ITEM_CLASS} ${LIST_ITEM_CLASS}-${code.depth}`}
          >
            {/* Code data */}
            <div>{code.depth}</div>
            <div>{code.value}</div>
            {code.label ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: markdownVtlToHtml(code.label),
                }}
              />
            ) : (
              false
            )}
            {/* Code Actions */}
            <CodesListsActions
              disabledActions={getDisabledActions(
                allCodes,
                code,
                ACTIONS,
                this.props.Type,
              )}
              actions={actions}
            />
            {showPrecision && editing && activeCodeIndex === indexCode
              ? this.renderInputCode()
              : false}
          </div>
        )}

        {/* Children codes */}
        {this.renderCodes(code.value)}
      </div>
    );
  }

  renderCodes(parent = '') {
    const allCodes = this.props.fields.getAll() || [];
    return allCodes
      .filter(code => code.parent === parent)
      .sort((code, nexCode) => {
        if (code.weight < nexCode.weight) return -1;
        if (code.weight > nexCode.weight) return 1;
        return 0;
      })
      .map(code => this.renderCode(code));
  }

  render() {
    const { showInputCode, editing } = this.state;

    return (
      <div className={CODES_CLASS}>
        {/* Show input code button */}
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            this.setState({
              showInputCode: true,
              activeCodeIndex: undefined,
              editing: false,
              showPrecision: false,
            });
          }}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.addCode}
        </button>
        <div className={`${LIST_CLASS}`}>
          {this.props.fields.length > 0 && (
            <div className={`${LIST_ITEM_CLASS}`}>
              <div>{Dictionary.level}</div>
              <div>{Dictionary.code}</div>
              <div>{Dictionary.label}</div>
              <div>{Dictionary.actions}</div>
            </div>
          )}
          {/* List of codes */}
          {this.renderCodes()}
          {/* Input code without a parent code */}
          {showInputCode && !editing && this.renderInputCode()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const selector = formValueSelector('component');
  return {
    Type: selector(state, 'responseFormat.type'),
  };
};

export default connect(mapStateToProps)(CodesListsCodes);
