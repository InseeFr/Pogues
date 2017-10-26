import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { WIDGET_INPUT_FILTER_WITH_CRITERIA } from 'constants/dom-constants';
import { getControlId, uuid } from 'utils/widget-utils';
import Dictionary from 'utils/dictionary/dictionary';

const {
  COMPONENT_CLASS,
  PANEL_INPUT_CLASS,
  SEARCH_INPUT_CLASS,
  BUTTON_SEARCH_CLASS,
} = WIDGET_INPUT_FILTER_WITH_CRITERIA;

// PropTypes and defaultProps

const propTypes = {
  typeItem: PropTypes.string.isRequired,
  loadSearchResult: PropTypes.func.isRequired,
  criteriaValues: PropTypes.object,
  loadOnInit: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

const defaultProps = {
  criteriaValues: {},
};

// Component

class InputFilterWithCriteria extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentWillMount() {
    if (this.props.loadOnInit) this.props.loadSearchResult(this.props.typeItem);
  }

  render() {
    const { typeItem, criteriaValues, label } = this.props;
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
              ref={node => {
                this.inputSearch = node;
              }}
            />
          </div>
        </div>
        <button
          className={BUTTON_SEARCH_CLASS}
          onClick={event => {
            event.preventDefault();
            this.props.loadSearchResult(typeItem, criteriaValues, this.inputSearch.value.trim());
          }}
        >
          {Dictionary.searchInputButton}
        </button>
      </div>
    );
  }
}

export default InputFilterWithCriteria;
