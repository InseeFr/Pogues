var React = require('react')
var ComponentModel = require('../models/Component')
var locale = require('../stores/dictionary-store').getDictionary();
var QuestionnaireStore = require('../stores/questionnaire-store')
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
      value: this.props.initialValue,
      questionnaire: QuestionnaireStore.getQuestionnaire()
    }
  },
  _handleChange: function(event) {
    var target = QuestionnaireUtils.getComponentByName(qusetionnaire, event.target.value)
    this.setState({
      value: event.target.value
    })
    this.props.handleChange(target)
  },
  render: function() {
    return (
          <input value={this.state.value}
            onChange={this._handleChange}
              type="text" className="form-control" placeholder={locale.target}
        list="candidates" />
    );
  }
});

module.exports = ComponentPicker;