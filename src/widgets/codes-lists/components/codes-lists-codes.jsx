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
import FilterAction from './FilterAction';
import SpecifyAction from './SpecifyAction';

const { CODES_CLASS, LIST_CLASS } = WIDGET_CODES_LISTS;

/** Display codes of a codes list in a table. */
function CodesListsCodes(props) {
  const {
    inputCodePath,
    formName,
    change,
    currentPrecisionid,
    currentPrecisionlabel,
    currentPrecisionsize,
    collectedVariablesIds,
    meta,
    fields: { getAll, push, remove, get },
    allowPrecision,
    allowFilter,
  } = props;

  const [activeCodeIndex, setActiveCodeIndex] = useState(undefined);
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

    // Check if we have a "precision" related to our current collected variables
    const newPrecisionByCollectedVariableId = {
      ...code.precisionByCollectedVariableId,
    };
    if (code.precisionByCollectedVariableId) {
      for (const key of Object.keys(code.precisionByCollectedVariableId)) {
        if (collectedVariablesIds.has(key)) {
          delete newPrecisionByCollectedVariableId[key];
        }
      }
    }

    const values = {
      ...code,
      precisionByCollectedVariableId: newPrecisionByCollectedVariableId,
      precisionid: undefined,
      precisionlabel: undefined,
      precisionsize: undefined,
    };
    setActiveCodeIndex(undefined);
    setShowPrecision(false);
    remove(activeCodeIndex);
    push(values);
    clearInputCode();
  }, [activeCodeIndex, clearInputCode, get, push, remove]);

  const pushCode = useCallback(() => {
    let values;

    const code = get(activeCodeIndex);
    remove(activeCodeIndex);

    values = {
      ...code,
      precisionid: currentPrecisionid,
      precisionlabel: currentPrecisionlabel,
      precisionsize: currentPrecisionsize,
    };
    setActiveCodeIndex(undefined);

    push(values);
    clearInputCode();
  }, [
    activeCodeIndex,
    clearInputCode,
    currentPrecisionid,
    currentPrecisionlabel,
    currentPrecisionsize,
    get,
    push,
    remove,
  ]);

  function renderInputCode() {
    const code = get(activeCodeIndex);

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
      },
      updateFilter: () => {
        setShowFilter(true);
        setActiveCodeIndex(indexCode);
      },
    };

    // Use current form "precision" label if there is one
    let precisionLabel = code.precisionlabel ?? '';

    // Otherwise check if we have a "precision" related to our current component
    // collected variables
    if (!precisionLabel && code.precisionByCollectedVariableId) {
      for (const [key, values] of Object.entries(
        code.precisionByCollectedVariableId,
      )) {
        if (collectedVariablesIds.has(key)) {
          precisionLabel = values.precisionlabel;
          break;
        }
      }
    }

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
                precisionLabel={precisionLabel}
              />
            </td>
          ) : null}
        </tr>
        {/* Filter update */}
        {showFilter && activeCodeIndex === indexCode && (
          <tr>
            <td colSpan="6" className="py-2">
              {renderInputCode()}
            </td>
          </tr>
        )}
        {/* Precision update */}
        {showPrecision && activeCodeIndex === indexCode && (
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

  return props.fields.length > 0 ? (
    <div className={CODES_CLASS}>
      <table className={`${LIST_CLASS} table-auto w-full`}>
        <thead>
          <tr className="border-b border-b-[#e0e0e0]">
            <th className="py-2">{Dictionary.level}</th>
            <th className="py-2">{Dictionary.code}</th>
            <th className="py-2">{Dictionary.label}</th>
            {allowFilter ? <th className="py-2">{Dictionary.filtre}</th> : null}
            {allowPrecision ? (
              <th className="py-2">{Dictionary.codePrecision}</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {/* List of codes */}
          {renderCodes()}
        </tbody>
      </table>
    </div>
  ) : null;
}

CodesListsCodes.propTypes = {
  fields: PropTypes.shape(fieldArrayFields).isRequired,
  meta: PropTypes.shape({ ...fieldArrayMeta, error: PropTypes.array })
    .isRequired,

  currentPrecisionid: PropTypes.string,
  currentPrecisionlabel: PropTypes.string,
  currentPrecisionsize: PropTypes.number,

  formName: PropTypes.string.isRequired,
  inputCodePath: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  allowPrecision: PropTypes.bool,
  allowFilter: PropTypes.bool,

  collectedVariablesIds: PropTypes.isRequired,
};

CodesListsCodes.defaultProps = {
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
