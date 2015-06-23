var React = require('react');
var locale = require('../stores/dictionary-store').getDictionary();
// TODO remove,temporary
var clr = require('../utils/code-list-repository');
var assign = require('object-assign');
var CodeListModel = require('../models/CodeList')


var CodeListPicker = React.createClass({
  propTypes: {
    select: React.PropTypes.func,
    codeList: React.PropTypes.instanceOf(CodeListModel)
  },

  componentWillMount: function() {
    this.setState({
      codeList : this.props.codeList
    });
  },

  _setCodeList: function (event) {
    var id = event.target.value
    // empty option
    if (!id) return;
    var cl = clr.getFromId(id)
    this.setState({
      codeList: cl
    })
    this.props.select(cl)
  },

  render: function() {
    // TODO implement code list selection
    var cl = this.state.codeList
    return (
      <div className="col-sm-6">
        <select
          className="form-control"
          onChange={this._setCodeList}
          value={cl ? cl.id : ''}>
          <option value={'none'}></option>
          {
            clr.getAll().map(function (cl) {
              return <option value={cl.id}>{cl.label}</option>
            })
          }
        </select>
      </div>
    );
  }

});

module.exports = CodeListPicker;