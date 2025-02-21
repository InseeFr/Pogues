import React, { useCallback, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import { WIDGET_CODES_LISTS } from '../../../constants/dom-constants';
import { markdownVtlToHtml } from '../../../forms/controls/rich-textarea';
import Dictionary from '../../../utils/dictionary/dictionary';
import {
  fieldArrayFields,
  fieldArrayMeta,
} from '../../../utils/proptypes-utils';
import { getIndexItemsByAttrs } from '../../../utils/widget-utils';
import CodesListsInputCodeContainer from '../containers/codes-lists-input-code-container';
import { getNewCodeWeight } from '../utils/utils';
import FilterAction from './FilterAction';
import SpecifyAction from './SpecifyAction';

const { CODES_CLASS, LIST_CLASS } = WIDGET_CODES_LISTS;

/** Display codes of a codes list in a table. */
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
    fields: { getAll, push, remove, get },
    allowPrecision,
    allowFilter,
  } = props;

  const [activeCodeIndex, setActiveCodeIndex] = useState(undefined);
  const [editing, setEditing] = useState(false);
  const [showPrecision, setShowPrecision] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const clearInputCode = useCallback(() => {
    change(formName, `${inputCodePath}value`, '');
    change(formName, `${inputCodePath}label`, '');
    change(formName, `${inputCodePath}precisionid`, '');
    change(formName, `${inputCodePath}precisionlabel`, '');
    change(formName, `${inputCodePath}precisionsize`, '');
  }, [change, formName, inputCodePath]);

  const removePrecision = useCallback(() => {
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
        filterShow={showFilter}
        codes={allCodes}
        editing={editing}
      />
    );
  }

  function renderCode(code) {
    const allCodes = getAll() || [];
    const indexCode = getIndexItemsByAttrs({ value: code.value }, allCodes);
    const actions = {
      updatePrecision: () => {
        setShowPrecision(true);
        setActiveCodeIndex(indexCode);
        setEditing(true);
      },
      updateFilter: () => {
        setShowFilter(true);
        setActiveCodeIndex(indexCode);
        setEditing(true);
      },
    };

    return (
      <React.Fragment key={code.value}>
        <tr className="*:py-2">
          {/* Code data */}
          <td className="py-2">{code.depth}</td>
          <td className="py-2">{code.value}</td>
          {code.label && (
            <td className="py-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: markdownVtlToHtml(code.label),
                }}
              />
            </td>
          )}
          {/* Code Actions */}
          {allowFilter ? (
            <td className="py-2">
              <FilterAction updateFilter={actions.updateFilter} />
            </td>
          ) : null}
          {allowPrecision ? (
            <td className="py-2">
              <SpecifyAction
                updatePrecision={actions.updatePrecision}
                precisionLabel={code.precisionlabel}
              />
            </td>
          ) : null}
        </tr>
        {/* Filter update */}
        {showFilter && editing && activeCodeIndex === indexCode && (
          <tr>
            <td colSpan="6" className="py-2">
              {renderInputCode()}
            </td>
          </tr>
        )}
        {/* Precision update */}
        {showPrecision && editing && activeCodeIndex === indexCode && (
          <tr>
            <td colSpan="6" className="py-2">
              {renderInputCode()}
            </td>
          </tr>
        )}

        {/* Children codes */}
        {renderCodes(code.value)}
      </React.Fragment>
    );
  }

  function renderCodes(parent = '') {
    const allCodes = getAll() || [];
    return allCodes
      .filter((code) => code.parent === parent)
      .sort((code, nexCode) => {
        if (code.weight < nexCode.weight) return -1;
        if (code.weight > nexCode.weight) return 1;
        return 0;
      })
      .map((code) => renderCode(code));
  }

  return (
    <div className={CODES_CLASS}>
      <table className={`${LIST_CLASS} table-auto w-full`}>
        {props.fields.length > 0 && (
          <thead>
            <tr className="border-b border-b-[#e0e0e0]">
              <th className="py-2">{Dictionary.level}</th>
              <th className="py-2">{Dictionary.code}</th>
              <th className="py-2">{Dictionary.label}</th>
              {allowFilter ? (
                <th className="py-2">{Dictionary.filtre}</th>
              ) : null}
              {allowPrecision ? (
                <th className="py-2">{Dictionary.codePrecision}</th>
              ) : null}
            </tr>
          </thead>
        )}
        <tbody>
          {/* List of codes */}
          {renderCodes()}
        </tbody>
      </table>
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
  allowFilter: PropTypes.bool,
};

CodesListsCodes.defaultProps = {
  currentValue: '',
  currentLabel: '',
  currentPrecisionid: '',
  currentPrecisionlabel: '',
  currentPrecisionsize: undefined,
  allowPrecision: true,
  allowFilter: false,
};

const mapStateToProps = (state) => {
  const selector = formValueSelector('component');
  return {
    Type: selector(state, 'responseFormat.type'),
  };
};

export default connect(mapStateToProps)(CodesListsCodes);
