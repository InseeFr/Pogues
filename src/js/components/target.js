var React = require('react')
var ComponentPicker = require('./ComponentPicker')
var ComponentModel = require('../models/Component')

var Target = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    initialTarget: React.PropTypes.instanceOf(ComponentModel),
    candidates: React.PropTypes.arrayOf(
      React.PropTypes.instanceOf(ComponentModel)).isRequired
  },
  getInitialState: function() {
    return {
      target: this.props.initialTarget
    }
  },
  _handleChange: function(target) {
    this.props.handleChange(target)
    this.setState({
      target: target
    })
  },
	render: function() {

    // TODO remove target.id from cmpntName (debugging purposes)
    var cmpntName = this.state.target ?
                      this.state.target.label + ' (' + this.state.target.id + ')' :
                      ""
		return (
      <div className="form-group has-success has-feedback">
  			<label className="col-sm-4 control-label">{this.props.text}</label>
      		<div className="col-sm-4">
        	<ComponentPicker
            initialValue={this.props.initialValue}
            candidates={this.props.candidates}
        		handleChange={this._handleChange}/>
        	<span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
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