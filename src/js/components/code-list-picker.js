var React = require('react');
var locale = require('../stores/dictionary-store').getDictionary();
// TODO remove,temporary
var assign = require('object-assign');
var CodeListModel = require('../models/code-list')

var CodeListPicker = React.createClass({
  propTypes: {
    select: React.PropTypes.func,
    create: React.PropTypes.func,
    clRef: React.PropTypes.string,
    codeLists: React.PropTypes.array
  },

  _selectCl: function (event) {
    var id = event.target.value
    if (id === '_new') this.props.create()
    else this.props.select(id)
  },

  render: function() {
    return (
      <div className="col-sm-4">
        <select
          className="form-control"
          onChange={this._selectCl}
          value={this.props.clRef}>
          <option value={''}></option>
          <option value={'_new'}>{locale.newCl}</option>
          {
            this.props.codeLists.map(function (cl) {
              let icon = cl instanceof CodeListModel ? "[U]" : "[R]";
              return (
                <option value={cl.id}>
                  {icon} {cl.label}
                </option>
              );
            })
          }
        </select>
      </div>
    );
  }

});

module.exports = CodeListPicker;
