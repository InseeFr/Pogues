//DatatypeEditor
var React = require('react');
var DatatypeModel = require('../models/datatype');
var NumericDatatypeEditor = require('./numeric-datatype-editor');
var TextDatatypeEditor = require('./text-datatype-editor');
var DateDatatypeEditor = require('./date-datatype-editor');
var Logger = require('../logger/logger');

var logger = new Logger('DatatypeEditor', 'Components');

function switchEditor(datatype, setDatatype) {
    var datatypeComponent = {
      NUMERIC: <NumericDatatypeEditor
                change={setDatatype}
                datatype={datatype}/>,
      TEXT: <TextDatatypeEditor
              change={setDatatype}
              datatype={datatype}/>,
      DATE: <DateDatatypeEditor
              change={setDatatype}
              datatype={datatype}/>
      };
    return datatypeComponent[datatype.typeName];
  }

var DatatypeEditor =  React.createClass({

	propTypes: {
		change: React.PropTypes.func,
		datatype: React.PropTypes.instanceOf(DatatypeModel)
	},

  componentWillMount: function() {
    this.setState({
      datatype: this.props.datatype
    })
  },

  _setDatatype: function (datatype) {
    this.setState({
      datatype: datatype
    })
    this.props.change(datatype)
  },


	render: function() {
		var el = switchEditor(this.props.datatype, this._setDatatype)
		return (el);
	}
});

module.exports = DatatypeEditor;
