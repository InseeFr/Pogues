import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classSet from 'react-classset';

import { WIDGET_TABS } from 'constants/dom-constants';

const { COMPONENT_CLASS, INVALID, ITEM } = WIDGET_TABS;

// PropTypes and defaultProps

const propTypes = {
  errorsByTab: PropTypes.object,
  children: PropTypes.array.isRequired,
};

const defaultProps = {
  errorsByTab: {},
  validationErrors: {},
};

// Component

class Tabs extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    this.state = {
      activePanelIndex: 0,
    };
  }

  renderTabs() {
    return Children.map(this.props.children, (child, index) => {
      const childProps = child.props;
      const classTab = classSet({
        'nav-link': true,
        active: this.state.activePanelIndex === index,
      });
      const numErrors = this.props.errorsByTab[childProps.path];

      return (
        <li key={`tab-${childProps.path}`} className={ITEM}>
          <a
            role="button"
            className={classTab}
            onClick={event => {
              event.preventDefault();
              this.setState({
                activePanelIndex: index,
              });
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

  render() {
    return (
      <div className={COMPONENT_CLASS}>
        <ul className="nav nav-tabs">{this.renderTabs()}</ul>
        {this.props.children[this.state.activePanelIndex]}
      </div>
    );
  }
}

export default Tabs;
