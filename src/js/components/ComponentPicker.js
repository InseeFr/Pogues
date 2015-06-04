var React = require('react')
var ComponentModel = require('../models/Component')
var locale = require('../stores/dictionary-store').getDictionary();
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
			value: this.props.initialValue
		}
	},
	render: function() {
		return (
			<div>
            	<input value={this.state.value}
            		onChange={this.props.handleChange.bind(null, event.target.value)}
                	type="text" className="form-control" placeholder={locale.target}
					list="candidates" />
			</div>
		);
	}
});

module.exports = ComponentPicker;