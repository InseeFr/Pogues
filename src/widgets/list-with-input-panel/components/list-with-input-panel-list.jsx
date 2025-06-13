import PropTypes from 'prop-types';

import { markdownVtlToString } from '../../../forms/controls/rich-textarea/utils/rich-textarea-utils';
import Dictionary from '../../../utils/dictionary/dictionary';
import ListWithInputPanelItem from './list-with-input-panel-item';

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
        item.id && errors.filter((e) => e.itemListId === item.id).length > 0,
      index: index,
      x: item.x,
      y: item.y,
      prefix: prefix,
      name: item.name,
      isCollected: item.isCollected,
      label: markdownVtlToString(item.label),
      alternativeLabel: item.alternativeLabel,
    };
  });

  return (
    <ul className="widget-list-with-input-panel__list">
      {items.length === 0 && (
        <li className="widget-list-with-input-panel__list-empty">
          {Dictionary[`no_${fieldsName}`]}
        </li>
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
        .map((item) => {
          return (
            <ListWithInputPanelItem
              key={item.key}
              select={() => select(item.index)}
              invalid={item.hasError}
            >
              {item.isCollected === '0' && (
                <>
                  {`${item.prefix}`}
                  <span className="widget-list-with-input-panel__uncollected-variable">{`${Dictionary.unCollected}`}</span>
                  {` : ${item.alternativeLabel}`}
                </>
              )}
              {item.isCollected !== '0' && `${item.prefix} ${item.label}`}
              {item.isCollected !== '0' && item.name && (
                <span className="widget-list-with-input-panel__variable-name">{` [${item.name}]`}</span>
              )}
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
