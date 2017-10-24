import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';

import TreeSelectGoto from './components/tree-select-goto';
import Dictionary from 'utils/dictionary/dictionary';

export function mapStateToProps(state, { formName }) {
  formName = formName || 'component';
  const selector = formValueSelector(formName);
  return {
    componentsStore: state.appState.activeComponentsById,
    selectedComponentId: state.appState.selectedComponentId,
    selectedGoto: selector(state, 'redirections.cible'),
  };
}

class TreeSelectGotoContainer extends Component {
  static propTypes = {
    listTargets: PropTypes.array.isRequired,
    autocomplete: PropTypes.bool,
  };

  static defaultProps = {
    autocomplete: true,
  };

  render() {
    return (
      <TreeSelectGoto
        listTargets={this.props.listTargets}
        emptyValue={`-- ${Dictionary.selectTarget} --`}
        autocomplete={this.props.autocomplete}
      />
    );
  }
}

export default connect(mapStateToProps)(TreeSelectGotoContainer);
