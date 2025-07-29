import { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { WIDGET_INPUT_FILTER_WITH_CRITERIA } from '../../constants/dom-constants';
import Dictionary from '../../utils/dictionary/dictionary';
import { uuid } from '../../utils/utils';
import { getControlId } from '../../utils/widget-utils';

const {
  COMPONENT_CLASS,
  PANEL_INPUT_CLASS,
  SEARCH_INPUT_CLASS,
  BUTTON_SEARCH_CLASS,
} = WIDGET_INPUT_FILTER_WITH_CRITERIA;

const InputFilterWithCriteria = (props) => {
  const {
    typeItem,
    criteriaValues,
    label,
    loadOnInit,
    loadSearchResult,
    token,
  } = props;
  const inputSearchRef = useRef(null);

  useEffect(() => {
    if (loadOnInit) loadSearchResult(token, typeItem);
  }, [typeItem, loadOnInit, token, loadSearchResult]);

  const id = getControlId('input', 'search', uuid());

  return (
    <div className={COMPONENT_CLASS}>
      <div className={PANEL_INPUT_CLASS}>
        <label htmlFor={id}>{label}</label>
        <div>
          <input
            id={id}
            className={SEARCH_INPUT_CLASS}
            type="text"
            placeholder={label}
            ref={inputSearchRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                props.loadSearchResult(
                  token,
                  typeItem,
                  criteriaValues,
                  inputSearchRef.current.value.trim(),
                );
            }}
          />
        </div>
      </div>
      <button
        className={BUTTON_SEARCH_CLASS}
        onClick={(event) => {
          event.preventDefault();
          props.loadSearchResult(
            token,
            typeItem,
            criteriaValues,
            inputSearchRef.current.value.trim(),
          );
        }}
      >
        {Dictionary.searchInputButton}
      </button>
    </div>
  );
};

// PropTypes and defaultProps

InputFilterWithCriteria.propTypes = {
  token: PropTypes.string,
  typeItem: PropTypes.string.isRequired,
  loadSearchResult: PropTypes.func.isRequired,
  criteriaValues: PropTypes.object,
  loadOnInit: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

InputFilterWithCriteria.defaultProps = {
  token: '',
  criteriaValues: {},
};

export default InputFilterWithCriteria;
