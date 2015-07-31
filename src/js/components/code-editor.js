var React = require('react');
var locale = require('../stores/dictionary-store').getDictionary();
var assign = require('object-assign');
var Logger = require('../logger/logger');

var logger = new Logger('CodeEditor', 'Components');

var CodeEditor = React.createClass({
  propTypes: {
    utils: React.PropTypes.object,
    code: React.PropTypes.object
  },

  componentWillMount: function() {
    var code = this.props.code
    this.setState({
      existing: code ? true : false,
      value: code.value,
      label:  code.label
    })
  },

  _change: function (event) {
    this.setState({
      label: event.target.value
    })
  },

  _add: function () {
    logger.debug('Adding a code');
    this.props.add(this.state)
  },

  handleKeyDown: function(event) {
    if (event.keyCode === PoguesConstants.General.ENTER_KEY_CODE) {
      add(this.state.label)
    }
  },

  render: function() {
    var utils = this.props.utils
    return (
      <div className="form-group code">
        <div className="col-sm-9">
          <input
            value={this.state.label}
            className="form-control"
            placeholder="Type a new code"
            onChange={this._change} />
        </div>
        <div className="col-sm-3">
          <div className="btn-group btn-group-sm pull-right">
            <button className="btn btn-default"
                    onClick={utils.moveUp}>
              <span className="glyphicon glyphicon-arrow-up"/>
            </button>
            <button className="btn btn-default"
                    onClick={utils.moveDown}>
              <span className="glyphicon glyphicon-arrow-down"/>
            </button>
            <button className="btn btn-default"
                    onClick={utils.remove}>
              <span className="glyphicon glyphicon-trash"/>
            </button>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = CodeEditor;

<div class="btn-toolbar" role="toolbar" aria-label="...">
  <div class="btn-group" role="group" aria-label="...">...</div>
  <div class="btn-group" role="group" aria-label="...">...</div>
  <div class="btn-group" role="group" aria-label="...">...</div>
</div>
