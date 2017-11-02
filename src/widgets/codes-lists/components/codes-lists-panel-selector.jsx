import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getControlId } from 'utils/widget-utils';
import { WIDGET_CODES_LISTS } from 'constants/dom-constants';

const { PANEL_SELECTOR_CLASS, PANEL_SELECTOR_OPTION_CLASS } = WIDGET_CODES_LISTS;

// PropTypes and defaultProps

export const propTypes = {
  name: PropTypes.string.isRequired,
  selectedOption: PropTypes.string,
  changeToPanel: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};

export const defaultProps = {
  options: [],
  selectedOption: undefined,
};

// Componet

class CodesListsPanelSelector extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentDidMount() {
    const { options, selectedOption } = this.props;
    const checkedOption = selectedOption || options[0].value;

    this[`option-${checkedOption}`].checked = true;
  }

  render() {
    const { name, options, changeToPanel } = this.props;

    return (
      <div className={PANEL_SELECTOR_CLASS}>
        {options.map(o => {
          const id = getControlId('panel-selector', name, o.value);

          return (
            <label key={o.value} htmlFor={id} className={`${PANEL_SELECTOR_OPTION_CLASS} radio-inline`}>
              <input
                id={id}
                type="radio"
                name={name}
                value={o.value}
                onClick={() => {
                  changeToPanel(o.value);
                }}
                ref={node => {
                  this[`option-${o.value}`] = node;
                }}
              />
              {o.label}
            </label>
          );
        })}
      </div>
    );
  }
}

export default CodesListsPanelSelector;
