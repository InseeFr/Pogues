import { Children, useState } from 'react';

import PropTypes from 'prop-types';
import classSet from 'react-classset';

function Tabs({ children, errorsByTab }) {
  const [activePanelIndex, setActivePanelIndex] = useState(0);

  function renderTabs() {
    return Children.map(children, (child, index) => {
      const childProps = child.props;
      const classTab = classSet({
        'nav-link': true,
        active: activePanelIndex === index,
      });
      const numErrors = errorsByTab[childProps.path];

      return (
        <li key={`tab-${childProps.path}`} className="widget-tabs-item">
          <a
            role="button"
            tabIndex={0}
            className={classTab}
            onClick={(event) => {
              event.preventDefault();
              setActivePanelIndex(index);
            }}
          >
            {childProps.label}
          </a>
          {numErrors > 0 && (
            <span className="widget-tabs-invalid">
              <div className="alert-triangle" />
              {numErrors}
            </span>
          )}
        </li>
      );
    });
  }

  return (
    <div className={'widget-tabs'}>
      <ul className="nav nav-tabs">{renderTabs()}</ul>
      {children[activePanelIndex]}
    </div>
  );
}

Tabs.propTypes = {
  errorsByTab: PropTypes.object,
  children: PropTypes.array.isRequired,
};

Tabs.defaultProps = {
  errorsByTab: {},
  validationErrors: {},
};

export default Tabs;
