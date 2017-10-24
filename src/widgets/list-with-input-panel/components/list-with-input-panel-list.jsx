import React from 'react';
import PropTypes from 'prop-types';

import ListWithInputPanelItem from './list-with-input-panel-item';

import { WIDGET_LIST_WITH_INPUT_PANEL } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';

const { LIST_CLASS, LIST_EMPTY_CLASS } = WIDGET_LIST_WITH_INPUT_PANEL;

// PropTypes and defaultProps

export const propTypes = {
  fields: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
  dictionaryNoItems: PropTypes.string.isRequired,
};

// Component

function ListWithInputPanelList({ fields, select, dictionaryNoItems }) {
  return (
    <ul className={LIST_CLASS}>
      {fields.length === 0 && <li className={LIST_EMPTY_CLASS}>{Dictionary[dictionaryNoItems]}</li>}
      {fields.map((name, index, listFields) => {
        const item = listFields.get(index);
        return (
          <ListWithInputPanelItem
            key={name}
            onClick={() => {
              select(index);
            }}
          >
            {item.label}
          </ListWithInputPanelItem>
        );
      })}
    </ul>
  );
}

ListWithInputPanelList.propTypes = propTypes;

export default ListWithInputPanelList;
