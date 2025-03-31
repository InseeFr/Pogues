import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { WIDGET_CODES_LISTS } from '../../../constants/dom-constants';
import { RichEditorWithVariable } from '../../../forms/controls/control-with-suggestions';
import Dictionary from '../../../utils/dictionary/dictionary';

const {
  CODE_INPUT_CLASS,
  CODE_INPUT_ACTIONS_CLASS,
  CODE_INPUT_ERRORS_CLASS,
  CODE_INPUT_CODE_CLASS_PRECISION,
} = WIDGET_CODES_LISTS;

const propTypes = {
  change: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  code: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }),
  codeFilters: PropTypes.arrayOf(
    PropTypes.shape({
      codeValue: PropTypes.string.isRequired,
      conditionFilter: PropTypes.string.isRequired,
    }),
  ).isRequired,
  formName: PropTypes.string,
};

/** Add, update or remove a filter for a code. */
function FilterInput({
  change,
  close,
  code = { value: '' },
  codeFilters = [],
  formName = 'component',
}) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const found = codeFilters.find(
      (codeFilter) => codeFilter.codeValue === code.value,
    );
    if (found) {
      setValue(found.conditionFilter);
    } else {
      setValue('');
    }
  }, [codeFilters, code]);

  function deleteFilter() {
    const newCodeFilters = [...codeFilters];
    const index = newCodeFilters.findIndex(
      (codeFilter) => codeFilter.codeValue === code.value,
    );
    if (index > -1) {
      newCodeFilters.splice(index, 1);
      change(formName, 'codeFilters', newCodeFilters);
    } else {
      setValue('');
    }
    close();
  }

  function setFilter() {
    const newCodeFilters = [...codeFilters];
    const found = newCodeFilters.find(
      (codeFilter) => codeFilter.codeValue === code.value,
    );
    if (found) {
      found.conditionFilter = value;
    } else {
      newCodeFilters.push({
        codeValue: code.value,
        conditionFilter: value,
      });
    }

    change(formName, 'codeFilters', newCodeFilters);
  }

  return (
    <div className={CODE_INPUT_CLASS}>
      <div className={CODE_INPUT_ERRORS_CLASS} />
      <div className="w-2/3 m-auto">
        <div className={`${CODE_INPUT_CODE_CLASS_PRECISION} !w-full`}>
          <RichEditorWithVariable
            label={Dictionary.filtre}
            input={{ value, onChange: setValue, name: 'condition-filter' }}
          />
          <div className="text-center">
            <button
              className={`${CODE_INPUT_ACTIONS_CLASS}-cancel`}
              type="button"
              onClick={deleteFilter}
              title={Dictionary.remove}
            >
              <span className="glyphicon glyphicon-trash" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className={`${CODE_INPUT_ACTIONS_CLASS} col-span-full !w-full text-center !mt-6`}
        >
          <button
            className={`${CODE_INPUT_ACTIONS_CLASS}-cancel`}
            type="button"
            onClick={close}
          >
            {Dictionary.cancel}
          </button>
          <button
            className={`${CODE_INPUT_ACTIONS_CLASS}-validate`}
            onClick={(e) => {
              e.preventDefault();
              setFilter();
              close();
            }}
          >
            {Dictionary.validate}
          </button>
        </div>
      </div>
    </div>
  );
}

FilterInput.propTypes = propTypes;

export default FilterInput;
