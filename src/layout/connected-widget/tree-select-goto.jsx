import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TreeSelectGoto from './components/tree-select-goto';
import {
  getListGotos,
  getComponentsTargetsByComponent,
  getComponentsTargetsByPosition,
} from 'utils/model/redirections-utils';
import Dictionary from 'utils/dictionary/dictionary';

export function mapStateToProps(state) {
  return {
    componentsStore: state.appState.activeComponentsById,
    selectedComponentId: state.appState.selectedComponentId,
  };
}

class TreeSelectGotoContainer extends Component {
  static propTypes = {
    componentsStore: PropTypes.object,
    componentId: PropTypes.string,
    componentType: PropTypes.string,
    selectedComponentId: PropTypes.string,
  };

  static defaultProps = {
    componentsStore: {},
    componentId: '',
    componentType: '',
    selectedComponentId: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      listGotos: [],
    };
  }

  componentWillMount() {
    const { componentsStore, componentId, componentType, selectedComponentId } = this.props;
    const component = componentsStore[componentId];
    let notDisabledComponentsIds;

    if (component) {
      // When the component is a new one.
      notDisabledComponentsIds = getComponentsTargetsByComponent(componentsStore, component);
    } else {
      // When the component is been edited.
      notDisabledComponentsIds = getComponentsTargetsByPosition(componentsStore, componentType, selectedComponentId);
    }

    this.setState({
      listGotos: getListGotos(componentsStore, notDisabledComponentsIds),
    });
  }

  render() {
    const props = {
      listGotos: this.state.listGotos,
      emptyValue: `-- ${Dictionary.selectTarget} --`,
    };

    return <TreeSelectGoto {...props} />;
  }
}

export default connect(mapStateToProps)(TreeSelectGotoContainer);
