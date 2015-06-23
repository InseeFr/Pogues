//DatatypeEditor
var React = require('react');
var DatatypeModel = require('../models/Datatype');
var NumericDatatypeEditor = require('./NumericDatatypeEditor');
var TextDatatypeEditor = require('./TextDatatypeEditor');
var DateDatatypeEditor = require('./DateDatatypeEditor');
var Logger = require('../logger/Logger');

var logger = new Logger('DatatypeEditor', 'Components');

var DatatypeEditor =  React.createClass({

	propTypes: {
		change: React.PropTypes.func,
		datatype: React.PropTypes.instanceOf(DatatypeModel)
	},

	switchEditor: function(typeName) {
		var datatypeComponent = {
			NUMERIC: <NumericDatatypeEditor datatype={this.props.datatype}/>,
			TEXT: <TextDatatypeEditor datatype={this.props.datatype}/>,
			DATE: <DateDatatypeEditor datatype={this.props.datatype}/>
		};
		return datatypeComponent[typeName];
	},

	render: function() {
		var el = this.switchEditor(this.props.datatype);
		logger.debug('Editor will be ', el);
		return (el);
	}
});

module.exports = DatatypeEditor;