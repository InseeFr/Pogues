var React = require('react');
var locale = require('../stores/dictionary-store').getDictionary();
var datatypeTypes = require('../models/model-constants').DatatypeModel.DATATYPE_TYPES;

var DataTypePicker = React.createClass({

  propTypes: {
    change: React.PropTypes.func,
    datatypeType: React.PropTypes.string
  },

  componentWillMount: function() {
    this.setState({
      datatypeType: this.props.datatypeType
    });
  },
  _handleChange: function(event) {
    this.setState({
      datatypeType: event.target.value
    });
    this.props.handleChange(event.target.value);
  },
  render: function() {
    var typeChoices =  datatypeTypes.map(function (key) {
          return <option value={key}>{locale[key]}</option>;
        });

    return (
      <select onChange={this._handleChange}
         value={this.state.datatypeType} className="form-control">
        {typeChoices}
      </select>
    );
  }

});

module.exports = DataTypePicker;