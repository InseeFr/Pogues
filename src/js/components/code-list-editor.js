var React = require('react');
var locale = require('../stores/dictionary-store').getDictionary();
var assign = require('object-assign');
var CodeListModel = require('../models/code-list')
var CodeEditor = require('./code-editor')
var CodeCreator = require('./code-creator')
var clr = require('../utils/code-list-repository')


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
    this.props.after(new CodeListModel(clLiteral))
  },

  render: function() {
    // TODO HACK, we use index to identify a code
    // within the codelist.
    // FIXME find a better candidate for CodeEditor unique key
    // TODO desactivate up or down buttons for first and last code
    return (
      <div>
        <h1>Code List Editor</h1>
        <div className="form-horizontal">
          <div className="form-group">
            <label htmlFor="label"
              className="col-sm-2 control-label">{locale.label}</label>
              <div className="col-sm-9">
                  <input type="text" id="label"
                    className="form-control"
                    placeholder="Code list name"
                    />
              </div>
            <div className="col-sm-1">
              <button className="btn btn-default">
                <span
                  className="glyphicon glyphicon-ok"
                  onClick={this._save}></span>
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