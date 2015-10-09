var React = require('react')
var ComponentModel = require('../models/component')
var locale = require('../stores/dictionary-store').getDictionary();
var QuestionnaireStore = require('../stores/questionnaire-store')
var QuestionnaireUtils = require('../utils/questionnaire-utils')
// TODO think about relying on QuestionnaireStore to retrieve questionnaire
//var ComponentStore = require('../stores/component-store')

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
