import React from 'react';
import PropTypes from 'prop-types';

import ListWithInputPanelItem from './list-with-input-panel-item';

import { WIDGET_LIST_WITH_INPUT_PANEL } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { markdownVtlToString } from 'forms/controls/rich-textarea/utils/rich-textarea-utils';

const { LIST_CLASS, LIST_EMPTY_CLASS, VARIABLE_NAME_CLASS } =
  WIDGET_LIST_WITH_INPUT_PANEL;

function ListWithInputPanelList({ fields, select, errors }) {
  const fieldsName = fields.name.split('.')[1];
  const items = fields.map((key, index, listFields) => {
    const item = listFields.get(index);
    let prefix = '';
    if (item.x || item.y) {
      prefix += `(${item.x}`;
      if (item.y) prefix += `,${item.y}`;
      prefix += ') ';
    }
    return {
      key: key,
      hasError:
        item.id && errors.filter(e => e.itemListId === item.id).length > 0,
      index: index,
      x: item.x,
      y: item.y,
      prefix: prefix,
      name: item.name,
      label: markdownVtlToString(item.label),
    };
  });

  return (
    <ul className={LIST_CLASS}>
      {items.length === 0 && (
        <li className={LIST_EMPTY_CLASS}>{Dictionary[`no_${fieldsName}`]}</li>
      )}
      {items
        .sort(
          (item1, item2) =>
            item1.y > item2.y ||
            (item1.x > item2.x && item1.y === item2.y) ||
            (item1.x === item2.x &&
              item1.y === item2.y &&
              item1.name > item2.name),
        )
        .map(item => {
          return (
            <ListWithInputPanelItem
              key={item.key}
              select={() => select(item.index)}
              invalid={item.hasError}
            >
              <>
                {`${item.prefix} ${item.label}`}
                <span className={VARIABLE_NAME_CLASS}>{` [${item.name}]`}</span>
              </>
            </ListWithInputPanelItem>
          );
        })}
    </ul>
  );
}

ListWithInputPanelList.propTypes = {
  fields: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
  errors: PropTypes.array,
};

ListWithInputPanelList.defaultProps = {
  errors: [],
};

export default ListWithInputPanelList;
