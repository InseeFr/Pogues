import React, { useState, Children } from 'react';
import PropTypes from 'prop-types';
import classSet from 'react-classset';

import { WIDGET_TABS } from '../../../constants/dom-constants';

const { COMPONENT_CLASS, INVALID, ITEM } = WIDGET_TABS;

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
        <li key={`tab-${childProps.path}`} className={ITEM}>
          <a
            role="button"
            tabIndex={0}
            className={classTab}
            onClick={event => {
              event.preventDefault();
              setActivePanelIndex(index);
            }}
          >
            {childProps.label}
          </a>
          {numErrors > 0 && (
            <span className={INVALID}>
              <div className="alert-triangle" />
              {numErrors}
            </span>
          )}
        </li>
      );
    });
  }

  return (
    <div className={COMPONENT_CLASS}>
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
