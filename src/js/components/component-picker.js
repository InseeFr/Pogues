import React from 'react'
import ComponentModel from '../models/component'
import {getDictionary} from '../stores/dictionary-store';
var locale = getDictionary()
import QuestionnaireStore from '../stores/questionnaire-store';
import QuestionnaireUtils from '../utils/questionnaire-utils'
// TODO think about relying on QuestionnaireStore to retrieve questionnaire
//import ComponentStore from '../stores/component-store';

var ComponentPicker = React.createClass({
  propTypes: {
    candidates: React.PropTypes.arrayOf(
      React.PropTypes.instanceOf(ComponentModel)).isRequired,
    handleChange: React.PropTypes.func,
    initialValue: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      cmpntName: this.props.initialValue,
      questionnaire: QuestionnaireStore.getQuestionnaire()
    }
  },
  _handleChange: function(event) {
    var cmpntName = event.target.value
    this.setState({
      cmpntName: cmpntName
    })
    this.props.handleChange(cmpntName, event);
  },
  render: function() {
    return (
          <input value={this.state.cmpntName}
            onChange={this._handleChange}
              type="text" className="form-control" placeholder={locale.target}
        list="candidates" />
    );
  }
});

module.exports = ComponentPicker;
