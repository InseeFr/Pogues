import PropTypes from 'prop-types';
import classSet from 'react-classset';

function ListWithInputPanelItem({ children, invalid, select }) {
  return (
    <li
      className={classSet({
        ['widget-list-with-input-panel__item']: true,
        ['widget-list-with-input-panel__item-invalid']: invalid,
      })}
    >
      <button
        type="button"
        onClick={(event) => {
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
