import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import ReactModal from 'react-modal';

import CodesListsInputCodeContainer from '../containers/codes-lists-input-code-container';
import CodesListsActions from './codes-lists-actions';
import UploadCSV from './upload-csv';

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

function CodesListsCodes(props) {
  const {
    inputCodePath,
    formName,
    change,
    currentValue,
    currentLabel,
    currentPrecisionid,
    currentPrecisionlabel,
    currentPrecisionsize,
    meta,
    Type,
    fields: { getAll, removeAll, push, remove, get },
    allowPrecision,
  } = props;

  const [showInputCode, setShowInputCode] = useState(false);
  const [activeCodeIndex, setActiveCodeIndex] = useState(undefined);
  const [editing, setEditing] = useState(false);
  const [showPrecision, setShowPrecision] = useState(false);
  const [showUploadCode, setShowUploadCode] = useState(false);

  const closeUpload = useCallback(() => setShowUploadCode(false), []);

  const clearInputCode = useCallback(() => {
    change(formName, `${inputCodePath}value`, '');
    change(formName, `${inputCodePath}label`, '');
    change(formName, `${inputCodePath}precisionid`, '');
    change(formName, `${inputCodePath}precisionlabel`, '');
    change(formName, `${inputCodePath}precisionsize`, '');
  }, [change, formName, inputCodePath]);

  const getFileCodes = useCallback(
    codes => {
      const allCodes = getAll() || [];
      if (codes && codes.length > 0) {
        removeAll();
        codes.forEach((code, index) => {
          code.weight = index;
          code.depth = allCodes[0]?.depth || 1;
          code.parent = code.parent || '';
          push(code);
        });
      }
      closeUpload();
      clearInputCode();
    },
    [clearInputCode, closeUpload, getAll, push, removeAll],
  );

  const removePrecision = useCallback(() => {
    setShowInputCode(false);
    setActiveCodeIndex(undefined);
    setShowPrecision(false);

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
    setShowInputCode(false);
    setActiveCodeIndex(undefined);
    setShowPrecision(false);
    remove(activeCodeIndex);
    push(values);
    clearInputCode();
  }, [
    activeCodeIndex,
    clearInputCode,
    currentLabel,
    currentValue,
    get,
    push,
    remove,
  ]);

  const pushCode = useCallback(() => {
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
      setShowInputCode(false);
      setActiveCodeIndex(undefined);
      setEditing(false);

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
    clearInputCode();
  }, [
    activeCodeIndex,
    clearInputCode,
    currentLabel,
    currentPrecisionid,
    currentPrecisionlabel,
    currentPrecisionsize,
    currentValue,
    editing,
    get,
    getAll,
    push,
    remove,
  ]);

  function renderInputCode() {
    const code = get(activeCodeIndex);
    const allCodes = getAll() || [];

    return (
      <CodesListsInputCodeContainer
        meta={meta}
        close={() => {
          clearInputCode();
          setShowInputCode(false);
          setActiveCodeIndex(undefined);
          setShowPrecision(false);
        }}
        clear={clearInputCode}
        push={pushCode}
        remove={removePrecision}
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

  function renderCode(code) {
    const allCodes = getAll() || [];
    const indexCode = getIndexItemsByAttrs({ value: code.value }, allCodes);
    const actions = {
      remove: () => {
        remove(indexCode);
      },
      edit: () => {
        setShowInputCode(true);
        setShowPrecision(false);
        setActiveCodeIndex(indexCode);
        setEditing(true);
      },
      duplicate: () => {
        setShowInputCode(true);
        setActiveCodeIndex(indexCode);
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
      // pour precision et setPrecision, il y avait rajout dans le setState d'un () => {}
      precision: () => {
        setShowPrecision(true);
        setActiveCodeIndex(indexCode);
        setEditing(true);
      },
      setPrecision: () => {
        setShowPrecision(true);
        setActiveCodeIndex(indexCode);
        setEditing(true);
      },
    };

    return (
      <div key={code.value}>
        {showInputCode && editing && activeCodeIndex === indexCode ? (
          renderInputCode()
        ) : (
          <div
            className={`${LIST_ITEM_CLASS} ${LIST_ITEM_CLASS}-${code.depth}`}
          >
            {/* Code data */}
            <div>{code.depth}</div>
            <div>{code.value}</div>
            {code.label && (
              <div
                dangerouslySetInnerHTML={{
                  __html: markdownVtlToHtml(code.label),
                }}
              />
            )}
            {/* Code Actions */}
            <CodesListsActions
              disabledActions={getDisabledActions(
                allCodes,
                code,
                ACTIONS,
                Type,
              )}
              actions={actions}
              allowPrecision={allowPrecision}
            />
            {showPrecision &&
              editing &&
              activeCodeIndex === indexCode &&
              renderInputCode()}
          </div>
        )}

        {/* Children codes */}
        {renderCodes(code.value)}
      </div>
    );
  }

  function renderCodes(parent = '') {
    const allCodes = getAll() || [];
    return allCodes
      .filter(code => code.parent === parent)
      .sort((code, nexCode) => {
        if (code.weight < nexCode.weight) return -1;
        if (code.weight > nexCode.weight) return 1;
        return 0;
      })
      .map(code => renderCode(code));
  }

  return (
    <div className={CODES_CLASS}>
      {/* Show input code button */}
      {!showInputCode && (
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            setShowInputCode(true);
            setActiveCodeIndex(undefined);
            setEditing(false);
            setShowPrecision(false);
          }}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.addCode}
        </button>
      )}

      <button
        type="button"
        onClick={e => {
          e.preventDefault();
          setShowUploadCode(true);
        }}
      >
        <span className="glyphicon glyphicon-plus" />
        {Dictionary.uploadCode}
      </button>
      <div className={`${LIST_CLASS}`}>
        {props.fields.length > 0 && (
          <div className={`${LIST_ITEM_CLASS}`}>
            <div>{Dictionary.level}</div>
            <div>{Dictionary.code}</div>
            <div>{Dictionary.label}</div>
            <div>{Dictionary.actions}</div>
          </div>
        )}
        {/* List of codes */}
        {renderCodes()}
        {/* Input code without a parent code */}
        {showInputCode && !editing && renderInputCode()}
      </div>
      <ReactModal
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        isOpen={showUploadCode}
        onRequestClose={closeUpload}
      >
        <div className="popup">
          <div className="popup-header">
            <h3>{Dictionary.uploadCode}</h3>
            <button type="button" onClick={closeUpload}>
              <span>X</span>
            </button>
          </div>
          <div className="popup-body">
            <UploadCSV closeUpload={closeUpload} getFileCodes={getFileCodes} />
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

CodesListsCodes.propTypes = {
  fields: PropTypes.shape(fieldArrayFields).isRequired,
  meta: PropTypes.shape({ ...fieldArrayMeta, error: PropTypes.array })
    .isRequired,
  currentValue: PropTypes.string,
  currentLabel: PropTypes.string,

  currentPrecisionid: PropTypes.string,
  currentPrecisionlabel: PropTypes.string,
  currentPrecisionsize: PropTypes.number,

  formName: PropTypes.string.isRequired,
  inputCodePath: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  allowPrecision: PropTypes.bool,
};

CodesListsCodes.defaultProps = {
  currentValue: '',
  currentLabel: '',
  currentPrecisionid: '',
  currentPrecisionlabel: '',
  currentPrecisionsize: undefined,
  allowPrecision: true,
};

const mapStateToProps = state => {
  const selector = formValueSelector('component');
  return {
    Type: selector(state, 'responseFormat.type'),
  };
};

export default connect(mapStateToProps)(CodesListsCodes);
