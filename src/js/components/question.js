var React = require('react');
var EditActivator = require('../components/edit-activator');
var classNames = require('classnames');

var Question = React.createClass({

	getInitialState: function() {
    return {over: false};
  },

  _handleMouseOver: function() {
    this.setState({over: true});
  },

  _handleMouseLeave: function() {
    this.setState({over: false});
  },

	render: function() {
		var highlightHandler = this.props.highlightHandler;
		var question = this.props.question;
	    var classes = classNames({
	      'row': true,
	      'highlight': highlightHandler ? highlightHandler.test(question.name) : false
	    });
		return(
			<div id={question.id} className={classes} onMouseOver={this._handleMouseOver} onMouseLeave={this._handleMouseLeave}>
				<div className="col-md-10">
			    <h4 className="question-header">{this.props.question.name}</h4>
				</div>
				<EditActivator componentId={this.props.question.id} componentOver={this.state.over}/>
			</div>
			);
	}
});

module.exports = Question;
