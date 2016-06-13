import React from 'react';
import {getDictionary} from '../stores/dictionary-store';
var locale = getDictionary()
import assign from 'object-assign';
import CodeListModel from '../models/code-list'
import CodeEditor from './code-editor'
import CodeCreator from './code-creator'
import clr from '../utils/code-list-repository'
import Logger from '../logger/logger';
import PoguesActions from '../actions/pogues-actions'

var logger = new Logger('CodeListEditor', 'Components');


function remove(index) {
  // the slice may not be useful, but we
  // don't want to call splice on this.state.codes
  // because it would be like trying to modify
  // the state outside of a setState call
  var codes = this.state.codes.slice()
  codes.splice(index, 1)
  this.setState({
    codes: codes
  })
}

function moveUp(index) {
  if (!(index > 0)) return;
  var codes = this.state.codes.slice()
  var c = codes[index]
  codes[index] = codes[index-1]
  codes[index-1] = c
  this.setState({
    codes: codes
  })
}

function moveDown(index) {
  if (index >= this.state.codes.length - 1) return;
  var codes = this.state.codes.slice()
  var c = codes[index]
  codes[index] = codes[index+1]
  codes[index+1] = c
  this.setState({
    codes: codes
  })
}

function first(index) {
  return index === 0
}

function last(index) {
  return index === this.state.length - 1
}

var CodeListEditor = React.createClass({
  propTypes: {
    // What to do when the code list will be created ?
    // for example, `after` can make the newly created code list
    // the current item in the response editor which called id. In this
    // example, it wouldn't be provided while editing an existing codeList.
    // after will be passed the codelist edited or created.
    after: React.PropTypes.func,
    // clId is not provided when creating a codeList
    clId : React.PropTypes.string
  },

  componentWillMount: function() {
    var cl
    if (this.props.clId) cl = clr.getFromId(this.props.clId)
    this.setState({
      name: cl ? cl.name : '',
      label: cl ? cl.label : '',
      codes: cl ? cl.codes : []
    })
  },
  _handleNameChange: function (event) {
    this.setState({
      name: event.target.value,
      label: event.target.value
    })
  },

  _changeCode: function (index, code) {
    // see removeCode comment
    var codes = this.state.codes.slice()
    codes[index] = code
    this.setState({
      codes: codes
    })
  },

  _addCode: function (code) {
    var codes = this.state.codes.slice()
    codes.push(code)
    this.setState({
      codes: codes
    })
  },

  _removeCode: function (index) {
    var codes = this.state.codes.slice()
    codes.splice(index, 1)
    this.setState({
      codes: codes
    })
  },

  _utils: function (index) {
    return {
      remove: remove.bind(this, index),
      moveUp: moveUp.bind(this, index),
      moveDown: moveDown.bind(this, index),
      first: first.bind(this, index),
      last: last.bind(this, index)
    }
  },

  _save: function () {
    var clLiteral = {
      _label: this.state.label,
      _name: this.state.name,
      _codes: this.state.codes
    }
    logger.debug('Saving code list with', clLiteral);
    var cl = new CodeListModel(clLiteral)
    PoguesActions.createCodeList(cl);
    this.props.after(cl.id)
  },

  render: function() {
    // TODO HACK, we use index to identify a code
    // within the codelist.
    // FIXME find a better candidate for CodeEditor unique key
    // TODO desactivate up or down buttons for first and last code
    return (
      <div>
        <div className="form-horizontal">
          <div className="form-group">
            <label htmlFor="label"
              className="col-sm-2 control-label">{locale.label}</label>
              <div className="col-sm-7">
                  <input type="text" id="label"
                    value={this.state.name}
                    onChange={this._handleNameChange}
                    className="form-control"
                    placeholder="Code list name"
                    />
              </div>
            <div className="col-sm-1">
              <button className="btn btn-default" onClick={this._save}>
                <span
                  className="glyphicon glyphicon-ok"></span>
              </button>
            </div>
          </div>
          <CodeCreator
            add={this._addCode} />
         { this.state.codes.map(function (code, index) {
              return (<CodeEditor
                key={code.label}
                code={code}
                change={this._changeCode.bind(this, index)}
                utils={this._utils(index)}/>)
          }, this)}
        </div>
      </div>
    );
  }

});

module.exports = CodeListEditor;
