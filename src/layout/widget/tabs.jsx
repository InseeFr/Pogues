import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classSet from 'react-classset';

class Tabs extends Component {
  static propTypes = {
    components: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    this.setActive = this.setActive.bind(this);
  }
  setActive(tabId) {
    const newState = {
      ...this.state,
      activeTab: tabId,
    };
    this.setState(newState);
  }
  render() {
    const components = this.props.components;
    const tabs = [];
    const contentTabs = [];

    for (let i = 0; i < components.length; i += 1) {
      const active = this.state.activeTab === i;
      const classTab = classSet({
        'nav-link': true,
        active: active,
      });
      const classContentTab = classSet({
        'nav-content': true,
        active: active,
      });
      const numErrors =
        components[i].numErrors && components[i].numErrors > 0
          ? <span className="invalid">
              <div className="alert-triangle" />
              {components[i].numErrors}
            </span>
          : '';

      tabs.push(
        <li key={`tab-${components[i].id}`} className="nav-item">
          <a className={classTab} onClick={() => this.setActive(i)}>
            {components[i].label}
          </a>
          {numErrors}
        </li>
      );
      contentTabs.push(
        <div key={`panel-${components[i].id}`} className={classContentTab}>
          {components[i].content}
        </div>
      );
    }

    return (
      <div className="tabs">
        <ul className="nav nav-tabs">
          {tabs}
        </ul>
        {contentTabs}
      </div>
    );
  }
}

export default Tabs;
