var React = require('react')
var ComponentPicker = require('./component-picker')
var ComponentModel = require('../models/component')
var QuestionnaireStore = require('../stores/questionnaire-store')
var QuestionnaireUtils = require('../utils/questionnaire-utils')
var classNames = require('classnames')
// constants for status identification
var NON_EXISTING = 'NON_EXISTING'
var AFTER = 'AFTER'
var BEFORE = 'BEFORE'
var EMPTY = 'EMPTY'

var Target = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    initialTarget: React.PropTypes.instanceOf(ComponentModel),
    candidates: React.PropTypes.arrayOf(
      React.PropTypes.instanceOf(ComponentModel)).isRequired,
  },
  getInitialState: function() {
    return {
      target: this.props.initialTarget,
      questionnaire: QuestionnaireStore.getQuestionnaire()
    }
  },
  _handleChange: function(cmpntName, event) {
    var status
    if (!cmpntName) {
      this.setState({
        target: null,
        status: EMPTY
      })
      return;
    }
    var target = QuestionnaireUtils.getComponentByName(
                    this.state.questionnaire, event.target.value)
    // TODO make status determination consistent
    if (!target) {
      status = NON_EXISTING
    } else if (this.props.candidates.indexOf(target) !== -1) {
      status = AFTER
    } else {
      status = BEFORE
    }
    //FIXME For now, we're just setting the value of the field as a ref
    // for the ifTrue component
    this.props.handleChange(target.id);
    this.setState({
      target: event.target.value,
      status: status
    })
  },
  render: function() {

    // TODO remove target.id from cmpntName (debugging purposes)
    var cmpntName = this.state.target ?
                      this.state.target.label + ' (' + this.state.target.id + ')' :
                      "";
    var status = this.state.status
    var divCn = classNames({
        'form-group': true,
        'has-feedback': true,
        'has-success': status === AFTER,
        'has-warning': status === NON_EXISTING,
        'has-error': status === BEFORE
      });
    var spanCn = classNames({
      'glyphicon': true,
      'form-control-feedback': true,
      'glyphicon-ok': status === AFTER,
      'glyphicon-warning-sign': status === NON_EXISTING,
      'glyphicon-remove': status === BEFORE
    })
    return (
      <div className={divCn}>
        <label className="col-sm-4 control-label">{this.props.text}</label>
          <div className="col-sm-4">
          <ComponentPicker
            initialValue={this.props.initialValue}
            candidates={this.props.candidates}
            handleChange={this._handleChange}/>
          <span className={spanCn} aria-hidden="true"></span>
        </div>
        <div className="col-sm-4">
          <input disabled className="form-control"
            value={cmpntName}/>
        </div>
      </div>
    );
  }
});

module.exports = Target
