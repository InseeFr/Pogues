//DatatypeEditor
var React = require('react');
var DatatypeModel = require('../models/Datatype');
var NumericDatatypeEditor = require('./NumericDatatypeEditor');
var TextDatatypeEditor = require('./TextDatatypeEditor');
var DateDatatypeEditor = require('./DateDatatypeEditor');
var Logger = require('../logger/Logger');

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
		var el = switchEditor(this.state.datatype, this._setDatatype.bind(this))
		logger.debug('Editor will be ', el)
		return (el);
	}
});

module.exports = DatatypeEditor;