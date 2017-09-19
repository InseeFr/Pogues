import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TreeSelectGoto from './components/tree-select-goto';
import { getListGotos, getComponentsTargets } from 'utils/model/redirections-utils';
import Dictionary from 'utils/dictionary/dictionary';

export function mapStateToProps(state) {
  return {
    componentsStore: state.appState.activeComponentsById,
  };
}

class TreeSelectGotoContainer extends Component {
  static propTypes = {
    componentsStore: PropTypes.object,
    componentId: PropTypes.string,
  };

  static defaultProps = {
    componentsStore: {},
    componentId: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      listGotos: [],
    };
  }

  componentWillMount() {
    const { componentsStore, componentId } = this.props;
    const notDisabledComponentsIds = getComponentsTargets(componentsStore, componentsStore[componentId]);

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
