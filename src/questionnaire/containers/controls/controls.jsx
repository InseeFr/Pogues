import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector} from 'redux-form';

import Controls from 'questionnaire/components/controls/controls';

const selector = formValueSelector('question');

const mapStateToProps = state => {
  const controls = [] 
  /*Object.keys(state.appState.activeControlssById)
                            .map(key => state.appState.activeControlsById[key], []);*/
  
  return {
    controls,
  };
};

const mapDispatchToProps = {
  
};

class ControlsContainer extends Component {
  static propTypes = {
    controls: PropTypes.array.isRequired,
  };

  componentWillMount() {
    
  }

  render() {
    const { controls } = this.props;
    return <Controls controls={controls} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlsContainer);
