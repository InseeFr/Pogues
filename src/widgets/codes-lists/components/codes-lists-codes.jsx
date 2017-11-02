import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CodesListsInputCode from './codes-lists-input-code';
import CodesListsActions from './codes-lists-actions';
import {
  getCodeDepth,
  getDisabledActions,
  getMoveUp,
  getMoveDown,
  getMoveLeft,
  getMoveRight,
  getCodeIndex,
} from '../utils/utils';
import { ACTIONS } from '../constants';

import { fieldArrayFields, fieldArrayMeta } from 'utils/proptypes-utils';
import { WIDGET_CODES_LISTS } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { markdownToHtml } from 'forms/controls/rich-textarea';

const { CODES_CLASS, LIST_CLASS, LIST_ITEM_CLASS } = WIDGET_CODES_LISTS;

// PropTypes and defaultProps

export const propTypes = {
  fields: PropTypes.shape(fieldArrayFields).isRequired,
  meta: PropTypes.shape({ ...fieldArrayMeta, error: PropTypes.array }).isRequired,
  currentCode: PropTypes.string,
  currentLabel: PropTypes.string,
  formName: PropTypes.string.isRequired,
  inputCodePath: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export const defaultProps = {
  currentCode: '',
  currentLabel: '',
};

// Componet

class CodesListCodes extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = { showInputCode: false, activeCode: undefined, editing: false };

    this.renderInputCode = this.renderInputCode.bind(this);
    this.pushCode = this.pushCode.bind(this);
    this.clearInputCode = this.clearInputCode.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.editing && nextState.activeCode && nextState.activeCode !== this.state.activeCode) {
      const { formName, change, inputCodePath, fields } = this.props;
      const indexCode = getCodeIndex(fields.getAll(), nextState.activeCode);
      const code = fields.get(indexCode);

      change(formName, `${inputCodePath}code`, code.code);
      change(formName, `${inputCodePath}label`, code.label);
    }
  }

  pushCode() {
    const { currentCode, currentLabel, fields } = this.props;
    const { activeCode, editing } = this.state;
    const allCodes = fields.getAll();

    let insertionIndex;
    let currentParent;

    if (editing) {
      const activeCodeIndex = getCodeIndex(allCodes, activeCode);
      const code = fields.get(activeCodeIndex);
      fields.remove(activeCodeIndex);
      insertionIndex = activeCodeIndex;
      currentParent = code.parent;
      this.setState({ showInputCode: false, activeCode: undefined, editing: false });
    } else {
      const activeCodeIndex = getCodeIndex(allCodes, activeCode);
      insertionIndex = activeCodeIndex !== -1 ? activeCodeIndex + 1 : 0;
      currentParent = activeCode || '';
    }

    fields.insert(insertionIndex, { code: currentCode, label: currentLabel, parent: currentParent });
  }

  clearInputCode() {
    const { inputCodePath, formName, change } = this.props;
    change(formName, `${inputCodePath}code`, '');
    change(formName, `${inputCodePath}label`, '');
  }

  renderInputCode() {
    return (
      <CodesListsInputCode
        meta={this.props.meta}
        close={() => {
          this.setState({ showInputCode: false, activeCode: undefined });
        }}
        clear={this.clearInputCode}
        push={this.pushCode}
      />
    );
  }

  render() {
    const { fields } = this.props;
    const { showInputCode, activeCode, editing } = this.state;

    return (
      <div className={CODES_CLASS}>
        {/* Show input code button */}
        <button
          onClick={e => {
            e.preventDefault();
            // this.showAddCode();
            this.setState({ showInputCode: true, activeCode: undefined });
          }}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.addCode}
        </button>

        <div className={`${LIST_CLASS}`}>
          {/* Input code without a parent code */}
          {showInputCode && !activeCode && this.renderInputCode()}

          {/* List of codes */}
          {fields.map((name, index, { get, getAll }) => {
            const code = get(index);
            const allCodes = getAll();
            const depth = getCodeDepth(allCodes, code.parent);

            return (
              <div key={code.code}>
                {(!editing || activeCode !== code.code) && (
                    <div className={`${LIST_ITEM_CLASS} ${LIST_ITEM_CLASS}-${depth}`}>
                      {/* Code data */}
                      <div />
                      <div>{code.code}</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: markdownToHtml(code.label).__html,
                        }}
                      />

                      {/* Code Actions */}
                      <CodesListsActions
                        disabledActions={getDisabledActions(allCodes, code, depth, ACTIONS)}
                        remove={() => {
                          fields.remove(index);
                        }}
                        showAdd={() => {
                          this.setState({ showInputCode: true, activeCode: code.code });
                        }}
                        edit={() => {
                          this.setState({ showInputCode: true, activeCode: code.code, editing: true });
                        }}
                        duplicate={() => {}}
                        moveUp={getMoveUp(allCodes, code, fields.move)}
                        moveDown={getMoveDown(allCodes, code, fields.move)}
                        moveLeft={getMoveLeft(allCodes, code, fields.insert, fields.remove)}
                        moveRight={getMoveRight(allCodes, code, fields.insert, fields.remove)}
                      />
                    </div>
                  )}

                {/* Input code with the rendered code as parent */}
                {showInputCode && activeCode === code.code && this.renderInputCode()}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CodesListCodes;
