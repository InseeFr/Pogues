var React = require('react');
var ResponseModel = require('../models/Response');
var DatatypePicker = require('./DatatypePicker');
var CodeListPicker = require('./CodeListPicker');
var locale = require('../stores/dictionary-store').getDictionary();
var assign = require('object-assign');
var DataypeEditor = require('./DatatypeEditor');


var ResponseEditor = React.createClass({

  propTypes: {
    remove: React.PropTypes.func,
    response: React.PropTypes.instanceOf(ResponseModel),
  },

  componentWillMount: function() {
    this.setState({
      editDatatype: false,
      datatype: this.props.response.datatype,
      codeList : this.props.response.codeList
    });
  },

  _datatypeChange: function (datatype) {
    this.setState({
      datatype: datatype
    });
    this.props.response.datatype = datatype;
  },

  _editDatatype: function(edition) {
    // activate datatype editor
    this.setState({
      editDatatype: !this.state.editDatatype
    })
  },

  _setCodeList: function (cl) {
    this.setState({
      codeList: cl
    })
    this.props.response.codeList = cl
  },

  render: function() {
    var response = this.props.response
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <DatatypePicker
            edition={this.state.editDatatype}
            edit={this._editDatatype}
            change={this._datatypeChange}
            datatype={response.datatype}/>
          <CodeListPicker
            codeList={this.state.codeList}
            select={this._setCodeList}/>
          <button className="btn btn-default" onClick={this.props.remove}>
            <span className="glyphicon glyphicon-remove"/>
          </button>
        </div>
        <div className="form-group">
          {
            this.state.editDatatype &&
              <DataypeEditor
                change={this._datatypeChange}
                datatype={response.datatype}/>
          }
        </div>
      </div>
    );
  }

});

module.exports = ResponseEditor;