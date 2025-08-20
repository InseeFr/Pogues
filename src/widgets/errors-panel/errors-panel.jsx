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
      {errors.length > 0 ? (
        <ul className="widget-errors-panel__inner">
          {errors.map(({ path, error }) => (
            <li key={`${path}_${error}`}>{error}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

ErrrosPanel.propTypes = propTypes;
ErrrosPanel.defaultProps = defaultProps;

export default ErrrosPanel;
