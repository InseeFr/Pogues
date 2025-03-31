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
import FilterInputContainer from '../containers/filter-input-container';
import PrecisionInputContainer from '../containers/precision-input-container';
import FilterAction from './FilterAction';
import PrecisionAction from './PrecisionAction';

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
    codeFilters = [],
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
  }, [
    activeCodeIndex,
    clearInputCode,
    collectedVariablesIds,
    get,
    push,
    remove,
  ]);

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

  function renderPrecisionInput() {
    const code = get(activeCodeIndex);

    return (
      <PrecisionInputContainer
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

  function renderFilterInput() {
    const code = get(activeCodeIndex);

    return (
      <FilterInputContainer
        change={change}
        close={() => {
          clearInputCode();
          setActiveCodeIndex(undefined);
          setShowFilter(false);
        }}
        code={code}
        formName={formName}
      />
    );
  }

  function renderCode(code) {
    const allCodes = getAll() || [];
    const indexCode = getIndexItemsByAttrs({ value: code.value }, allCodes);
    const actions = {
      updatePrecision: () => {
        setShowPrecision(true);
        setShowFilter(false);
        setActiveCodeIndex(indexCode);
      },
      updateFilter: () => {
        setShowPrecision(false);
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

    let conditionFilter = '';
    for (const codeFilter of codeFilters) {
      if (codeFilter.codeValue === code.value) {
        conditionFilter = codeFilter.conditionFilter;
        break;
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
          {allowPrecision ? (
            <td className="py-2">
              <PrecisionAction
                updatePrecision={actions.updatePrecision}
                precisionLabel={precisionLabel}
              />
            </td>
          ) : null}
          {allowFilter ? (
            <td className="py-2">
              <FilterAction
                updateFilter={actions.updateFilter}
                conditionFilter={conditionFilter}
              />
            </td>
          ) : null}
        </tr>
        {/* Filter update */}
        {showFilter && activeCodeIndex === indexCode && (
          <tr>
            <td colSpan="6" className="py-2">
              {renderFilterInput()}
            </td>
          </tr>
        )}
        {/* Precision update */}
        {showPrecision && activeCodeIndex === indexCode && (
          <tr>
            <td colSpan="6" className="py-2">
              {renderPrecisionInput()}
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
            <th className="py-2">{Dictionary.codeLevel}</th>
            <th className="py-2">{Dictionary.codeValue}</th>
            <th className="py-2">{Dictionary.codeLabel}</th>
            {allowPrecision ? (
              <th className="py-2">{Dictionary.codePrecision}</th>
            ) : null}
            {allowFilter ? <th className="py-2">{Dictionary.filtre}</th> : null}
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
    codeFilters: selector(state, 'codeFilters'),
  };
};

export default connect(mapStateToProps)(CodesListsCodes);
