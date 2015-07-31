var React = require('react');
var ResponseModel = require('../models/response');
var DatatypePicker = require('./datatype-picker');
var CodeListPicker = require('./code-list-picker');
var locale = require('../stores/dictionary-store').getDictionary();
var assign = require('object-assign');
var DataypeEditor = require('./datatype-editor');
var CodeListEditor = require('./code-list-editor')
var clr = require('../utils/code-list-repository');
import CodeListStore from '../stores/code-list-store'
import { getCodeListsFromStore } from '../stores/code-list-store'

var ResponseEditor = React.createClass({

  propTypes: {
    remove: React.PropTypes.func,
    response: React.PropTypes.instanceOf(ResponseModel),
  },

  componentWillMount: function() {
    this.setState({
      datatype: this.props.response.datatype,
      clRef : this.props.response.codeListReference,
      clEdition: false,
      codeLists: getCodeListsFromStore()
    })
  },

  _datatypeChange: function (datatype) {
    this.setState({
      datatype: datatype
    });
    this.props.response.datatype = datatype;
  },

  _setCodeList: function (clRef) {
    // TODO Save the code list in the CodeListStore through the proper action
    this.setState({
      clRef: clRef
    })
    this.props.response.codeListReference = clRef
  },

  _setNewCodeList: function (clRef) {
    this._setCodeList(clRef)
    this.setState({
      codeLists: getCodeListsFromStore(),
      clEdition: false,
      clRef: clRef
    })
  },

  _createCodeList: function() {
    //FIXME Rename the function, it is not 'create' but 'switchToEditView'
    this.setState({
      clEdition: true
    })
  },

  render: function() {
    var response = this.props.response;
    return (
      <div className="form-horizontal">

        <div className="form-group">
          <DatatypePicker
            edition={this.state.editDatatype}
            edit={this._editDatatype}
            change={this._datatypeChange}
            datatype={response.datatype}/>
        </div>

        <div className="form-group">
          <DataypeEditor
            change={this._datatypeChange}
            datatype={response.datatype}/>
          <div className="col-sm-1">
            <button className="btn btn-default" onClick={this.props.remove}>
              <span className="glyphicon glyphicon-remove"/>
            </button>
          </div>
        </div>

        <div className="form-group">
          <CodeListPicker
              clRef={this.state.clRef || ''}
              select={this._setCodeList}
              create={this._createCodeList}
              codeLists={this.state.codeLists}
              />
        </div>
        <div className="form-group">
          { this.state.clEdition && <CodeListEditor after={this._setNewCodeList}/>}
        </div>
      </div>
    );
  }

});

module.exports = ResponseEditor;
