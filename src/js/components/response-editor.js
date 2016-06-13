import React from 'react';
import ResponseModel from '../models/response';
import DatatypePicker from './datatype-picker';
import CodeListPicker from './code-list-picker';
import {getDictionary} from '../stores/dictionary-store';
var locale = getDictionary()
import assign from 'object-assign';
import DataypeEditor from './datatype-editor';
import CodeListEditor from './code-list-editor'
import clr from '../utils/code-list-repository';
import CodeListStore from '../stores/code-list-store';
import { getCodeListsFromStore } from '../stores/code-list-store';

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

  _switchToCodeListEdition: function() {
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
              create={this._switchToCodeListEdition}
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

export default ResponseEditor;
