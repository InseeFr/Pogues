import React, { useState } from 'react';

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
import FilterAction from './FilterAction';

const { CODES_CLASS, LIST_CLASS } = WIDGET_CODES_LISTS;

/** Display codes of a codes list in a table. */
function CodesListsCodes(props) {
  const {
    formName,
    change,
    fields: { getAll, get },
    allowPrecision,
    allowFilter,
    codeFilters = [],
    isPrecision,
    precisionCodeValue,
  } = props;
  const [activeCodeIndex, setActiveCodeIndex] = useState(undefined);
  const [showFilter, setShowFilter] = useState(false);

  function renderFilterInput() {
    const code = get(activeCodeIndex);

    return (
      <FilterInputContainer
        change={change}
        close={() => {
          setActiveCodeIndex(undefined);
          setShowFilter(false);
        }}
        code={code}
        formName={formName}
      />
    );
  }

  function renderCode(code, isPrecision, precisionCodeValue) {
    const allCodes = getAll() || [];
    const indexCode = getIndexItemsByAttrs({ value: code.value }, allCodes);
    const actions = {
      updateFilter: () => {
        setShowFilter(true);
        setActiveCodeIndex(indexCode);
      },
    };

    const hasPrecision = isPrecision && code.value === precisionCodeValue;

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
              {hasPrecision && <CheckIcon className="w-10 h-4" />}
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
        {/* Children codes */}
        {renderCodes(isPrecision, precisionCodeValue, code.value)}
      </React.Fragment>
    );
  }

  function renderCodes(isPrecision, precisionCodeValue, parent = '') {
    const allCodes = getAll() || [];
    return allCodes
      .filter((code) => code.parent === parent)
      .sort((code, nexCode) => {
        if (code.weight < nexCode.weight) return -1;
        if (code.weight > nexCode.weight) return 1;
        return 0;
      })
      .map((code) => renderCode(code, isPrecision, precisionCodeValue));
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
          {renderCodes(isPrecision, precisionCodeValue)}
        </tbody>
      </table>
    </div>
  ) : null;
}

function CheckIcon(props) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}

CodesListsCodes.propTypes = {
  fields: PropTypes.shape(fieldArrayFields).isRequired,
  meta: PropTypes.shape({ ...fieldArrayMeta, error: PropTypes.array })
    .isRequired,

  precisionCodeValue: PropTypes.string,

  formName: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  allowPrecision: PropTypes.bool,
  allowFilter: PropTypes.bool,
};

CodesListsCodes.defaultProps = {
  isPrecision: false,
  precisionCodeValue: '',
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
