import PropTypes from 'prop-types';

// PropTypes and defaultProps

const propTypes = {
  errors: PropTypes.array,
};

const defaultProps = {
  errors: [],
};

// Component

function ErrrosPanel({ errors }) {
  return (
    <div className="widget-errors-panel">
      {errors.length > 0 && (
        <ul className="widget-errors-panel__inner">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

ErrrosPanel.propTypes = propTypes;
ErrrosPanel.defaultProps = defaultProps;

export default ErrrosPanel;
