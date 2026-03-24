import PropTypes from 'prop-types';

// Prop types and default props

const propTypes = {
  children: PropTypes.element.isRequired,
};

// Component

function Tab({ children }) {
  return <div className="nav-content">{children}</div>;
}

Tab.propTypes = propTypes;

export default Tab;
