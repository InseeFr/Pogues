import React from 'react';
import PropTypes from 'prop-types';
import classSet from 'react-classset';

import { WIDGET_LIST_WITH_INPUT_PANEL } from '../../../constants/dom-constants';

const { ITEM_CLASS, ITEM_INVALID_CLASS } = WIDGET_LIST_WITH_INPUT_PANEL;

function ListWithInputPanelItem({ children, invalid, select }) {
  return (
    <li
      className={classSet({
        [ITEM_CLASS]: true,
        [ITEM_INVALID_CLASS]: invalid,
      })}
    >
      <button
        type="button"
        onClick={event => {
          event.preventDefault();
          select();
        }}
      >
        <span
          className="glyphicon glyphicon-chevron-right"
          aria-hidden="true"
        />
        {children}
      </button>
    </li>
  );
}

ListWithInputPanelItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  select: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
};

ListWithInputPanelItem.defaultProps = {
  invalid: false,
};

export default ListWithInputPanelItem;
